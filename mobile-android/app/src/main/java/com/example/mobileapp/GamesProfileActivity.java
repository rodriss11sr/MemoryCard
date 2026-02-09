package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.core.view.ViewCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.imageview.ShapeableImageView;
import com.google.android.material.navigation.NavigationView;

public class GamesProfileActivity extends AppCompatActivity {

    Button wishlistProfile;
    Button reviewsProfile;
    Button listProfile;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gamesprofile);

        //Variables del drawer
        DrawerLayout drawerLayout = findViewById(R.id.gamesProfile);
        ImageButton slideOutMenu = findViewById(R.id.slide_out_menu);
        NavigationView navigationView = findViewById(R.id.nav_view);
        ShapeableImageView profileBtn = findViewById(R.id.profileBtn);


        //Variables del accordion
        View accordionView = findViewById(R.id.accordion_games_profile);
        TextView accordionTitle = findViewById(R.id.accordion_title);
        ImageView arrowIcon = accordionView.findViewById(R.id.arrow_icon);
        LinearLayout expandableContent = accordionView.findViewById(R.id.expandable_content);
        Button releaseDateAccordionGamesProfile = findViewById(R.id.releaseDateAccordionGamesProfile);
        Button nameAccordionGamesProfile = findViewById(R.id.nameAccordionGamesProfile);
        Button ratingAccordionGamesProfile = findViewById(R.id.ratingAccordionGamesProfile);
        Button latestAddedAccordionGamesProfile = findViewById(R.id.LatestAddedAccordionGamesProfile);

        wishlistProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(GamesProfileActivity.this, WishlistProfileActivity.class);
                startActivity(intent);
            }
        });




        View.OnClickListener toggleAccordion = v -> {
          if(expandableContent.getVisibility() == View.VISIBLE) {
              expandableContent.setVisibility(View.GONE);
              arrowIcon.setRotation(0);
          }else{
              expandableContent.setVisibility(View.VISIBLE);
              arrowIcon.setRotation(180);
          }
        };

        releaseDateAccordionGamesProfile.setOnClickListener(v -> {
            accordionTitle.setText(releaseDateAccordionGamesProfile.getText().toString());
            accordionTitle.performClick();
        });
        nameAccordionGamesProfile.setOnClickListener(v -> {
            accordionTitle.setText(nameAccordionGamesProfile.getText().toString());
            accordionTitle.performClick();
        });
        ratingAccordionGamesProfile.setOnClickListener(v -> {
            accordionTitle.setText(ratingAccordionGamesProfile.getText().toString());
            accordionTitle.performClick();
        });
        latestAddedAccordionGamesProfile.setOnClickListener(v -> {
            accordionTitle.setText(latestAddedAccordionGamesProfile.getText().toString());
            accordionTitle.performClick();
        });

        accordionTitle.setOnClickListener(toggleAccordion);
        arrowIcon.setOnClickListener(toggleAccordion);


        profileBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(GamesProfileActivity.this, ProfileActivity.class);
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
                    Intent intent = new Intent(GamesProfileActivity.this, ProfileActivity.class);
                    startActivity(intent);
                }
                else if (itemId == R.id.nav_mainPage) {
                    Intent intent = new Intent(GamesProfileActivity.this, MainScreenActivity.class);
                    startActivity(intent);
                }
                drawerLayout.closeDrawer(GravityCompat.START);
                return true;
            }
        });
    }
}
