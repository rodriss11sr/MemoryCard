package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class ListsProfileActivity extends AppCompatActivity {

    Button gamesProfile;
    Button wishlistProfile;
    Button reviewsProfile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.lists_profile_activity);
        new HeaderManager(this);

        gamesProfile = findViewById(R.id.gamesProfileBtn);
        wishlistProfile = findViewById(R.id.wishlistProfileBtn);
        reviewsProfile = findViewById(R.id.reviewsProfileBtn);


        reviewsProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListsProfileActivity.this, ReviewProfileActivity.class);
                startActivity(intent);
            }
        });

        wishlistProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListsProfileActivity.this, WishlistProfileActivity.class);
                startActivity(intent);
            }
        });
        gamesProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListsProfileActivity.this, GamesProfileActivity.class);
                startActivity(intent);
            }
        });

        Button createList = findViewById(R.id.createListBtn);
        createList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CreateList dialog = new CreateList();
                dialog.show(getSupportFragmentManager(), "CreateList");
            }
        });
    }
}
