package com.example.mobileapp;

import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class InsideListGamesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.inside_list_games_activity);
        new HeaderManager(this);

        TextView listName = findViewById(R.id.listName);
        
        String nombreLista = getIntent().getStringExtra("LIST_NAME");
        if (nombreLista != null) {
            listName.setText(nombreLista);
        }

        if ("Peak Games".equalsIgnoreCase(nombreLista)) {
            setupPeakGames();
        }
    }
    private void setupPeakGames() {
        findViewById(R.id.game_mhwilds).setVisibility(android.view.View.VISIBLE);
        findViewById(R.id.game_mhworld).setVisibility(android.view.View.VISIBLE);
        findViewById(R.id.game_ror2).setVisibility(android.view.View.VISIBLE);
        findViewById(R.id.game_yakuzapirate).setVisibility(android.view.View.VISIBLE);
    }
}
