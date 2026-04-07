package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.mobileapp.api.ApiJuegosService;
import com.example.mobileapp.api.ApiReviewsService;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.GameResponse;
import com.example.mobileapp.models.responses.ReviewResponse;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainScreenActivity extends AppCompatActivity {
    private LinearLayout gamesContainer;
    private LinearLayout reviewsContainer;
    private static final String BASE_URL = "http://10.0.2.2:3000/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Usamos activity_main porque contiene el DrawerLayout y el include de main_screen
        setContentView(R.layout.activity_main);
        new HeaderManager(this);

        gamesContainer = findViewById(R.id.gamesContainer);
        reviewsContainer = findViewById(R.id.reviewsContainer);

        loadGames();
        loadPopularReviews();
    }

    private void loadGames() {
        ApiJuegosService juegosService = RetrofitClient.getGamesService();
        juegosService.getAllGames().enqueue(new Callback<List<GameResponse>>() {
            @Override
            public void onResponse(Call<List<GameResponse>> call, Response<List<GameResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayGames(response.body());
                } else {
                    Toast.makeText(MainScreenActivity.this, "Error al obtener juegos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<GameResponse>> call, Throwable t) {
                Toast.makeText(MainScreenActivity.this, "Error de conexión: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void displayGames(List<GameResponse> games) {
        if (gamesContainer == null) return;
        gamesContainer.removeAllViews();
        
        float density = getResources().getDisplayMetrics().density;
        int width = (int) (111 * density);
        int height = (int) (162 * density);
        int marginEnd = (int) (16 * density);
        int marginTop = (int) (20 * density);

        for (GameResponse game : games) {
            ImageButton btn = new ImageButton(this);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(width, height);
            params.setMargins(0, marginTop, marginEnd, 0);
            btn.setLayoutParams(params);
            
            btn.setBackgroundResource(R.drawable.game_miniature_shape);
            btn.setClipToOutline(true);
            btn.setScaleType(ImageView.ScaleType.CENTER_CROP);
            btn.setPadding(0, 0, 0, 0);

            String imageUrl = game.getImagen();
            if (imageUrl != null && !imageUrl.startsWith("http")) {
                imageUrl = BASE_URL + imageUrl;
            }

            Glide.with(this)
                    .load(imageUrl)
                    .centerCrop()
                    .placeholder(R.drawable.ballxpit)
                    .into(btn);

            btn.setOnClickListener(v -> {
                GameInfoActivity.open(this, game);
            });

            gamesContainer.addView(btn);
        }
    }

    private void loadPopularReviews() {
        ApiReviewsService reviewsService = RetrofitClient.getReviewsService();
        reviewsService.getPopularReviews().enqueue(new Callback<List<ReviewResponse>>() {
            @Override
            public void onResponse(Call<List<ReviewResponse>> call, Response<List<ReviewResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayReviews(response.body());
                }
            }

            @Override
            public void onFailure(Call<List<ReviewResponse>> call, Throwable t) {
                Toast.makeText(MainScreenActivity.this, "Error al obtener reviews", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void displayReviews(List<ReviewResponse> reviews) {
        if (reviewsContainer == null) return;
        reviewsContainer.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(this);

        for (ReviewResponse review : reviews) {
            View card = inflater.inflate(R.layout.item_review_home, reviewsContainer, false);
            
            ImageView gameImg = card.findViewById(R.id.game_image_review);
            ImageView userImg = card.findViewById(R.id.user_pfp_review);
            TextView userName = card.findViewById(R.id.user_name_review);
            TextView timeText = card.findViewById(R.id.review_time);
            TextView contentText = card.findViewById(R.id.review_content);
            RatingBar ratingBar = card.findViewById(R.id.ratingBarReview);

            userName.setText(review.getUsuario());
            timeText.setText(review.getFecha());
            contentText.setText(review.getContenido());
            
            // Ajuste de puntuación (asumiendo que viene 0-10 y el RatingBar es de 5 estrellas)
            float score = review.getPuntuacion() != null ? review.getPuntuacion().floatValue() / 2 : 0;
            ratingBar.setRating(score);

            // Cargar imágenes
            String gameUrl = review.getImagen();
            if (gameUrl != null && !gameUrl.startsWith("http")) gameUrl = BASE_URL + gameUrl;
            Glide.with(this).load(gameUrl).placeholder(R.drawable.ballxpit).into(gameImg);

            ImageUtils.loadUserAvatar(this, review.getAvatar(), review.getUsuario(), userImg);

            // Redirección al perfil del usuario
            View.OnClickListener openUserProfile = v -> {
                if (review.getIdUsuario() != null) {
                    UserProfileActivity.start(this, review.getIdUsuario(), review.getUsuario());
                } else {
                    Toast.makeText(this, "Perfil no disponible", Toast.LENGTH_SHORT).show();
                }
            };
            userImg.setOnClickListener(openUserProfile);
            userName.setOnClickListener(openUserProfile);

            // Redirección al detalle del juego al pulsar la imagen
            gameImg.setOnClickListener(v -> {
                int gameId = review.getJuegoId();
                RetrofitClient.getGamesService().getGameById(gameId).enqueue(new Callback<GameResponse>() {
                    @Override
                    public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            GameInfoActivity.open(MainScreenActivity.this, response.body());
                        }
                    }

                    @Override
                    public void onFailure(Call<GameResponse> call, Throwable t) {
                        Toast.makeText(MainScreenActivity.this, "Error al cargar información del juego", Toast.LENGTH_SHORT).show();
                    }
                });
            });

            reviewsContainer.addView(card);
        }
    }
}
