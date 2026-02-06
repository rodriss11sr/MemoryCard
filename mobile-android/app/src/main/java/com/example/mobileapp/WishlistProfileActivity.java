package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class WishlistProfileActivity extends AppCompatActivity {

    Button gamesProfile;
    Button reviewsProfile;
    Button listProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.wishlist_profile_activity);

        gamesProfile = findViewById(R.id.gamesProfile);
        reviewsProfile = findViewById(R.id.reviewsProfile);

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
