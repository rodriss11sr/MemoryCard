package com.example.mobileapp;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import androidx.fragment.app.DialogFragment;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class AddGame extends DialogFragment {

    private GameAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.add_game_popup, container, false);
        if(getDialog() != null && getDialog().getWindow() != null){
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        EditText searchInput = view.findViewById(R.id.itemNameSearch);
        RecyclerView recyclerView = view.findViewById(R.id.itemGameResults);

        List<Games> listaGames = new ArrayList<>();
        listaGames.add(new Games(1, "portal (2007)", "PC / PS3 / Xbox360", R.drawable.portal, "", "", "", ""));
        listaGames.add(new Games(2, "portal 2 (2011)", "PC / PS3 / Xbox360", R.drawable.portal2, "", "", "", ""));
        listaGames.add(new Games(3, "Dark Souls 3", "PC / PS4 / XboxOne", R.drawable.ds3, "", "", "", ""));
        listaGames.add(new Games(4, "The Binding of Isaac", "PC / PS4 / XboxOne / Switch", R.drawable.tboi, "", "", "", ""));
        listaGames.add(new Games(5, "Monster Hunter World", "PC / PS4 / XboxOne / Switch", R.drawable.mhworld, "", "", "", ""));
        listaGames.add(new Games(6, "Monster Hunter Wilds", "PC / PS4 / XboxS", R.drawable.mhwilds, "", "", "", ""));

        adapter = new GameAdapter(listaGames, game -> {
            dismiss();
            AddGameFinalActivity nextPopup = AddGameFinalActivity.newInstance(game.getName(), game.getImageResId());
            nextPopup.show(getParentFragmentManager(), "AddFinalPopUp");
        });
        
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);

        searchInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                adapter.getFilter().filter(s);
            }
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void afterTextChanged(Editable s) {}
        });
        return view;
    }

    @Override
    public void onStart() {
        super.onStart();
        if (getDialog() != null && getDialog().getWindow() != null) {
            int width = (int) (getResources().getDisplayMetrics().widthPixels * 0.90);
            int height = ViewGroup.LayoutParams.WRAP_CONTENT;

            getDialog().getWindow().setLayout(width, height);
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

    }
}
