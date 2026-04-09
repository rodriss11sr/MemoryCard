package com.example.mobileapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.mobileapp.models.responses.GameResponse;
import java.util.List;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.Toast;
import com.example.mobileapp.api.RetrofitClient;
import android.graphics.Color;
import com.example.mobileapp.models.responses.UserGameResponse;
import android.widget.Button;
import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.ReviewResponse;
import java.util.HashMap;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GameInfoActivity extends AppCompatActivity {

    private static final String ID = "game_id";
    private static final String BASE_URL = "http://10.0.2.2:3000/";

    private LinearLayout relatedGamesContainer;
    private LinearLayout reviewsContainer;
    private int currentGameId;
    private String currentStatus = null;

    private TextView titleTv, descriptionTv, releaseDateTv, platformsTv, developerTv, genreTv;
    private ImageView coverIv;
    private Button btnLibrary, btnFavorite, btnWishlist, btnReview;
    private GameResponse currentGame;

    public static void open(Context context, int gameId) {
        Intent intent = new Intent(context, GameInfoActivity.class);
        intent.putExtra(ID, gameId);
        context.startActivity(intent);
    }

    public static void open(Context context, Games game) {
        open(context, game.getId());
    }

    public static void open(Context context, GameResponse game) {
        open(context, game.getId());
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.game_info_activity);
        new HeaderManager(this);

        relatedGamesContainer = findViewById(R.id.relatedGamesContainer);
        reviewsContainer = findViewById(R.id.reviewsContainer);
        
        titleTv = findViewById(R.id.GameTitleInfo);
        coverIv = findViewById(R.id.GameCoverInfo);
        descriptionTv = findViewById(R.id.gameDescription);
        releaseDateTv = findViewById(R.id.gameReleaseDate);
        platformsTv = findViewById(R.id.GamePlatformsInfo);
        developerTv = findViewById(R.id.gameDeveloper);
        genreTv = findViewById(R.id.gameGenre);

        btnLibrary = findViewById(R.id.btnAddToLibrary);
        btnFavorite = findViewById(R.id.btnAddToFavorites);
        btnWishlist = findViewById(R.id.btnAddToWishlist);
        btnReview = findViewById(R.id.btnMakeReview);

        setupActionButtons();

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            currentGameId = extras.getInt(ID);
            
            loadGameDetails(currentGameId);
            loadRelatedGames(currentGameId);
            loadReviews(currentGameId);
            checkUserLibrary();
        }
    }

    private void checkUserLibrary() {
        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        int userId = prefs.getInt("user_id", -1);
        if (userId == -1) return;

        RetrofitClient.getUsersService().getUserGames(userId, null).enqueue(new Callback<List<UserGameResponse>>() {
            @Override
            public void onResponse(Call<List<UserGameResponse>> call, Response<List<UserGameResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    for (UserGameResponse ug : response.body()) {
                        if (ug.getId() == currentGameId) {
                            currentStatus = ug.getEstado();
                            updateButtonStates();
                            break;
                        }
                    }
                }
            }
            @Override
            public void onFailure(Call<List<UserGameResponse>> call, Throwable t) {}
        });
    }

    private void updateButtonStates() {
        // Reset backgrounds to default using backgroundTint
        btnLibrary.setBackgroundTintList(null);
        btnFavorite.setBackgroundTintList(null);
        btnWishlist.setBackgroundTintList(null);

        if ("jugando".equals(currentStatus)) {
            btnLibrary.setBackgroundTintList(android.content.res.ColorStateList.valueOf(Color.GRAY));
        } else if ("favorito".equals(currentStatus)) {
            btnFavorite.setBackgroundTintList(android.content.res.ColorStateList.valueOf(Color.GRAY));
        } else if ("pendiente".equals(currentStatus)) {
            btnWishlist.setBackgroundTintList(android.content.res.ColorStateList.valueOf(Color.GRAY));
        }
    }

    private void loadGameDetails(int id) {
        RetrofitClient.getGamesService().getGameById(id).enqueue(new Callback<GameResponse>() {
            @Override
            public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayGameDetails(response.body());
                } else {
                    Toast.makeText(GameInfoActivity.this, "Error al cargar detalles del juego", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<GameResponse> call, Throwable t) {
                Toast.makeText(GameInfoActivity.this, "Error de red", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void displayGameDetails(GameResponse game) {
        this.currentGame = game;
        titleTv.setText(game.getTitulo());
        descriptionTv.setText(game.getDescripcion());
        releaseDateTv.setText(game.getFecha());
        developerTv.setText(game.getDesarrollador());
        genreTv.setText(game.getGenero());

        if (game.getPlataforma() != null) {
            platformsTv.setText(String.join(" / ", game.getPlataforma()));
        }

        String url = game.getImagen();
        if (url != null && !url.startsWith("http")) url = BASE_URL + url;
        Glide.with(this).load(url).placeholder(R.drawable.ballxpit).into(coverIv);
    }

    private void loadRelatedGames(int id) {
        RetrofitClient.getGamesService().getRelatedGames(id).enqueue(new Callback<List<GameResponse>>() {
            @Override
            public void onResponse(Call<List<GameResponse>> call, Response<List<GameResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayRelatedGames(response.body());
                }
            }
            @Override
            public void onFailure(Call<List<GameResponse>> call, Throwable t) {}
        });
    }

    private void displayRelatedGames(List<GameResponse> games) {
        if (relatedGamesContainer == null) return;
        relatedGamesContainer.removeAllViews();
        float density = getResources().getDisplayMetrics().density;

        for (GameResponse game : games) {
            ImageView iv = new ImageView(this);
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams((int)(85*density), (int)(120*density));
            lp.setMargins(0, 0, (int)(10*density), 0);
            iv.setLayoutParams(lp);
            iv.setBackgroundResource(R.drawable.game_miniature_shape);
            iv.setClipToOutline(true);
            iv.setScaleType(ImageView.ScaleType.CENTER_CROP);

            String url = game.getImagen();
            if (url != null && !url.startsWith("http")) url = BASE_URL + url;
            Glide.with(this).load(url).centerCrop().placeholder(R.drawable.ballxpit).into(iv);

            iv.setOnClickListener(v -> GameInfoActivity.open(this, game));
            relatedGamesContainer.addView(iv);
        }
    }

    private void loadReviews(int id) {
        RetrofitClient.getReviewsService().getReviews(id).enqueue(new Callback<List<ReviewResponse>>() {
            @Override
            public void onResponse(Call<List<ReviewResponse>> call, Response<List<ReviewResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayReviews(response.body());
                }
            }
            @Override
            public void onFailure(Call<List<ReviewResponse>> call, Throwable t) {}
        });
    }

    private void displayReviews(List<ReviewResponse> reviews) {
        if (reviewsContainer == null) return;
        reviewsContainer.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(this);

        for (ReviewResponse review : reviews) {
            View card = inflater.inflate(R.layout.item_review_home, reviewsContainer, false);
            
            // Ocultar la imagen del juego ya que estamos en la página del juego
            View gameImg = card.findViewById(R.id.game_image_review);
            if (gameImg != null) {
                gameImg.setVisibility(View.GONE);
            }

            // Ajustar márgenes para que se vea bien en la lista vertical
            LinearLayout.LayoutParams lp = (LinearLayout.LayoutParams) card.getLayoutParams();
            lp.setMargins(0, 0, 0, (int)(12 * getResources().getDisplayMetrics().density));
            card.setLayoutParams(lp);

            // Vinculación de datos de la reseña (usuario, contenido, rating, etc.)
            TextView user = card.findViewById(R.id.user_name_review);
            TextView content = card.findViewById(R.id.review_content);
            RatingBar rb = card.findViewById(R.id.ratingBarReview);
            ImageView avatar = card.findViewById(R.id.user_pfp_review);

            user.setText(review.getUsuario());
            content.setText(review.getContenido());
            float score = review.getPuntuacion() != null ? (float) review.getPuntuacion() : 0;
            rb.setRating(score);

            ImageUtils.loadUserAvatar(this, review.getAvatar(), review.getUsuario(), avatar);

            View.OnClickListener toProfile = v -> {
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
            user.setOnClickListener(toProfile);
            avatar.setOnClickListener(toProfile);

            reviewsContainer.addView(card);
        }
    }

    private void setupActionButtons() {
        btnLibrary.setOnClickListener(v -> addGameToStatus("jugando"));
        btnFavorite.setOnClickListener(v -> addGameToStatus("favorito"));
        btnWishlist.setOnClickListener(v -> addGameToStatus("pendiente"));

        btnReview.setOnClickListener(v -> {
            if (currentGame != null) {
                // Primero lo añadimos como "jugando" si no está en biblioteca
                if (currentStatus == null) {
                    addGameToStatus("jugando");
                }

                // Abrimos el popup de reseña
                AddGameFinalActivity dialog = AddGameFinalActivity.newInstance(
                        currentGameId,
                        currentGame.getTitulo(),
                        currentGame.getImagen(),
                        0
                );
                dialog.show(getSupportFragmentManager(), "AddGameFinalActivity");
            }
        });
    }

    private void addGameToStatus(String status) {
        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        int userId = prefs.getInt("user_id", -1);

        if (userId == -1) {
            Toast.makeText(this, "Inicia sesión para guardar juegos", Toast.LENGTH_SHORT).show();
            return;
        }

        if (status.equals(currentStatus)) {
            // Eliminar si ya tiene ese estado
            RetrofitClient.getUsersService().removeGameFromLibrary(userId, currentGameId).enqueue(new Callback<AuthResponse>() {
                @Override
                public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                    if (response.isSuccessful()) {
                        currentStatus = null;
                        updateButtonStates();
                        Toast.makeText(GameInfoActivity.this, "Eliminado de la biblioteca", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<AuthResponse> call, Throwable t) {
                    Toast.makeText(GameInfoActivity.this, "Error de red", Toast.LENGTH_SHORT).show();
                }
            });
            return;
        }

        Map<String, Object> body = new HashMap<>();
        body.put("id_juego", currentGameId);
        body.put("estado", status);

        RetrofitClient.getUsersService().addGameToLibrary(userId, body).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful()) {
                    currentStatus = status;
                    updateButtonStates();
                    Toast.makeText(GameInfoActivity.this, "Juego actualizado: " + status, Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(GameInfoActivity.this, "Error al actualizar estado", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(GameInfoActivity.this, "Error de red", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
