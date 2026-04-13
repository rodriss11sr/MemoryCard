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
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.GameResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddGameDialog extends DialogFragment {

    public interface OnGameAddedListener {
        void onGameAdded();
    }

    private int listId;
    private OnGameAddedListener listener;
    private LinearLayout resultsContainer;
    private final Handler searchHandler = new Handler(Looper.getMainLooper());
    private Runnable searchRunnable;

    public static AddGameDialog newInstance(int listId) {
        AddGameDialog dialog = new AddGameDialog();
        Bundle args = new Bundle();
        args.putInt("list_id", listId);
        dialog.setArguments(args);
        return dialog;
    }

    public void setOnGameAddedListener(OnGameAddedListener listener) {
        this.listener = listener;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.add_game_to_list_popup, container, false);
        if (getDialog() != null && getDialog().getWindow() != null) {
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        if (getArguments() != null) {
            listId = getArguments().getInt("list_id");
        }

        EditText etSearch = view.findViewById(R.id.etSearchGameForList);
        resultsContainer = view.findViewById(R.id.searchResultsForList);

        etSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {}
            @Override
            public void afterTextChanged(Editable s) {
                if (searchRunnable != null) searchHandler.removeCallbacks(searchRunnable);
                String query = s.toString().trim();
                if (query.length() < 2) {
                    resultsContainer.removeAllViews();
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
                if (response.isSuccessful() && response.body() != null) {
                    displayResults(response.body());
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

    private void displayResults(List<GameResponse> games) {
        if (resultsContainer == null || getContext() == null) return;
        resultsContainer.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(getContext());

        for (GameResponse game : games) {
            View item = inflater.inflate(R.layout.item_search_game, resultsContainer, false);

            ImageView img = item.findViewById(R.id.searchGameImage);
            TextView title = item.findViewById(R.id.searchGameTitle);
            Button btnAdd = item.findViewById(R.id.btnAddToList);

            title.setText(game.getTitulo());
            ImageUtils.loadImage(requireContext(), game.getImagen(), img);

            btnAdd.setOnClickListener(v -> addGameToList(game.getId(), btnAdd));

            resultsContainer.addView(item);
        }
    }

    private void addGameToList(int gameId, Button btn) {
        Map<String, Object> body = new HashMap<>();
        body.put("id_juego", gameId);

        RetrofitClient.getListsService().addGameToList(listId, body).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful() && response.body() != null && response.body().isOk()) {
                    btn.setText("OK");
                    btn.setEnabled(false);
                    if (listener != null) listener.onGameAdded();
                } else {
                    if (getContext() != null) {
                        Toast.makeText(getContext(), "Ya está en la lista", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                if (getContext() != null) {
                    Toast.makeText(getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        if (getDialog() != null && getDialog().getWindow() != null) {
            int width = (int) (getResources().getDisplayMetrics().widthPixels * 0.90);
            getDialog().getWindow().setLayout(width, ViewGroup.LayoutParams.WRAP_CONTENT);
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
    }
}
