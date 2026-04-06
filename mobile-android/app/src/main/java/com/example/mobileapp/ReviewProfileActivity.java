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
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.GameResponse;
import com.example.mobileapp.models.responses.ReviewResponse;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReviewProfileActivity extends AppCompatActivity {

    private LinearLayout reviewsContainer;
    private TextView emptyText;
    private int userId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.reviews_profile_activity);
        new HeaderManager(this);

        reviewsContainer = findViewById(R.id.reviewsContainer);
        emptyText = findViewById(R.id.emptyReviewsText);
        TextView usernameTitle = findViewById(R.id.textView21);

        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        userId = prefs.getInt("user_id", -1);
        String userName = prefs.getString("user_nombre", "Usuario");

        if (usernameTitle != null) {
            usernameTitle.setText(userName.toUpperCase());
        }

        Button gamesProfile = findViewById(R.id.gamesProfileBtn);
        Button wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        Button listProfile = findViewById(R.id.listProfileBtn);

        listProfile.setOnClickListener(v -> startActivity(new Intent(this, ListsProfileActivity.class)));
        gamesProfile.setOnClickListener(v -> startActivity(new Intent(this, GamesProfileActivity.class)));
        wishlistProfile.setOnClickListener(v -> startActivity(new Intent(this, WishlistProfileActivity.class)));

        loadUserReviews();
    }

    @Override
    protected void onResume() {
        super.onResume();
        loadUserReviews();
    }

    private void loadUserReviews() {
        if (userId == -1) {
            emptyText.setVisibility(View.VISIBLE);
            return;
        }

        RetrofitClient.getUsersService().getUserReviews(userId).enqueue(new Callback<List<ReviewResponse>>() {
            @Override
            public void onResponse(Call<List<ReviewResponse>> call, Response<List<ReviewResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayReviews(response.body());
                } else {
                    emptyText.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<List<ReviewResponse>> call, Throwable t) {
                Toast.makeText(ReviewProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                emptyText.setVisibility(View.VISIBLE);
            }
        });
    }

    private void displayReviews(List<ReviewResponse> reviews) {
        reviewsContainer.removeAllViews();

        if (reviews.isEmpty()) {
            emptyText.setVisibility(View.VISIBLE);
            return;
        }
        emptyText.setVisibility(View.GONE);

        LayoutInflater inflater = LayoutInflater.from(this);
        for (ReviewResponse review : reviews) {
            View card = inflater.inflate(R.layout.item_review_card, reviewsContainer, false);

            ImageView gameImg = card.findViewById(R.id.reviewGameImage);
            TextView gameTitle = card.findViewById(R.id.reviewGameTitle);
            TextView dateText = card.findViewById(R.id.reviewDate);
            TextView contentText = card.findViewById(R.id.reviewContent);
            RatingBar ratingBar = card.findViewById(R.id.reviewRating);

            ImageUtils.loadImage(this, review.getImagen(), gameImg);

            gameTitle.setText(review.getTitulo() != null ? review.getTitulo() : "Sin título");
            dateText.setText(review.getFecha() != null ? review.getFecha() : "");

            if (review.getContenido() != null && !review.getContenido().isEmpty()) {
                contentText.setText(review.getContenido());
            } else {
                contentText.setText("Sin comentario");
            }

            if (review.getPuntuacion() != null) {
                ratingBar.setRating(review.getPuntuacion() / 2f);
            } else {
                ratingBar.setRating(0);
            }

            card.setOnClickListener(v -> openGameDetail(review.getJuegoId()));

            reviewsContainer.addView(card);
        }
    }

    private void openGameDetail(int gameId) {
        RetrofitClient.getGamesService().getGameById(gameId).enqueue(new Callback<GameResponse>() {
            @Override
            public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    GameInfoActivity.open(ReviewProfileActivity.this, response.body());
                }
            }

            @Override
            public void onFailure(Call<GameResponse> call, Throwable t) {
                Toast.makeText(ReviewProfileActivity.this, "Error al cargar juego", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
