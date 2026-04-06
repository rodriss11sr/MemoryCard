package com.example.mobileapp;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.gridlayout.widget.GridLayout;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.GameResponse;
import com.example.mobileapp.models.responses.ListDetailResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class InsideListGamesActivity extends AppCompatActivity {

    private GridLayout gamesGrid;
    private TextView listNameView;
    private TextView usernameView;
    private TextView descriptionView;
    private TextView emptyText;
    private LinearLayout actionButtons;
    private int listId = -1;
    private int listOwnerId = -1;
    private boolean isOwner = false;
    private String currentListName = "";
    private String currentListDesc = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.inside_list_games_activity);
        new HeaderManager(this);

        listNameView = findViewById(R.id.listName);
        usernameView = findViewById(R.id.username);
        descriptionView = findViewById(R.id.listDescription);
        gamesGrid = findViewById(R.id.gamesGridContainer);
        emptyText = findViewById(R.id.emptyGamesText);
        actionButtons = findViewById(R.id.actionButtons);

        String nombreLista = getIntent().getStringExtra("LIST_NAME");
        listId = getIntent().getIntExtra("LIST_ID", -1);

        if (nombreLista != null) {
            listNameView.setText(nombreLista);
        }

        setupButtons();

        if (listId != -1) {
            loadListDetail();
        }
    }

    private void setupButtons() {
        Button btnAddGame = findViewById(R.id.btnAddGame);
        Button btnEditList = findViewById(R.id.btnEditList);
        Button btnDeleteList = findViewById(R.id.btnDeleteList);

        btnAddGame.setOnClickListener(v -> {
            AddGameDialog dialog = AddGameDialog.newInstance(listId);
            dialog.setOnGameAddedListener(this::loadListDetail);
            dialog.show(getSupportFragmentManager(), "AddGame");
        });

        btnEditList.setOnClickListener(v -> {
            EditListDialog dialog = EditListDialog.newInstance(listId, currentListName, currentListDesc);
            dialog.setOnListUpdatedListener(this::loadListDetail);
            dialog.show(getSupportFragmentManager(), "EditList");
        });

        btnDeleteList.setOnClickListener(v -> {
            new AlertDialog.Builder(this)
                    .setTitle("Eliminar lista")
                    .setMessage("¿Estás seguro de que quieres eliminar \"" + currentListName + "\"?")
                    .setPositiveButton("Eliminar", (d, w) -> deleteList())
                    .setNegativeButton("Cancelar", null)
                    .show();
        });
    }

    private void loadListDetail() {
        RetrofitClient.getListsService().getListById(listId).enqueue(new Callback<ListDetailResponse>() {
            @Override
            public void onResponse(Call<ListDetailResponse> call, Response<ListDetailResponse> response) {
                if (response.isSuccessful() && response.body() != null && response.body().isOk()) {
                    displayListDetail(response.body().getLista());
                } else {
                    emptyText.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<ListDetailResponse> call, Throwable t) {
                Toast.makeText(InsideListGamesActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                emptyText.setVisibility(View.VISIBLE);
            }
        });
    }

    private void displayListDetail(ListDetailResponse.ListaData lista) {
        if (lista == null) return;

        currentListName = lista.getNombre();
        currentListDesc = lista.getDescripcion() != null ? lista.getDescripcion() : "";
        listNameView.setText(currentListName);

        if (lista.getAutor() != null) {
            usernameView.setText("by " + lista.getAutor().getNombre());
            listOwnerId = lista.getAutor().getId();
        }

        if (!currentListDesc.isEmpty()) {
            descriptionView.setText(currentListDesc);
            descriptionView.setVisibility(View.VISIBLE);
        } else {
            descriptionView.setVisibility(View.GONE);
        }

        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        int currentUserId = prefs.getInt("user_id", -1);
        isOwner = (currentUserId != -1 && currentUserId == listOwnerId);
        if (isOwner) {
            actionButtons.setVisibility(View.VISIBLE);
        }

        if (lista.getJuegos() == null || lista.getJuegos().isEmpty()) {
            emptyText.setVisibility(View.VISIBLE);
            gamesGrid.removeAllViews();
            return;
        }
        emptyText.setVisibility(View.GONE);

        gamesGrid.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(this);

        for (ListDetailResponse.JuegoLista juego : lista.getJuegos()) {
            View item = inflater.inflate(R.layout.item_list_game, gamesGrid, false);

            ImageView gameImg = item.findViewById(R.id.gameImage);
            RatingBar ratingBar = item.findViewById(R.id.gameRating);
            ImageButton btnRemove = item.findViewById(R.id.btnRemoveGame);

            ImageUtils.loadImage(this, juego.getImagen(), gameImg);

            if (juego.getRating() != null) {
                ratingBar.setRating(juego.getRating() / 2f);
            } else {
                ratingBar.setRating(0);
            }

            gameImg.setOnClickListener(v -> openGameDetail(juego));

            if (isOwner) {
                btnRemove.setVisibility(View.VISIBLE);
                btnRemove.setOnClickListener(v -> removeGameFromList(juego.getId()));
            }

            gamesGrid.addView(item);
        }
    }

    private void openGameDetail(ListDetailResponse.JuegoLista juego) {
        RetrofitClient.getGamesService().getGameById(juego.getId()).enqueue(new Callback<GameResponse>() {
            @Override
            public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    GameInfoActivity.open(InsideListGamesActivity.this, response.body());
                }
            }

            @Override
            public void onFailure(Call<GameResponse> call, Throwable t) {
                Toast.makeText(InsideListGamesActivity.this, "Error al cargar juego", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void removeGameFromList(int gameId) {
        new AlertDialog.Builder(this)
                .setTitle("Eliminar juego")
                .setMessage("¿Quitar este juego de la lista?")
                .setPositiveButton("Quitar", (d, w) -> {
                    RetrofitClient.getListsService().removeGameFromList(listId, gameId).enqueue(new Callback<AuthResponse>() {
                        @Override
                        public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                            if (response.isSuccessful() && response.body() != null && response.body().isOk()) {
                                Toast.makeText(InsideListGamesActivity.this, "Juego eliminado", Toast.LENGTH_SHORT).show();
                                loadListDetail();
                            } else {
                                Toast.makeText(InsideListGamesActivity.this, "Error al eliminar juego", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<AuthResponse> call, Throwable t) {
                            Toast.makeText(InsideListGamesActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                        }
                    });
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void deleteList() {
        RetrofitClient.getListsService().deleteList(listId).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful() && response.body() != null && response.body().isOk()) {
                    Toast.makeText(InsideListGamesActivity.this, "Lista eliminada", Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    Toast.makeText(InsideListGamesActivity.this, "Error al eliminar", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(InsideListGamesActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
