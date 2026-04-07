package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.UserSearchResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FriendsProfileActivity extends AppCompatActivity {

    private LinearLayout friendsContainer;
    private TextView emptyText;
    private EditText searchInput;
    private Button btnSiguiendo, btnSeguidores, btnBuscar;
    private int userId;
    private String currentTab = "siguiendo";
    private final Handler searchHandler = new Handler(Looper.getMainLooper());
    private Runnable searchRunnable;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.friends_profile_activity);
        new HeaderManager(this);

        friendsContainer = findViewById(R.id.friendsContainer);
        emptyText = findViewById(R.id.emptyFriendsText);
        searchInput = findViewById(R.id.searchUserInput);
        btnSiguiendo = findViewById(R.id.btnSiguiendo);
        btnSeguidores = findViewById(R.id.btnSeguidores);
        btnBuscar = findViewById(R.id.btnBuscarUsuario);
        TextView usernameTitle = findViewById(R.id.textView21);

        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
        userId = prefs.getInt("user_id", -1);
        String userName = prefs.getString("user_nombre", "Usuario");

        if (usernameTitle != null) {
            usernameTitle.setText(userName.toUpperCase());
        }

        btnSiguiendo.setOnClickListener(v -> switchTab("siguiendo"));
        btnSeguidores.setOnClickListener(v -> switchTab("seguidores"));
        btnBuscar.setOnClickListener(v -> switchTab("buscar"));

        searchInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {}
            @Override
            public void afterTextChanged(Editable s) {
                if (searchRunnable != null) searchHandler.removeCallbacks(searchRunnable);
                String query = s.toString().trim();
                if (query.length() < 2) {
                    friendsContainer.removeAllViews();
                    return;
                }
                searchRunnable = () -> searchUsers(query);
                searchHandler.postDelayed(searchRunnable, 400);
            }
        });

        loadFriends("siguiendo");
    }

    private void switchTab(String tab) {
        currentTab = tab;
        btnSiguiendo.setBackgroundTintList(android.content.res.ColorStateList.valueOf(
                tab.equals("siguiendo") ? 0xFF0466C8 : 0xFF2D333E));
        btnSeguidores.setBackgroundTintList(android.content.res.ColorStateList.valueOf(
                tab.equals("seguidores") ? 0xFF0466C8 : 0xFF2D333E));
        btnBuscar.setBackgroundTintList(android.content.res.ColorStateList.valueOf(
                tab.equals("buscar") ? 0xFF0466C8 : 0xFF2D333E));

        if (tab.equals("buscar")) {
            searchInput.setVisibility(View.VISIBLE);
            searchInput.requestFocus();
            friendsContainer.removeAllViews();
            emptyText.setVisibility(View.GONE);
        } else {
            searchInput.setVisibility(View.GONE);
            searchInput.setText("");
            loadFriends(tab);
        }
    }

    private void loadFriends(String tipo) {
        if (userId == -1) {
            emptyText.setVisibility(View.VISIBLE);
            return;
        }

        RetrofitClient.getUsersService().getFriends(userId, tipo).enqueue(new Callback<List<UserSearchResponse.UserSearchItem>>() {
            @Override
            public void onResponse(Call<List<UserSearchResponse.UserSearchItem>> call, Response<List<UserSearchResponse.UserSearchItem>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    displayFriends(response.body(), tipo.equals("siguiendo"));
                } else {
                    friendsContainer.removeAllViews();
                    emptyText.setText(tipo.equals("siguiendo") ? "No sigues a nadie todavía" : "No tienes seguidores");
                    emptyText.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<List<UserSearchResponse.UserSearchItem>> call, Throwable t) {
                Toast.makeText(FriendsProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                emptyText.setVisibility(View.VISIBLE);
            }
        });
    }

    private void searchUsers(String query) {
        RetrofitClient.getUsersService().searchUsers(query, userId).enqueue(new Callback<UserSearchResponse>() {
            @Override
            public void onResponse(Call<UserSearchResponse> call, Response<UserSearchResponse> response) {
                if (response.isSuccessful() && response.body() != null && response.body().getUsuarios() != null) {
                    displaySearchResults(response.body().getUsuarios());
                }
            }

            @Override
            public void onFailure(Call<UserSearchResponse> call, Throwable t) {
                Toast.makeText(FriendsProfileActivity.this, "Error buscando usuarios", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void displayFriends(List<UserSearchResponse.UserSearchItem> friends, boolean canUnfollow) {
        friendsContainer.removeAllViews();

        if (friends.isEmpty()) {
            emptyText.setText(canUnfollow ? "No sigues a nadie todavía" : "No tienes seguidores");
            emptyText.setVisibility(View.VISIBLE);
            return;
        }
        emptyText.setVisibility(View.GONE);

        LayoutInflater inflater = LayoutInflater.from(this);
        for (UserSearchResponse.UserSearchItem friend : friends) {
            View card = inflater.inflate(R.layout.item_friend_card, friendsContainer, false);
            bindFriendCard(card, friend, canUnfollow);
            friendsContainer.addView(card);
        }
    }

    private void displaySearchResults(List<UserSearchResponse.UserSearchItem> users) {
        friendsContainer.removeAllViews();

        if (users.isEmpty()) {
            emptyText.setText("No se encontraron usuarios");
            emptyText.setVisibility(View.VISIBLE);
            return;
        }
        emptyText.setVisibility(View.GONE);

        LayoutInflater inflater = LayoutInflater.from(this);
        for (UserSearchResponse.UserSearchItem user : users) {
            if (user.getId() == userId) continue;
            View card = inflater.inflate(R.layout.item_friend_card, friendsContainer, false);
            bindSearchCard(card, user);
            friendsContainer.addView(card);
        }
    }

    private void bindFriendCard(View card, UserSearchResponse.UserSearchItem friend, boolean canUnfollow) {
        ImageView avatar = card.findViewById(R.id.friendAvatar);
        TextView name = card.findViewById(R.id.friendName);
        TextView games = card.findViewById(R.id.friendGames);
        Button btn = card.findViewById(R.id.btnFollowAction);

        name.setText(friend.getNombre());
        games.setText("Juegos: " + friend.getJuegos());

        ImageUtils.loadUserAvatar(this, friend.getAvatar(), friend.getNombre(), avatar);

        if (canUnfollow) {
            btn.setText("Dejar de seguir");
            btn.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0xFFCC3333));
            btn.setOnClickListener(v -> unfollowUser(friend.getId(), card));
        } else {
            btn.setVisibility(View.GONE);
        }

        card.setOnClickListener(v -> openProfileForUser(friend.getId(), friend.getNombre()));
    }

    private void bindSearchCard(View card, UserSearchResponse.UserSearchItem user) {
        ImageView avatar = card.findViewById(R.id.friendAvatar);
        TextView name = card.findViewById(R.id.friendName);
        TextView games = card.findViewById(R.id.friendGames);
        Button btn = card.findViewById(R.id.btnFollowAction);

        name.setText(user.getNombre());
        games.setText("Juegos: " + user.getJuegos());

        ImageUtils.loadUserAvatar(this, user.getAvatar(), user.getNombre(), avatar);

        if (user.isYaSigues()) {
            btn.setText("Siguiendo");
            btn.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0xFF2D333E));
            btn.setOnClickListener(v -> {
                unfollowUser(user.getId(), null);
                btn.setText("Seguir");
                btn.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0xFF0466C8));
                btn.setOnClickListener(v2 -> {
                    followUser(user.getId());
                    btn.setText("Siguiendo");
                    btn.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0xFF2D333E));
                });
            });
        } else {
            btn.setText("Seguir");
            btn.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0xFF0466C8));
            btn.setOnClickListener(v -> {
                followUser(user.getId());
                btn.setText("Siguiendo");
                btn.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0xFF2D333E));
                btn.setOnClickListener(v2 -> {
                    unfollowUser(user.getId(), null);
                    btn.setText("Seguir");
                    btn.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0xFF0466C8));
                });
            });
        }

        card.setOnClickListener(v -> openProfileForUser(user.getId(), user.getNombre()));
    }

    private void openProfileForUser(int id, String nombre) {
        SharedPreferences p = getSharedPreferences("user_session", MODE_PRIVATE);
        int sessionId = p.getInt("user_id", -1);
        if (id == sessionId) {
            startActivity(new Intent(this, ProfileActivity.class));
        } else {
            ProfileActivity.openForUser(this, id, nombre);
        }
    }

    private void followUser(int targetId) {
        Map<String, Integer> body = new HashMap<>();
        body.put("id_seguido", targetId);
        RetrofitClient.getUsersService().followUser(userId, body).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(FriendsProfileActivity.this, "Ahora sigues a este usuario", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(FriendsProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void unfollowUser(int targetId, View cardToRemove) {
        RetrofitClient.getUsersService().unfollowUser(userId, targetId).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(FriendsProfileActivity.this, "Has dejado de seguir a este usuario", Toast.LENGTH_SHORT).show();
                    if (cardToRemove != null) {
                        friendsContainer.removeView(cardToRemove);
                        if (friendsContainer.getChildCount() == 0) {
                            emptyText.setText("No sigues a nadie todavía");
                            emptyText.setVisibility(View.VISIBLE);
                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(FriendsProfileActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
