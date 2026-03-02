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
        new HeaderManager(this);

        gamesProfile = findViewById(R.id.gamesProfileBtn);
        wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        listProfile = findViewById(R.id.listProfileBtn);

        listProfile.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfileActivity.this, ListsProfileActivity.class);
                startActivity(intent);
            }
        });
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
    }
}
