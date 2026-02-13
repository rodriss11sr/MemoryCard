package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.imageview.ShapeableImageView;
import com.google.android.material.navigation.NavigationView;

public class WishlistProfileActivity extends AppCompatActivity {

    Button gamesProfile;
    Button reviewsProfile;
    Button listProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.wishlist_profile_activity);

        DrawerLayout drawerLayout = findViewById(R.id.wishlistProfile);
        ImageButton slideOutMenu = findViewById(R.id.slide_out_menu);
        NavigationView navigationView = findViewById(R.id.nav_view);
        ShapeableImageView profileBtn = findViewById(R.id.profileBtn);

        profileBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(WishlistProfileActivity.this, ProfileActivity.class);
                startActivity(intent);
            }
        });

        slideOutMenu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                drawerLayout.openDrawer(GravityCompat.START);
            }
        });

        drawerLayout.addDrawerListener(new DrawerLayout.DrawerListener() {
            @Override
            public void onDrawerSlide(@NonNull View drawerView, float slideOffset) {
            }
            @Override
            public void onDrawerOpened(@NonNull View drawerView) {
                slideOutMenu.setImageResource(R.drawable.menu_open);
            }
            @Override
            public void onDrawerClosed(@NonNull View drawerView) {
                slideOutMenu.setImageResource(R.drawable.menu_closed);
            }
            @Override
            public void onDrawerStateChanged(int newState) {
            }
        });

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int itemId = item.getItemId();
                if (itemId == R.id.nav_profile) {
                    Intent intent = new Intent(WishlistProfileActivity.this, ProfileActivity.class);
                    startActivity(intent);
                }
                else if (itemId == R.id.nav_mainPage) {
                    Intent intent = new Intent(WishlistProfileActivity.this, MainScreenActivity.class);
                    startActivity(intent);
                }
                drawerLayout.closeDrawer(GravityCompat.START);
                return true;
            }
        });



        gamesProfile = findViewById(R.id.gamesProfileBtn);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        listProfile = findViewById(R.id.listProfileBtn);

        gamesProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(WishlistProfileActivity.this, GamesProfileActivity.class);
                startActivity(intent);
            }
        });
        reviewsProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(WishlistProfileActivity.this, ReviewProfileActivity.class);
                startActivity(intent);
            }
        });






    }
}
