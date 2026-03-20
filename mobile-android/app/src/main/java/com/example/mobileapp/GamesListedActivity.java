package com.example.mobileapp;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class GamesListedActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.games_listed_activity);
        new HeaderManager(this);

        String busqueda = getIntent().getStringExtra("SEARCH_QUERY");


        View accordionView = findViewById(R.id.accordion_games_profile);
        TextView accordionTitle = findViewById(R.id.accordion_title);
        ImageView arrowIcon = accordionView.findViewById(R.id.arrow_icon);
        LinearLayout expandableContent = accordionView.findViewById(R.id.expandable_content);
        Button releaseDateAccordionGamesProfile = findViewById(R.id.releaseDateAccordionGamesProfile);
        Button nameAccordionGamesProfile = findViewById(R.id.nameAccordionGamesProfile);
        Button ratingAccordionGamesProfile = findViewById(R.id.ratingAccordionGamesProfile);
        Button latestAddedAccordionGamesProfile = findViewById(R.id.LatestAddedAccordionGamesProfile);

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

    }
}
