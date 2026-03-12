package com.example.mobileapp;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import androidx.fragment.app.DialogFragment;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class AddGame extends DialogFragment {

    private GameAdapter gameAdapter;
    private List<Game> allGames;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.add_game_popup, container, false);
        if(getDialog() != null && getDialog().getWindow() != null){
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        EditText gameSearch = view.findViewById(R.id.itemNameSearch);
        RecyclerView gameResults = view.findViewById(R.id.itemGameResults);

        allGames = new ArrayList<>();
        allGames.add(new Game("Ball x Pit", "PC / PS5 / Switch", R.drawable.ballxpit));

        return view;
    }
    @Override
    public void onStart() {
        super.onStart();
        if (getDialog() != null && getDialog().getWindow() != null) {
            int width = (int) (getResources().getDisplayMetrics().widthPixels * 0.90);
            int height = ViewGroup.LayoutParams.WRAP_CONTENT;

            getDialog().getWindow().setLayout(width, height);
            getDialog().getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));

        }
    }
}
