package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.imageview.ShapeableImageView;
import com.google.android.material.navigation.NavigationView;

public class MainScreenActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        DrawerLayout drawerLayout = findViewById(R.id.mainScreen);
        ImageButton slideOutMenu = findViewById(R.id.slide_out_menu);
        NavigationView navigationView = findViewById(R.id.nav_view);
        ShapeableImageView profileBtn = findViewById(R.id.profileBtn);

        slideOutMenu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                drawerLayout.openDrawer(GravityCompat.START);
            }
        });
        profileBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainScreenActivity.this, ProfileActivity.class);
                startActivity(intent);
            }
        });
        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int itemId = item.getItemId();
                if (itemId == R.id.nav_mainPage) {
                    drawerLayout.closeDrawer(GravityCompat.START);
                    return true;
                }
                else if(itemId == R.id.nav_profile){
                    Intent intent = new Intent(MainScreenActivity.this, ProfileActivity.class);
                    startActivity(intent);
                }

                //añadir else-if si se necesitan mas casos

                drawerLayout.closeDrawer(GravityCompat.START);
                return true;
            }
        });
    }
}
