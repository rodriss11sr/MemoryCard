package com.example.mobileapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class GameInfoActivity extends AppCompatActivity {

    private static final String TITLE = "game_title";
    private static final String PLATFORMS = "game_platforms";
    private static final String IMAGE = "game_image";
    private static final String DESC = "game_desc";
    private static final String DATE = "game_date";
    private static final String DEV = "game_dev";
    private static final String GENRES = "game_genres";

    public static void open(Context context, Games game){
        Intent intent = new Intent(context, GameInfoActivity.class);
        intent.putExtra(TITLE, game.getName());
        intent.putExtra(PLATFORMS, game.getPlatforms());
        intent.putExtra(IMAGE, game.getImageResId());
        intent.putExtra(DESC, game.getDescription());
        intent.putExtra(DATE, game.getReleaseDate());
        intent.putExtra(DEV, game.getDeveloper());
        intent.putExtra(GENRES, game.getGenres());
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.game_info_activity);
        new HeaderManager(this);


        TextView gameTitle = findViewById(R.id.GameTitleInfo);
        TextView gamePlatforms = findViewById(R.id.GamePlatformsInfo);
        ImageView gameCover = findViewById(R.id.GameCoverInfo);
        TextView gameDescription = findViewById(R.id.gameDescription);
        TextView gameReleaseDate = findViewById(R.id.gameReleaseDate);
        TextView gameDeveloper = findViewById(R.id.gameDeveloper);
        TextView gameGenre = findViewById(R.id.gameGenre);


        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            String title = extras.getString(TITLE);
            String platforms = extras.getString(PLATFORMS);
            int imageRes = extras.getInt(IMAGE);
            String desc = extras.getString(DESC);
            String date = extras.getString(DATE);
            String dev = extras.getString(DEV);
            String genres = extras.getString(GENRES);


            if (gameTitle != null) gameTitle.setText(title);
            if (gamePlatforms != null) gamePlatforms.setText(platforms);
            if (gameCover != null) gameCover.setImageResource(imageRes);
            if (gameDescription != null) gameDescription.setText(desc);
            if (gameReleaseDate != null) gameReleaseDate.setText(date);
            if(gameDeveloper != null) gameDeveloper.setText(dev);
            if(gameGenre != null) gameGenre.setText(genres);
        }
    }
}
