package com.example.mobileapp;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;
import androidx.fragment.app.DialogFragment;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.GameResponse;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddGame extends DialogFragment {

    private GameAdapter adapter;
    private final Handler searchHandler = new Handler(Looper.getMainLooper());
    private Runnable searchRunnable;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.add_game_popup, container, false);
        if (getDialog() != null && getDialog().getWindow() != null) {
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        EditText searchInput = view.findViewById(R.id.itemNameSearch);
        RecyclerView recyclerView = view.findViewById(R.id.itemGameResults);

        adapter = new GameAdapter(new ArrayList<>(), game -> {
            dismiss();
            AddGameFinalActivity nextPopup = AddGameFinalActivity.newInstance(
                    game.getId(), game.getName(),
                    game.getImageUrl() != null ? game.getImageUrl() : "",
                    game.getImageResId());
            nextPopup.show(getParentFragmentManager(), "AddFinalPopUp");
        });

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);

        searchInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {}
            @Override
            public void afterTextChanged(Editable s) {
                if (searchRunnable != null) searchHandler.removeCallbacks(searchRunnable);
                String query = s.toString().trim();
                if (query.length() < 2) {
                    adapter.updateList(new ArrayList<>());
                    return;
                }
                searchRunnable = () -> searchGames(query);
                searchHandler.postDelayed(searchRunnable, 400);
            }
        });
        return view;
    }

    private void searchGames(String query) {
        RetrofitClient.getGamesService().searchGames(query).enqueue(new Callback<List<GameResponse>>() {
            @Override
            public void onResponse(Call<List<GameResponse>> call, Response<List<GameResponse>> response) {
                if (response.isSuccessful() && response.body() != null && getContext() != null) {
                    List<Games> gamesList = new ArrayList<>();
                    for (GameResponse g : response.body()) {
                        gamesList.add(new Games(
                                g.getId(), g.getTitulo(),
                                g.getPlataforma() != null ? String.join(" / ", g.getPlataforma()) : "",
                                g.getImagen() != null ? g.getImagen() : "",
                                g.getDescripcion() != null ? g.getDescripcion() : "",
                                g.getFecha() != null ? g.getFecha() : "",
                                g.getDesarrollador() != null ? g.getDesarrollador() : "",
                                g.getGenero() != null ? g.getGenero() : ""
                        ));
                    }
                    adapter.updateList(gamesList);
                }
            }

            @Override
            public void onFailure(Call<List<GameResponse>> call, Throwable t) {
                if (getContext() != null) {
                    Toast.makeText(getContext(), "Error buscando juegos", Toast.LENGTH_SHORT).show();
                }
            }
        });
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
