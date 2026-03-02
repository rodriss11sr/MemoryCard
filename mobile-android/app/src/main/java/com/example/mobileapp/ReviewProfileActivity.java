package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class ReviewProfileActivity extends AppCompatActivity{
    Button gamesProfile;
    Button wishlistProfile;
    Button listProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.reviews_profile_activity);
        new HeaderManager(this);

        gamesProfile = findViewById(R.id.gamesProfileBtn);
        wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        listProfile=findViewById(R.id.listProfileBtn);

        listProfile.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReviewProfileActivity.this, ListsProfileActivity.class);
                startActivity(intent);
            }
        });
        gamesProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReviewProfileActivity.this, GamesProfileActivity.class);
                startActivity(intent);
            }
        });
        wishlistProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ReviewProfileActivity.this, WishlistProfileActivity.class);
                startActivity(intent);
            }
        });


    }
}
