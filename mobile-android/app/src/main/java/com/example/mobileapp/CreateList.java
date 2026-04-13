package com.example.mobileapp;

import android.content.SharedPreferences;
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
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import com.bumptech.glide.Glide;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.GameResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CreateList extends DialogFragment {

    public interface OnListCreatedListener {
        void onListCreated();
    }

    private OnListCreatedListener listener;
    private final List<Integer> selectedGameIds = new ArrayList<>();
    private LinearLayout gamesPreviewContainer;
    private final Handler searchHandler = new Handler(Looper.getMainLooper());
    private Runnable searchRunnable;

    public void setOnListCreatedListener(OnListCreatedListener listener) {
        this.listener = listener;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.create_list_popup, container, false);
        if (getDialog() != null && getDialog().getWindow() != null) {
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        EditText etNombre = view.findViewById(R.id.etNombreLista);
        EditText etJuego = view.findViewById(R.id.etNombreJuego);
        Button createBtn = view.findViewById(R.id.createListBtn);
        gamesPreviewContainer = view.findViewById(R.id.gamesPreviewContainer);

        setupGameSearch(etJuego, view);

        createBtn.setOnClickListener(v -> {
            String nombre = etNombre.getText().toString().trim();
            if (nombre.isEmpty()) {
                Toast.makeText(getContext(), "Escribe un nombre para la lista", Toast.LENGTH_SHORT).show();
                return;
            }

            SharedPreferences prefs = requireContext().getSharedPreferences("user_session", 0);
            int userId = prefs.getInt("user_id", -1);

            if (userId == -1) {
                Toast.makeText(getContext(), "Debes iniciar sesión", Toast.LENGTH_SHORT).show();
                return;
            }

            Map<String, Object> body = new HashMap<>();
            body.put("nombre", nombre);
            body.put("id_usuario", userId);
            body.put("publica", true);

            RetrofitClient.getListsService().createList(body).enqueue(new Callback<AuthResponse>() {
                @Override
                public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                    if (response.isSuccessful() && response.body() != null && response.body().isOk()) {
                        Toast.makeText(getContext(), "Lista creada", Toast.LENGTH_SHORT).show();
                        if (listener != null) listener.onListCreated();
                        dismiss();
                    } else {
                        Toast.makeText(getContext(), "Error al crear la lista", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<AuthResponse> call, Throwable t) {
                    Toast.makeText(getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
                }
            });
        });

        return view;
    }

    private void setupGameSearch(EditText etJuego, View rootView) {
        LinearLayout searchDropdown = new LinearLayout(requireContext());
        searchDropdown.setOrientation(LinearLayout.VERTICAL);
        searchDropdown.setBackgroundColor(Color.parseColor("#2D333E"));

        ViewGroup parent = (ViewGroup) etJuego.getParent();
        int idx = parent.indexOfChild(etJuego);
        parent.addView(searchDropdown, idx + 1);

        etJuego.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {}
            @Override
            public void afterTextChanged(Editable s) {
                if (searchRunnable != null) searchHandler.removeCallbacks(searchRunnable);
                String query = s.toString().trim();
                if (query.length() < 2) {
                    searchDropdown.removeAllViews();
                    return;
                }
                searchRunnable = () -> {
                    RetrofitClient.getGamesService().searchGames(query).enqueue(new Callback<List<GameResponse>>() {
                        @Override
                        public void onResponse(Call<List<GameResponse>> call, Response<List<GameResponse>> response) {
                            if (response.isSuccessful() && response.body() != null && getContext() != null) {
                                searchDropdown.removeAllViews();
                                List<GameResponse> results = response.body();
                                int limit = Math.min(results.size(), 5);
                                for (int i = 0; i < limit; i++) {
                                    GameResponse game = results.get(i);
                                    View item = LayoutInflater.from(getContext()).inflate(R.layout.item_search_game, searchDropdown, false);
                                    ImageView img = item.findViewById(R.id.searchGameImage);
                                    android.widget.TextView title = item.findViewById(R.id.searchGameTitle);
                                    Button btnAdd = item.findViewById(R.id.btnAddToList);

                                    title.setText(game.getTitulo());
                                    ImageUtils.loadImage(requireContext(), game.getImagen(), img);

                                    btnAdd.setOnClickListener(v -> {
                                        if (!selectedGameIds.contains(game.getId())) {
                                            selectedGameIds.add(game.getId());
                                            btnAdd.setText("OK");
                                            btnAdd.setEnabled(false);
                                            addGamePreview(game);
                                        }
                                    });

                                    searchDropdown.addView(item);
                                }
                            }
                        }

                        @Override
                        public void onFailure(Call<List<GameResponse>> call, Throwable t) {}
                    });
                };
                searchHandler.postDelayed(searchRunnable, 400);
            }
        });
    }

    private void addGamePreview(GameResponse game) {
        if (gamesPreviewContainer == null || getContext() == null) return;
        if (gamesPreviewContainer.getChildCount() >= 3) return;

        com.google.android.material.imageview.ShapeableImageView iv =
                new com.google.android.material.imageview.ShapeableImageView(requireContext());
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                (int) (80 * getResources().getDisplayMetrics().density),
                (int) (120 * getResources().getDisplayMetrics().density));
        lp.setMargins(4, 0, 4, 0);
        iv.setLayoutParams(lp);
        iv.setScaleType(ImageView.ScaleType.CENTER_CROP);

        ImageUtils.loadImage(requireContext(), game.getImagen(), iv);
        gamesPreviewContainer.addView(iv);
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
