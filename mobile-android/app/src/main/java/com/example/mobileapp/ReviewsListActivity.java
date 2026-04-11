package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mobileapp.api.ApiReviewsService;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.GameResponse;
import com.example.mobileapp.models.responses.ReviewResponse;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReviewsListActivity extends AppCompatActivity {
    private LinearLayout reviewsContainer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reviews_list);
        new HeaderManager(this);

        reviewsContainer = findViewById(R.id.reviewsContainer);
        loadAllReviews();
    }

    private void loadAllReviews() {
        ApiReviewsService reviewsService = RetrofitClient.getReviewsService();
        reviewsService.getReviews(null).enqueue(new Callback<List<ReviewResponse>>() {
            @Override
            public void onResponse(Call<List<ReviewResponse>> call, Response<List<ReviewResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayReviews(response.body());
                } else {
                    Toast.makeText(ReviewsListActivity.this, "Error al obtener reviews", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<ReviewResponse>> call, Throwable t) {
                Toast.makeText(ReviewsListActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
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
            
            float score = review.getPuntuacion() != null ? review.getPuntuacion().floatValue() : 0;
            ratingBar.setRating(score);

            ImageUtils.loadImage(this, review.getImagen(), gameImg);
            ImageUtils.loadUserAvatar(this, review.getAvatar(), review.getUsuario(), userImg);

            View.OnClickListener openUserProfile = v -> {
                if (review.getIdUsuario() != null) {
                    SharedPreferences p = getSharedPreferences("user_session", MODE_PRIVATE);
                    int sessionId = p.getInt("user_id", -1);
                    if (review.getIdUsuario() == sessionId) {
                        startActivity(new Intent(this, ProfileActivity.class));
                    } else {
                        ProfileActivity.openForUser(this, review.getIdUsuario(), review.getUsuario());
                    }
                }
            };
            userImg.setOnClickListener(openUserProfile);
            userName.setOnClickListener(openUserProfile);

            gameImg.setOnClickListener(v -> {
                int gameId = review.getJuegoId();
                RetrofitClient.getGamesService().getGameById(gameId).enqueue(new Callback<GameResponse>() {
                    @Override
                    public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            GameInfoActivity.open(ReviewsListActivity.this, response.body());
                        }
                    }

                    @Override
                    public void onFailure(Call<GameResponse> call, Throwable t) {}
                });
            });

            reviewsContainer.addView(card);
        }
    }
}
