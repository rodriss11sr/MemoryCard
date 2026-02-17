package com.example.mobileapp;

import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class ListsProfileActivity extends AppCompatActivity {

    Button gamesProfile;
    Button wishlistProfile;
    Button reviewsProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.lists_profile);

        gamesProfile = findViewById(R.id.gamesProfile);
        wishlistProfile = findViewById(R.id.wishlistProfile);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);
    }


}
