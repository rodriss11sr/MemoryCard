package com.example.mobileapp;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.FragmentManager;
import android.content.SharedPreferences;
import com.google.android.material.imageview.ShapeableImageView;
import com.google.android.material.navigation.NavigationView;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.UserResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HeaderManager {

    private final Activity activity;
    private final View headerView;

    public HeaderManager(Activity activity) {
        this.activity = activity;
        this.headerView = activity.findViewById(R.id.header);
        if (headerView != null) {
            setupButtons();
            setupNavigationMenu();
            loadUserData();
        }
    }

    private void loadUserData() {
        ShapeableImageView profileBtn = headerView.findViewById(R.id.profileBtn);
        if (profileBtn == null) return;

        SessionManager sessionManager = new SessionManager(activity);
        int userId = sessionManager.getUserId();

        if (userId != -1) {
            // Cargar datos locales primero
            ImageUtils.loadUserAvatar(activity, sessionManager.getUserAvatar(), sessionManager.getUserNombre(), profileBtn);

            // Actualizar desde el servidor
            RetrofitClient.getUsersService().getUserById(userId).enqueue(new Callback<UserResponse>() {
                @Override
                public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        UserResponse user = response.body();
                        sessionManager.updateUserData(user.getNombre(), user.getAvatar());
                        // Recargar imagen si ha cambiado
                        ImageUtils.loadUserAvatar(activity, user.getAvatar(), user.getNombre(), profileBtn);
                    }
                }

                @Override
                public void onFailure(Call<UserResponse> call, Throwable t) {}
            });
        }
    }

    private void setupButtons() {
        ImageButton slideMenu = headerView.findViewById(R.id.slide_out_menu);
        ShapeableImageView profileBtn = headerView.findViewById(R.id.profileBtn);
        ImageButton searchBtn = headerView.findViewById(R.id.searchBtn);

        if (slideMenu != null) {
            slideMenu.setOnClickListener(v -> {
                View rootView = ((ViewGroup) activity.findViewById(android.R.id.content)).getChildAt(0);
                if (rootView instanceof DrawerLayout) {
                    ((DrawerLayout) rootView).openDrawer(GravityCompat.START);
                }
            });
        }

        if (profileBtn != null) {
            profileBtn.setOnClickListener(v -> {
                if (!(activity instanceof ProfileActivity)) {
                    activity.startActivity(new Intent(activity, ProfileActivity.class));
                }
            });
        }

        if (searchBtn != null) {
            searchBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (activity instanceof AppCompatActivity) {
                        SearchPopUp searchPopUp = new SearchPopUp();
                        searchPopUp.show(((AppCompatActivity) activity).getSupportFragmentManager(), "SearchPopUp");
                    }
                }
            });
        }
    }
    private void setupNavigationMenu() {
        NavigationView navigationView = activity.findViewById(R.id.nav_view);
        DrawerLayout drawer = activity.findViewById(R.id.drawer_layout);
        if (navigationView != null) {
            navigationView.setNavigationItemSelectedListener(item -> {
                int itemId = item.getItemId();

                if (itemId == R.id.nav_profile) {
                    if (!(activity instanceof ProfileActivity)) {
                        activity.startActivity(new Intent(activity, ProfileActivity.class));
                    }
                } else if (itemId == R.id.nav_mainPage) {
                    if (!(activity instanceof MainScreenActivity)) {
                        activity.startActivity(new Intent(activity, MainScreenActivity.class));
                    }
                } else if (itemId == R.id.nav_reviews){
                    if(!(activity instanceof ReviewsListActivity)){
                        activity.startActivity(new Intent(activity, ReviewsListActivity.class));
                    }
                } else if (itemId == R.id.nav_wishlist){
                    if(!(activity instanceof WishlistProfileActivity)){
                        activity.startActivity(new Intent(activity, WishlistProfileActivity.class));
                    }
                } else if (itemId == R.id.nav_friends){
                    if(!(activity instanceof FriendsProfileActivity)){
                        activity.startActivity(new Intent(activity, FriendsProfileActivity.class));
                    }
                }else if (itemId == R.id.nav_logout){
                    SessionManager session = new SessionManager(activity);
                    session.logout();
                    Intent intent = new Intent(activity, LogInActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    activity.startActivity(intent);
                    activity.finish();
                }

                if (drawer != null) {
                    drawer.closeDrawer(GravityCompat.START);
                }
                return true;
            });
        }
    }
}
