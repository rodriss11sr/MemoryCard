package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.gridlayout.widget.GridLayout;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.GameResponse;
import com.example.mobileapp.models.responses.UserGameResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GamesProfileActivity extends AppCompatActivity {

    private GridLayout gamesGrid;
    private TextView emptyText;
    private TextView usernameTitle;
    private int userId;
    private List<UserGameResponse> allGames = new ArrayList<>();
    private String currentSort = "reciente";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gamesprofile);
        new HeaderManager(this);

        gamesGrid = findViewById(R.id.gamesGridContainer);
        emptyText = findViewById(R.id.emptyGamesText);
        usernameTitle = findViewById(R.id.textView21);

        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        userId = prefs.getInt("user_id", -1);
        String userName = prefs.getString("user_nombre", "Usuario");

        if (usernameTitle != null) {
            usernameTitle.setText(userName.toUpperCase());
        }

        Button reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        Button wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        Button listProfile = findViewById(R.id.listProfileBtn);

        listProfile.setOnClickListener(v -> startActivity(new Intent(this, ListsProfileActivity.class)));
        reviewsProfile.setOnClickListener(v -> startActivity(new Intent(this, ReviewProfileActivity.class)));
        wishlistProfile.setOnClickListener(v -> startActivity(new Intent(this, WishlistProfileActivity.class)));

        setupAccordion();

        Button addGame = findViewById(R.id.addGameBtn);
        addGame.setOnClickListener(v -> {
            AddGame dialog = new AddGame();
            dialog.show(getSupportFragmentManager(), "AddGame");
        });

        loadUserGames();
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadUserGames();
    }

    private void setupAccordion() {
        View accordionView = findViewById(R.id.accordion_games_profile);
        TextView accordionTitle = findViewById(R.id.accordion_title);
        ImageView arrowIcon = accordionView.findViewById(R.id.arrow_icon);
        LinearLayout expandableContent = accordionView.findViewById(R.id.expandable_content);
        Button releaseDateBtn = findViewById(R.id.releaseDateAccordionGamesProfile);
        Button nameBtn = findViewById(R.id.nameAccordionGamesProfile);
        Button ratingBtn = findViewById(R.id.ratingAccordionGamesProfile);
        Button latestAddedBtn = findViewById(R.id.LatestAddedAccordionGamesProfile);

        View.OnClickListener toggleAccordion = v -> {
            if (expandableContent.getVisibility() == View.VISIBLE) {
                expandableContent.setVisibility(View.GONE);
                arrowIcon.setRotation(0);
            } else {
                expandableContent.setVisibility(View.VISIBLE);
                arrowIcon.setRotation(180);
            }
        };

        accordionTitle.setOnClickListener(toggleAccordion);
        arrowIcon.setOnClickListener(toggleAccordion);

        releaseDateBtn.setOnClickListener(v -> {
            accordionTitle.setText(releaseDateBtn.getText().toString());
            currentSort = "fecha";
            sortAndDisplay();
            expandableContent.setVisibility(View.GONE);
            arrowIcon.setRotation(0);
        });

        nameBtn.setOnClickListener(v -> {
            accordionTitle.setText(nameBtn.getText().toString());
            currentSort = "nombre";
            sortAndDisplay();
            expandableContent.setVisibility(View.GONE);
            arrowIcon.setRotation(0);
        });

        ratingBtn.setOnClickListener(v -> {
            accordionTitle.setText(ratingBtn.getText().toString());
            currentSort = "rating";
            sortAndDisplay();
            expandableContent.setVisibility(View.GONE);
            arrowIcon.setRotation(0);
        });

        latestAddedBtn.setOnClickListener(v -> {
            accordionTitle.setText(latestAddedBtn.getText().toString());
            currentSort = "reciente";
            sortAndDisplay();
            expandableContent.setVisibility(View.GONE);
            arrowIcon.setRotation(0);
        });
    }

    private void loadUserGames() {
        if (userId == -1) {
            emptyText.setVisibility(View.VISIBLE);
            return;
        }

        RetrofitClient.getUsersService().getUserGames(userId, null).enqueue(new Callback<List<UserGameResponse>>() {
            @Override
            public void onResponse(Call<List<UserGameResponse>> call, Response<List<UserGameResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    allGames = new ArrayList<>(response.body());
                    sortAndDisplay();
                } else {
                    emptyText.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<List<UserGameResponse>> call, Throwable t) {
                Toast.makeText(GamesProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                emptyText.setVisibility(View.VISIBLE);
            }
        });
    }

    private void sortAndDisplay() {
        List<UserGameResponse> sorted = new ArrayList<>(allGames);

        switch (currentSort) {
            case "nombre":
                Collections.sort(sorted, (a, b) ->
                        (a.getNombre() != null ? a.getNombre() : "").compareToIgnoreCase(
                                b.getNombre() != null ? b.getNombre() : ""));
                break;
            case "rating":
                Collections.sort(sorted, (a, b) -> {
                    float ra = a.getRating() != null ? a.getRating() : 0f;
                    float rb = b.getRating() != null ? b.getRating() : 0f;
                    return Float.compare(rb, ra);
                });
                break;
            case "fecha":
                Collections.sort(sorted, (a, b) -> {
                    String fa = a.getFechaLanzamiento() != null ? a.getFechaLanzamiento() : "";
                    String fb = b.getFechaLanzamiento() != null ? b.getFechaLanzamiento() : "";
                    return fb.compareTo(fa);
                });
                break;
            case "reciente":
            default:
                Collections.sort(sorted, (a, b) -> {
                    String fa = a.getFechaAgregado() != null ? a.getFechaAgregado() : "";
                    String fb = b.getFechaAgregado() != null ? b.getFechaAgregado() : "";
                    return fb.compareTo(fa);
                });
                break;
        }

        displayGames(sorted);
    }

    private void displayGames(List<UserGameResponse> games) {
        gamesGrid.removeAllViews();

        if (games.isEmpty()) {
            emptyText.setVisibility(View.VISIBLE);
            return;
        }
        emptyText.setVisibility(View.GONE);

        LayoutInflater inflater = LayoutInflater.from(this);
        for (UserGameResponse game : games) {
            View item = inflater.inflate(R.layout.item_list_game, gamesGrid, false);

            ImageView gameImg = item.findViewById(R.id.gameImage);
            RatingBar ratingBar = item.findViewById(R.id.gameRating);

            ImageUtils.loadImage(this, game.getImagen(), gameImg);

            if (game.getRating() != null) {
                ratingBar.setRating(game.getRating());
            } else {
                ratingBar.setRating(0);
            }

            gameImg.setOnClickListener(v -> openGameDetail(game.getId()));

            gamesGrid.addView(item);
        }
    }

    private void openGameDetail(int gameId) {
        RetrofitClient.getGamesService().getGameById(gameId).enqueue(new Callback<GameResponse>() {
            @Override
            public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    GameInfoActivity.open(GamesProfileActivity.this, response.body());
                }
            }

            @Override
            public void onFailure(Call<GameResponse> call, Throwable t) {
                Toast.makeText(GamesProfileActivity.this, "Error al cargar juego", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
