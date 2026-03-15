package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class ProfileActivity extends AppCompatActivity {

    Button gamesProfile;
    Button wishlistProfile;
    Button reviewsProfile;
    Button listProfile;
    Button friendsProfile;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        new HeaderManager(this);

        gamesProfile = findViewById(R.id.gamesProfileBtn);
        wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);
        listProfile = findViewById(R.id.listProfileBtn);
        friendsProfile=findViewById(R.id.friendsProfileBtn);


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
        friendsProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProfileActivity.this, FriendsProfileActivity.class);
                startActivity(intent);
            }
        });
    }
}
