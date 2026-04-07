package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.mobileapp.api.ApiPerfilService;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.ProfileResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileActivity extends AppCompatActivity {

    private Button gamesProfile;
    private Button wishlistProfile;
    private Button reviewsProfile;
    private Button listProfile;
    private Button friendsProfile;
    private TextView usernameText;
    private TextView joinDateText;
    private ImageView profileImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        new HeaderManager(this);

        usernameText = findViewById(R.id.username);
        joinDateText = findViewById(R.id.textView19);
        profileImage = findViewById(R.id.pfp_icon);
        gamesProfile = findViewById(R.id.gamesProfileBtn);
        wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        listProfile = findViewById(R.id.listProfileBtn);
        friendsProfile = findViewById(R.id.friendsProfileBtn);

        loadUserProfile();

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

        friendsProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ProfileActivity.this, FriendsProfileActivity.class));
            }
        });
    }

    private void loadUserProfile() {
        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        int userId = prefs.getInt("user_id", -1);

        if (userId == -1) {
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
                        updateUI(profile);
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

    private void updateUI(ProfileResponse profile) {
        ProfileResponse.User user = profile.getUser();
        ProfileResponse.Stats stats = profile.getStats();

        usernameText.setText(user.getNombre().toUpperCase());
        joinDateText.setText(user.getFechaCreacion() != null ? user.getFechaCreacion() : "N/A");

        String avatarUrl = user.getAvatar();
        if (avatarUrl != null && !avatarUrl.isEmpty()) {
            if (!avatarUrl.startsWith("http")) {
                avatarUrl = "http://10.0.2.2:3000/" + avatarUrl;
            }

            Glide.with(this)
                    .load(avatarUrl)
                    .diskCacheStrategy(com.bumptech.glide.load.engine.DiskCacheStrategy.NONE)
                    .skipMemoryCache(true)
                    .placeholder(R.drawable.image)
                    .error(R.drawable.image)
                    .circleCrop()
                    .into(profileImage);
        }

        gamesProfile.setText("JUEGOS (" + stats.getJuegos() + ")");
        wishlistProfile.setText("WISHLIST");
        reviewsProfile.setText("REVIEWS (" + stats.getResenas() + ")");
        listProfile.setText("LISTAS (" + stats.getListas() + ")");
        friendsProfile.setText("AMIGOS (" + stats.getSeguidores() + ")");
    }
}
