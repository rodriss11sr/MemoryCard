package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.gridlayout.widget.GridLayout;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.GameResponse;
import com.example.mobileapp.models.responses.UserGameResponse;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class WishlistProfileActivity extends AppCompatActivity {

    private GridLayout wishlistGrid;
    private TextView countText;
    private TextView emptyText;
    private int userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.wishlist_profile_activity);
        new HeaderManager(this);

        wishlistGrid = findViewById(R.id.wishlistGridContainer);
        countText = findViewById(R.id.wishlistCountText);
        emptyText = findViewById(R.id.emptyWishlistText);
        TextView usernameTitle = findViewById(R.id.textView21);

        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        userId = prefs.getInt("user_id", -1);
        String userName = prefs.getString("user_nombre", "Usuario");

        if (usernameTitle != null) {
            usernameTitle.setText(userName.toUpperCase());
        }

        Button gamesProfile = findViewById(R.id.gamesProfileBtn);
        Button reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        Button listProfile = findViewById(R.id.listProfileBtn);

        listProfile.setOnClickListener(v -> startActivity(new Intent(this, ListsProfileActivity.class)));
        gamesProfile.setOnClickListener(v -> startActivity(new Intent(this, GamesProfileActivity.class)));
        reviewsProfile.setOnClickListener(v -> startActivity(new Intent(this, ReviewProfileActivity.class)));

        loadWishlist();
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadWishlist();
    }

    private void loadWishlist() {
        if (userId == -1) {
            emptyText.setVisibility(View.VISIBLE);
            countText.setText("Inicia sesión para ver tu wishlist");
            return;
        }

        RetrofitClient.getUsersService().getWishlist(userId).enqueue(new Callback<List<UserGameResponse>>() {
            @Override
            public void onResponse(Call<List<UserGameResponse>> call, Response<List<UserGameResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayGames(response.body());
                } else {
                    emptyText.setVisibility(View.VISIBLE);
                    countText.setText("Error al cargar la wishlist");
                }
            }

            @Override
            public void onFailure(Call<List<UserGameResponse>> call, Throwable t) {
                Toast.makeText(WishlistProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                emptyText.setVisibility(View.VISIBLE);
            }
        });
    }

    private void displayGames(List<UserGameResponse> games) {
        wishlistGrid.removeAllViews();

        if (games.isEmpty()) {
            emptyText.setVisibility(View.VISIBLE);
            countText.setText("Tienes 0 juegos en tu wishlist");
            return;
        }
        emptyText.setVisibility(View.GONE);
        countText.setText("Tienes " + games.size() + " juego" + (games.size() != 1 ? "s" : "") + " en tu wishlist");

        LayoutInflater inflater = LayoutInflater.from(this);
        for (UserGameResponse game : games) {
            View item = inflater.inflate(R.layout.item_list_game, wishlistGrid, false);

            ImageView gameImg = item.findViewById(R.id.gameImage);
            RatingBar ratingBar = item.findViewById(R.id.gameRating);

            ImageUtils.loadImage(this, game.getImagen(), gameImg);

            if (game.getRating() != null) {
                ratingBar.setRating(game.getRating() / 2f);
            } else {
                ratingBar.setRating(0);
            }

            gameImg.setOnClickListener(v -> openGameDetail(game.getId()));

            gameImg.setOnLongClickListener(v -> {
                new AlertDialog.Builder(this)
                        .setTitle("Quitar de wishlist")
                        .setMessage("¿Quitar \"" + game.getNombre() + "\" de tu wishlist?")
                        .setPositiveButton("Quitar", (d, w) -> removeFromWishlist(game.getId()))
                        .setNegativeButton("Cancelar", null)
                        .show();
                return true;
            });

            wishlistGrid.addView(item);
        }
    }

    private void openGameDetail(int gameId) {
        RetrofitClient.getGamesService().getGameById(gameId).enqueue(new Callback<GameResponse>() {
            @Override
            public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    GameInfoActivity.open(WishlistProfileActivity.this, response.body());
                }
            }

            @Override
            public void onFailure(Call<GameResponse> call, Throwable t) {
                Toast.makeText(WishlistProfileActivity.this, "Error al cargar juego", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void removeFromWishlist(int gameId) {
        RetrofitClient.getUsersService().removeGameFromLibrary(userId, gameId).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(WishlistProfileActivity.this, "Juego eliminado de la wishlist", Toast.LENGTH_SHORT).show();
                    loadWishlist();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(WishlistProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
