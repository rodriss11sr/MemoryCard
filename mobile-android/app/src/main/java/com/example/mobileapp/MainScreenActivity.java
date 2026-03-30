package com.example.mobileapp;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.List;

public class MainScreenActivity extends AppCompatActivity {
    private List<Games> listaJuegos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        new HeaderManager(this);

        listaProvisional();

        setupClickListeners();
    }

    private void listaProvisional() {
        listaJuegos = new ArrayList<>();
        listaJuegos.add(new Games(1, "Ball X Pit", "PC, PS5, Xbox Series X/S", R.drawable.ballxpit,
                "bola pito", "2024-05-12", "Indie Dev", "RogueLike"));
        listaJuegos.add(new Games(2, "Silent Hill F", "PS5, PC", R.drawable.silenthillf,
                "The latest entry in the Silent Hill series, set in 1960s Japan.", "TBA", "Neobards Entertainment", "Horror"));
        listaJuegos.add(new Games(3, "Hades 2", "PC", R.drawable.hades2,
                "The sequel to the award-winning rogue-like dungeon crawler.", "2024", "Supergiant Games", "Rogue-like, Action"));
        listaJuegos.add(new Games(4, "Like a Dragon: Pirate Yakuza in Hawaii", "PS5, PS4, Xbox, PC", R.drawable.yakuzapirate,
                "Goro Majima takes to the high seas in this pirate-themed spin-off.", "2025-02-21", "Ryu Ga Gotoku Studio", "Action-Adventure"));
    }

    private void setupClickListeners() {
        findViewById(R.id.game_ballxpit).setOnClickListener(v -> openGameInfo(0));
        findViewById(R.id.game_ballxpit2).setOnClickListener(v -> openGameInfo(0));
        findViewById(R.id.game_silentHillF).setOnClickListener(v -> openGameInfo(1));
        findViewById(R.id.game1_hades2).setOnClickListener(v -> openGameInfo(2));
        findViewById(R.id.game1_yakuzapirate).setOnClickListener(v -> openGameInfo(3));
    }

    private void openGameInfo(int index) {
        if (index >= 0 && index < listaJuegos.size()) {
            GameInfoActivity.open(this, listaJuegos.get(index));
        }
    }
}
