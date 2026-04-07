package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ImageButton;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mobileapp.api.ApiPerfilService;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.ProfileResponse;
import com.example.mobileapp.models.responses.GameResponse;
import com.example.mobileapp.models.responses.UserGameResponse;
import com.example.mobileapp.models.responses.UserSearchResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileActivity extends AppCompatActivity {
    public static final String EXTRA_PROFILE_USER_ID = "profile_user_id";
    public static final String EXTRA_PROFILE_NAME = "profile_name";

    private Button gamesProfile;
    private Button wishlistProfile;
    private Button reviewsProfile;
    private Button listProfile;
    private Button friendsProfile;
    private TextView usernameText;
    private TextView joinDateText;
    private ImageView profileImage;
    private int sessionUserId = -1;
    private int targetUserId = -1;
    private boolean isOwnProfile = true;
    private boolean isFollowingTarget = false;
    private int followersCount = 0;
    private final List<UserGameResponse> profileGames = new ArrayList<>();

    public static void openForUser(android.content.Context context, int userId, String name) {
        Intent i = new Intent(context, ProfileActivity.class);
        i.putExtra(EXTRA_PROFILE_USER_ID, userId);
        if (name != null && !name.isEmpty()) {
            i.putExtra(EXTRA_PROFILE_NAME, name);
        }
        context.startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        new HeaderManager(this);
        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        sessionUserId = prefs.getInt("user_id", -1);
        targetUserId = getIntent().getIntExtra(EXTRA_PROFILE_USER_ID, sessionUserId);
        if (targetUserId <= 0) targetUserId = sessionUserId;
        isOwnProfile = targetUserId == sessionUserId;

        usernameText = findViewById(R.id.username);
        joinDateText = findViewById(R.id.textView19);
        profileImage = findViewById(R.id.pfp_icon);
        gamesProfile = findViewById(R.id.gamesProfileBtn);
        wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        listProfile = findViewById(R.id.listProfileBtn);
        friendsProfile = findViewById(R.id.friendsProfileBtn);

        String hintName = getIntent().getStringExtra(EXTRA_PROFILE_NAME);
        if (hintName != null && !hintName.isEmpty()) {
            usernameText.setText(hintName.toUpperCase());
        }

        loadUserProfile(targetUserId);
        loadProfileGames(targetUserId);
        if (!isOwnProfile) {
            loadFollowState();
        }

        listProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ProfileActivity.this, ListsProfileActivity.class));
            }
        });

        wishlistProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ProfileActivity.this, WishlistProfileActivity.class));
            }
        });

        gamesProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ProfileActivity.this, GamesProfileActivity.class));
            }
        });

        reviewsProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ProfileActivity.this, ReviewProfileActivity.class));
            }
        });

        friendsProfile.setOnClickListener(v -> {
            if (isOwnProfile) {
                startActivity(new Intent(ProfileActivity.this, FriendsProfileActivity.class));
            } else {
                toggleFollowTarget();
            }
        });
    }

    private void loadUserProfile(int userId) {
        if (userId <= 0) {
            Toast.makeText(this, "Error: No se encontró sesión de usuario", Toast.LENGTH_SHORT).show();
            return;
        }

        ApiPerfilService perfilService = RetrofitClient.getProfileService();
        Call<ProfileResponse> call = perfilService.getProfile(userId);

        call.enqueue(new Callback<ProfileResponse>() {
            @Override
            public void onResponse(Call<ProfileResponse> call, Response<ProfileResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    ProfileResponse profile = response.body();
                    if (profile.isOk()) {
                        updateUI(profile, isOwnProfile);
                    } else {
                        Toast.makeText(ProfileActivity.this, "Error al obtener perfil", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(ProfileActivity.this, "Error del servidor: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ProfileResponse> call, Throwable t) {
                Toast.makeText(ProfileActivity.this, "Error de conexión: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }

    private void updateUI(ProfileResponse profile, boolean ownProfile) {
        ProfileResponse.User user = profile.getUser();
        ProfileResponse.Stats stats = profile.getStats();

        String nombre = user.getNombre() != null ? user.getNombre() : "";
        usernameText.setText(nombre.toUpperCase());
        joinDateText.setText(user.getFechaCreacion() != null ? user.getFechaCreacion() : "N/A");

        ImageUtils.loadUserAvatar(this, user.getAvatar(), nombre, profileImage);

        gamesProfile.setText("JUEGOS (" + stats.getJuegos() + ")");
        wishlistProfile.setText("WISHLIST");
        reviewsProfile.setText("REVIEWS (" + stats.getResenas() + ")");
        listProfile.setText("LISTAS (" + stats.getListas() + ")");
        followersCount = stats.getSeguidores();
        if (ownProfile) {
            friendsProfile.setText("AMIGOS (" + followersCount + ")");
        } else {
            updateFollowButtonText();
        }
    }

    private void loadFollowState() {
        if (sessionUserId <= 0 || targetUserId <= 0) return;
        RetrofitClient.getUsersService().getFriends(sessionUserId, "siguiendo")
                .enqueue(new Callback<List<UserSearchResponse.UserSearchItem>>() {
                    @Override
                    public void onResponse(Call<List<UserSearchResponse.UserSearchItem>> call,
                            Response<List<UserSearchResponse.UserSearchItem>> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            isFollowingTarget = false;
                            for (UserSearchResponse.UserSearchItem u : response.body()) {
                                if (u.getId() == targetUserId) {
                                    isFollowingTarget = true;
                                    break;
                                }
                            }
                            updateFollowButtonText();
                        }
                    }

                    @Override
                    public void onFailure(Call<List<UserSearchResponse.UserSearchItem>> call, Throwable t) {
                    }
                });
    }

    private void updateFollowButtonText() {
        if (isOwnProfile) {
            friendsProfile.setText("AMIGOS (" + followersCount + ")");
            return;
        }
        friendsProfile.setText(isFollowingTarget ? "DEJAR DE SEGUIR" : "SEGUIR");
    }

    private void toggleFollowTarget() {
        if (sessionUserId <= 0 || targetUserId <= 0 || sessionUserId == targetUserId) return;
        if (isFollowingTarget) {
            RetrofitClient.getUsersService().unfollowUser(sessionUserId, targetUserId)
                    .enqueue(new Callback<AuthResponse>() {
                        @Override
                        public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                            if (response.isSuccessful()) {
                                isFollowingTarget = false;
                                updateFollowButtonText();
                                Toast.makeText(ProfileActivity.this, "Has dejado de seguir", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<AuthResponse> call, Throwable t) {
                            Toast.makeText(ProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                        }
                    });
        } else {
            Map<String, Integer> body = new HashMap<>();
            body.put("id_seguido", targetUserId);
            RetrofitClient.getUsersService().followUser(sessionUserId, body)
                    .enqueue(new Callback<AuthResponse>() {
                        @Override
                        public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                            if (response.isSuccessful()) {
                                isFollowingTarget = true;
                                updateFollowButtonText();
                                Toast.makeText(ProfileActivity.this, "Ahora sigues a este usuario", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<AuthResponse> call, Throwable t) {
                            Toast.makeText(ProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                        }
                    });
        }
    }

    private void loadProfileGames(int userId) {
        RetrofitClient.getUsersService().getUserGames(userId, null)
                .enqueue(new Callback<List<UserGameResponse>>() {
                    @Override
                    public void onResponse(Call<List<UserGameResponse>> call, Response<List<UserGameResponse>> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            profileGames.clear();
                            profileGames.addAll(response.body());
                            bindProfileGameStrips();
                        }
                    }

                    @Override
                    public void onFailure(Call<List<UserGameResponse>> call, Throwable t) {
                    }
                });
    }

    private void bindProfileGameStrips() {
        ImageButton[] favoriteButtons = new ImageButton[] {
                findViewById(R.id.game_ds3),
                findViewById(R.id.game_tboi),
                findViewById(R.id.game_mhworld),
                findViewById(R.id.game1_ror2)
        };
        ImageButton[] recentButtons = new ImageButton[] {
                findViewById(R.id.game_deadspace),
                findViewById(R.id.game_dredge),
                findViewById(R.id.game_mhwilds),
                findViewById(R.id.game1_gow)
        };
        RatingBar[] recentRatings = new RatingBar[] {
                findViewById(R.id.ratingBarReview),
                findViewById(R.id.ratingBarReview2),
                findViewById(R.id.ratingBarReview3),
                findViewById(R.id.ratingBarReview4)
        };

        List<UserGameResponse> byRating = new ArrayList<>(profileGames);
        Collections.sort(byRating, (a, b) -> Float.compare(
                b.getRating() != null ? b.getRating() : 0f,
                a.getRating() != null ? a.getRating() : 0f));

        List<UserGameResponse> byRecent = new ArrayList<>(profileGames);
        Collections.sort(byRecent, (a, b) -> {
            String fa = a.getFechaAgregado() != null ? a.getFechaAgregado() : "";
            String fb = b.getFechaAgregado() != null ? b.getFechaAgregado() : "";
            return fb.compareTo(fa);
        });

        bindGameImageRow(favoriteButtons, byRating, null);
        bindGameImageRow(recentButtons, byRecent, recentRatings);
    }

    private void bindGameImageRow(ImageButton[] targets, List<UserGameResponse> source, RatingBar[] ratings) {
        for (int i = 0; i < targets.length; i++) {
            ImageButton img = targets[i];
            if (i < source.size()) {
                UserGameResponse g = source.get(i);
                img.setVisibility(View.VISIBLE);
                ImageUtils.loadImage(this, g.getImagen(), img);
                img.setOnClickListener(v -> openGameDetail(g.getId()));
                if (ratings != null && i < ratings.length && ratings[i] != null) {
                    ratings[i].setVisibility(View.VISIBLE);
                    ratings[i].setRating((g.getRating() != null ? g.getRating() : 0f) / 2f);
                }
            } else {
                img.setVisibility(View.INVISIBLE);
                if (ratings != null && i < ratings.length && ratings[i] != null) {
                    ratings[i].setVisibility(View.INVISIBLE);
                }
            }
        }
    }

    private void openGameDetail(int gameId) {
        RetrofitClient.getGamesService().getGameById(gameId).enqueue(new Callback<GameResponse>() {
            @Override
            public void onResponse(Call<GameResponse> call, Response<GameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    GameInfoActivity.open(ProfileActivity.this, response.body());
                }
            }

            @Override
            public void onFailure(Call<GameResponse> call, Throwable t) {
                Toast.makeText(ProfileActivity.this, "Error al cargar juego", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
