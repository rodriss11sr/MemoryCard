package com.example.mobileapp;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class FriendsProfileActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.friends_profile_activity);
        new HeaderManager(this);
    }
}
