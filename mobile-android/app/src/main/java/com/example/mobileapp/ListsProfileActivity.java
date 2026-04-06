package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.UserListResponse;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ListsProfileActivity extends AppCompatActivity {

    private GridLayout listsContainer;
    private TextView emptyListsText;
    private TextView usernameTitle;
    private int userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.lists_profile_activity);
        new HeaderManager(this);

        listsContainer = findViewById(R.id.listsContainer);
        emptyListsText = findViewById(R.id.emptyListsText);
        usernameTitle = findViewById(R.id.textView21);

        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        userId = prefs.getInt("user_id", -1);
        String userName = prefs.getString("user_nombre", "Usuario");

        if (usernameTitle != null) {
            usernameTitle.setText(userName.toUpperCase());
        }

        Button gamesProfile = findViewById(R.id.gamesProfileBtn);
        Button wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        Button reviewsProfile = findViewById(R.id.reviewsProfileBtn);

        reviewsProfile.setOnClickListener(v -> {
            startActivity(new Intent(this, ReviewProfileActivity.class));
        });
        wishlistProfile.setOnClickListener(v -> {
            startActivity(new Intent(this, WishlistProfileActivity.class));
        });
        gamesProfile.setOnClickListener(v -> {
            startActivity(new Intent(this, GamesProfileActivity.class));
        });

        Button createList = findViewById(R.id.createListBtn);
        createList.setOnClickListener(v -> {
            CreateList dialog = new CreateList();
            dialog.setOnListCreatedListener(() -> loadUserLists());
            dialog.show(getSupportFragmentManager(), "CreateList");
        });

        loadUserLists();
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadUserLists();
    }

    private void loadUserLists() {
        if (userId == -1) {
            emptyListsText.setVisibility(View.VISIBLE);
            return;
        }

        RetrofitClient.getListsService().getUserLists(userId).enqueue(new Callback<List<UserListResponse>>() {
            @Override
            public void onResponse(Call<List<UserListResponse>> call, Response<List<UserListResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayLists(response.body());
                } else {
                    emptyListsText.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<List<UserListResponse>> call, Throwable t) {
                Toast.makeText(ListsProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                emptyListsText.setVisibility(View.VISIBLE);
            }
        });
    }

    private void displayLists(List<UserListResponse> lists) {
        if (listsContainer == null) return;
        listsContainer.removeAllViews();

        if (lists.isEmpty()) {
            emptyListsText.setVisibility(View.VISIBLE);
            return;
        }
        emptyListsText.setVisibility(View.GONE);

        LayoutInflater inflater = LayoutInflater.from(this);

        for (UserListResponse lista : lists) {
            View card = inflater.inflate(R.layout.item_list_card, listsContainer, false);

            TextView title = card.findViewById(R.id.listTitle);
            TextView author = card.findViewById(R.id.listAuthor);
            ImageView cover1 = card.findViewById(R.id.cover1);
            ImageView cover2 = card.findViewById(R.id.cover2);
            ImageView cover3 = card.findViewById(R.id.cover3);

            title.setText(lista.getNombre());
            author.setText("by " + lista.getAutor());

            ImageView[] covers = { cover1, cover2, cover3 };
            List<UserListResponse.JuegoResumen> juegos = lista.getJuegos();

            for (int i = 0; i < covers.length; i++) {
                if (juegos != null && i < juegos.size()) {
                    covers[i].setVisibility(View.VISIBLE);
                    ImageUtils.loadImage(this, juegos.get(i).getImagen(), covers[i]);
                } else {
                    covers[i].setVisibility(View.INVISIBLE);
                }
            }

            card.setOnClickListener(v -> {
                Intent intent = new Intent(this, InsideListGamesActivity.class);
                intent.putExtra("LIST_ID", lista.getId());
                intent.putExtra("LIST_NAME", lista.getNombre());
                startActivity(intent);
            });

            GridLayout.LayoutParams params = new GridLayout.LayoutParams();
            params.width = 0;
            params.height = GridLayout.LayoutParams.WRAP_CONTENT;
            params.columnSpec = GridLayout.spec(GridLayout.UNDEFINED, 1f);
            params.setMargins(8, 8, 8, 8);
            card.setLayoutParams(params);

            listsContainer.addView(card);
        }
    }
}
