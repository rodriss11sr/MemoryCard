package com.example.mobileapp;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.GameResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GamesListedActivity extends AppCompatActivity {

    private LinearLayout gamesListContainer;
    private List<GameResponse> fullGamesList = new ArrayList<>();
    private static final String BASE_URL = "http://10.0.2.2:3000/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.games_listed_activity);
        new HeaderManager(this);

        gamesListContainer = findViewById(R.id.gamesListContainer);
        String query = getIntent().getStringExtra("SEARCH_QUERY");

        if (query != null && !query.isEmpty()) {
            searchGames(query);
        }

        setupAccordion();
    }

    private void searchGames(String query) {
        fullGamesList.clear();
        RetrofitClient.getGamesService().searchGames(query).enqueue(new Callback<List<GameResponse>>() {
            @Override
            public void onResponse(Call<List<GameResponse>> call, Response<List<GameResponse>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    fetchFullDetails(response.body());
                } else {
                    Toast.makeText(GamesListedActivity.this, "No se encontraron juegos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<GameResponse>> call, Throwable t) {
                Toast.makeText(GamesListedActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void fetchFullDetails(List<GameResponse> searchResults) {
        if (gamesListContainer == null) return;
        gamesListContainer.removeAllViews();
        
        for (GameResponse result : searchResults) {
            RetrofitClient.getGamesService().getGameById(result.getId()).enqueue(new Callback<GameResponse>() {
                @Override
                public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        fullGamesList.add(response.body());
                        renderGamesList(); // Actualizamos la lista conforme llegan los datos
                    }
                }
                @Override
                public void onFailure(Call<GameResponse> call, Throwable t) {}
            });
        }
    }

    private void renderGamesList() {
        if (gamesListContainer == null) return;
        gamesListContainer.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(this);

        for (GameResponse game : fullGamesList) {
            View itemView = inflater.inflate(R.layout.item_game_listed, gamesListContainer, false);

            ImageButton gameImg = itemView.findViewById(R.id.game_image);
            TextView title = itemView.findViewById(R.id.game_title);
            TextView platforms = itemView.findViewById(R.id.game_platforms);
            TextView date = itemView.findViewById(R.id.game_date);

            title.setText(game.getTitulo() != null ? game.getTitulo() : "Sin título");
            date.setText(game.getFecha() != null ? game.getFecha() : "Fecha desconocida");

            if (game.getPlataforma() != null && !game.getPlataforma().isEmpty()) {
                platforms.setText(String.join(" / ", game.getPlataforma()));
            } else {
                platforms.setText("Plataformas no disponibles");
            }

            String imageUrl = game.getImagen();
            if (imageUrl != null && !imageUrl.startsWith("http")) imageUrl = BASE_URL + imageUrl;
            
            gameImg.setPadding(0, 0, 0, 0);
            gameImg.setScaleType(ImageView.ScaleType.CENTER_CROP);
            
            Glide.with(this)
                    .load(imageUrl)
                    .centerCrop()
                    .placeholder(R.drawable.ballxpit)
                    .into(gameImg);

            View.OnClickListener openDetail = v -> GameInfoActivity.open(this, game);
            itemView.setOnClickListener(openDetail);
            gameImg.setOnClickListener(openDetail);

            gamesListContainer.addView(itemView);
        }
    }

    private void sortGames(String criteria) {
        if (fullGamesList.isEmpty()) return;

        Collections.sort(fullGamesList, (g1, g2) -> {
            switch (criteria) {
                case "Fecha":
                    return compareDates(g2.getFecha(), g1.getFecha()); // Más recientes primero
                case "Nombre":
                    return g1.getTitulo().compareToIgnoreCase(g2.getTitulo());
                case "Puntuación":
                    Float r1 = g1.getRating() != null ? g1.getRating() : 0f;
                    Float r2 = g2.getRating() != null ? g2.getRating() : 0f;
                    return r2.compareTo(r1);
                default:
                    return 0;
            }
        });
        renderGamesList();
    }

    private int compareDates(String d1, String d2) {
        if (d1 == null || d1.isEmpty()) return 1;
        if (d2 == null || d2.isEmpty()) return -1;
        
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        try {
            Date date1 = sdf.parse(d1);
            Date date2 = sdf.parse(d2);
            return date1.compareTo(date2);
        } catch (ParseException e) {
            return 0;
        }
    }

    private void setupAccordion() {
        View accordionView = findViewById(R.id.accordion_games_profile);
        if (accordionView == null) return;

        TextView accordionTitle = findViewById(R.id.accordion_title);
        ImageView arrowIcon = accordionView.findViewById(R.id.arrow_icon);
        LinearLayout expandableContent = accordionView.findViewById(R.id.expandable_content);
        
        Button releaseDateBtn = findViewById(R.id.releaseDateAccordionGamesProfile);
        Button nameBtn = findViewById(R.id.nameAccordionGamesProfile);
        Button ratingBtn = findViewById(R.id.ratingAccordionGamesProfile);
        Button latestAddedBtn = findViewById(R.id.LatestAddedAccordionGamesProfile);

        View.OnClickListener toggleAccordion = v -> {
            if(expandableContent.getVisibility() == View.VISIBLE) {
                expandableContent.setVisibility(View.GONE);
                arrowIcon.setRotation(0);
            } else {
                expandableContent.setVisibility(View.VISIBLE);
                arrowIcon.setRotation(180);
            }
        };

        if (releaseDateBtn != null) releaseDateBtn.setOnClickListener(v -> {
            accordionTitle.setText(releaseDateBtn.getText().toString());
            sortGames("Fecha");
            toggleAccordion.onClick(null);
        });
        if (nameBtn != null) nameBtn.setOnClickListener(v -> {
            accordionTitle.setText(nameBtn.getText().toString());
            sortGames("Nombre");
            toggleAccordion.onClick(null);
        });
        if (ratingBtn != null) ratingBtn.setOnClickListener(v -> {
            accordionTitle.setText(ratingBtn.getText().toString());
            sortGames("Puntuación");
            toggleAccordion.onClick(null);
        });
        if (latestAddedBtn != null) latestAddedBtn.setOnClickListener(v -> {
            accordionTitle.setText(latestAddedBtn.getText().toString());
            sortGames("Fecha"); // O ID si prefieres
            toggleAccordion.onClick(null);
        });

        if (accordionTitle != null) accordionTitle.setOnClickListener(toggleAccordion);
        if (arrowIcon != null) arrowIcon.setOnClickListener(toggleAccordion);
    }
}
