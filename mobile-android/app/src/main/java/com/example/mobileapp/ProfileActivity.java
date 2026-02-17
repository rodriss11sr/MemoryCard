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

public class ProfileActivity extends AppCompatActivity {

    Button gamesProfile;
    Button wishlistProfile;
    Button reviewsProfile;
    Button listProfile;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        DrawerLayout drawerLayout = findViewById(R.id.profile);
        ImageButton slideOutMenu = findViewById(R.id.slide_out_menu);
        NavigationView navigationView = findViewById(R.id.nav_view);


        gamesProfile = findViewById(R.id.gamesProfileBtn);
        wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        listProfile = findViewById(R.id.listProfileBtn);

        wishlistProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfileActivity.this, WishlistProfileActivity.class);
                startActivity(intent);
            }
        });
        gamesProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfileActivity.this, GamesProfileActivity.class);
                startActivity(intent);
            }
        });
        reviewsProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfileActivity.this, ReviewProfileActivity.class);
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
                    drawerLayout.closeDrawer(GravityCompat.START);
                    return true;
                }
                else if (itemId == R.id.nav_mainPage) {
                    Intent intent = new Intent(ProfileActivity.this, MainScreenActivity.class);
                    startActivity(intent);
                }
                drawerLayout.closeDrawer(GravityCompat.START);
                return true;
            }
        });
    }
}
