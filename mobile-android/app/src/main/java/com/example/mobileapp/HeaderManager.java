package com.example.mobileapp;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.imageview.ShapeableImageView;
import com.google.android.material.navigation.NavigationView;

public class HeaderManager {

    private final Activity activity;
    private final View headerView;

    public HeaderManager(Activity activity) {
        this.activity = activity;
        this.headerView = activity.findViewById(R.id.header);
        if (headerView != null) {
            setupButtons();
            setupNavigationMenu();
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
            searchBtn.setOnClickListener(v -> {
                
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
                }

                if (drawer != null) {
                    drawer.closeDrawer(GravityCompat.START);
                }
                return true;
            });
        }
    }
}
