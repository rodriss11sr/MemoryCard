package com.example.mobileapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mobileapp.api.ApiPerfilService;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.ProfileResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Perfil de solo lectura de otro usuario. No modifica juegos, listas ni wishlist.
 */
public class UserProfileActivity extends AppCompatActivity {

    public static final String EXTRA_USER_ID = "user_profile_id";
    public static final String EXTRA_USER_NAME = "user_profile_name";

    public static void start(Context context, int userId, @Nullable String displayName) {
        if (userId <= 0) return;
        Intent i = new Intent(context, UserProfileActivity.class);
        i.putExtra(EXTRA_USER_ID, userId);
        if (displayName != null && !displayName.isEmpty()) {
            i.putExtra(EXTRA_USER_NAME, displayName);
        }
        context.startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_profile);
        new HeaderManager(this);

        int userId = getIntent().getIntExtra(EXTRA_USER_ID, -1);
        String hintName = getIntent().getStringExtra(EXTRA_USER_NAME);

        TextView nameView = findViewById(R.id.userProfileName);
        TextView joinedView = findViewById(R.id.userProfileJoined);
        ImageView pfp = findViewById(R.id.userPfp);
        TextView statGames = findViewById(R.id.userStatGames);
        TextView statReviews = findViewById(R.id.userStatReviews);
        TextView statLists = findViewById(R.id.userStatLists);
        TextView statFollowers = findViewById(R.id.userStatFollowers);
        TextView statFollowing = findViewById(R.id.userStatFollowing);

        if (hintName != null && !hintName.isEmpty()) {
            nameView.setText(hintName.toUpperCase());
        }

        if (userId <= 0) {
            Toast.makeText(this, "Usuario no válido", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        ApiPerfilService api = RetrofitClient.getProfileService();
        api.getProfile(userId).enqueue(new Callback<ProfileResponse>() {
            @Override
            public void onResponse(Call<ProfileResponse> call, Response<ProfileResponse> response) {
                if (!response.isSuccessful() || response.body() == null || !response.body().isOk()) {
                    Toast.makeText(UserProfileActivity.this, "No se pudo cargar el perfil", Toast.LENGTH_SHORT).show();
                    return;
                }
                ProfileResponse profile = response.body();
                ProfileResponse.User u = profile.getUser();
                ProfileResponse.Stats s = profile.getStats();

                String nombre = u.getNombre() != null ? u.getNombre() : "";
                nameView.setText(nombre.toUpperCase());
                String fecha = u.getFechaCreacion() != null ? u.getFechaCreacion() : "—";
                joinedView.setText("Se unió el " + fecha);

                ImageUtils.loadUserAvatar(UserProfileActivity.this, u.getAvatar(), nombre, pfp);

                statGames.setText("Juegos en biblioteca: " + s.getJuegos());
                statReviews.setText("Reseñas: " + s.getResenas());
                statLists.setText("Listas: " + s.getListas());
                statFollowers.setText("Seguidores: " + s.getSeguidores());
                statFollowing.setText("Siguiendo: " + s.getSiguiendo());
            }

            @Override
            public void onFailure(Call<ProfileResponse> call, Throwable t) {
                Toast.makeText(UserProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
