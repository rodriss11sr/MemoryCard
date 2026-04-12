package com.example.mobileapp;

import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import java.util.HashMap;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddGameFinalActivity extends DialogFragment {

    public static AddGameFinalActivity newInstance(int gameId, String title, String imageUrl, int imageRes) {
        AddGameFinalActivity frag = new AddGameFinalActivity();
        Bundle args = new Bundle();
        args.putInt("gameId", gameId);
        args.putString("title", title);
        args.putString("imageUrl", imageUrl);
        args.putInt("imageRes", imageRes);
        frag.setArguments(args);
        return frag;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.add_game_popup_final, container, false);

        TextView tvtitle = v.findViewById(R.id.tvReviewGameTitle);
        ImageView ivCover = v.findViewById(R.id.ivReviewGameCover);

        int gameId = 0;
        if (getArguments() != null) {
            gameId = getArguments().getInt("gameId", 0);
            tvtitle.setText(getArguments().getString("title"));

            String imageUrl = getArguments().getString("imageUrl", "");
            int imageRes = getArguments().getInt("imageRes", 0);

            if (!imageUrl.isEmpty()) {
                ImageUtils.loadImage(requireContext(), imageUrl, ivCover);
            } else if (imageRes > 0) {
                ivCover.setImageResource(imageRes);
            }
        }

        if (getDialog() != null && getDialog().getWindow() != null) {
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        RatingBar ratingBar = v.findViewById(R.id.reviewRatingBar);
        ratingBar.setOnTouchListener((v1, event) -> {
            if (event.getAction() == MotionEvent.ACTION_UP) {
                float width = ratingBar.getWidth();
                int numStars = ratingBar.getNumStars();
                float starWidth = width / numStars;
                float x = event.getX();
                int tappedStar = (int) (x / starWidth) + 1;

                float currentRating = ratingBar.getRating();

                if (tappedStar == (int) Math.ceil(currentRating) && currentRating > (tappedStar - 1)) {
                    if (currentRating == (float) tappedStar) {
                        ratingBar.setRating(tappedStar - 0.5f);
                    } else {
                        ratingBar.setRating(tappedStar - 1.0f);
                    }
                } else {
                    ratingBar.setRating((float) tappedStar);
                }
                v1.performClick();
                return true;
            }
            return true;
        });
        EditText etReview = v.findViewById(R.id.etReviewText);
        Button btnAdd = v.findViewById(R.id.btnAddFinal);

        final int finalGameId = gameId;
        btnAdd.setOnClickListener(v1 -> {
            String reviewText = etReview.getText().toString();
            float rating = ratingBar.getRating();

            if (finalGameId > 0 && getContext() != null) {
                addGameToLibrary(finalGameId, rating, reviewText);
            } else {
                dismiss();
            }
        });

        return v;
    }

    private void addGameToLibrary(int gameId, float rating, String reviewText) {
        android.content.Context ctx = requireContext().getApplicationContext();
        SharedPreferences prefs = ctx.getSharedPreferences("user_session", 0);
        int userId = prefs.getInt("user_id", -1);

        if (userId == -1) {
            Toast.makeText(ctx, "Inicia sesión primero", Toast.LENGTH_SHORT).show();
            dismiss();
            return;
        }

        Map<String, Object> body = new HashMap<>();
        body.put("id_juego", gameId);
        body.put("estado", "jugando");

        RetrofitClient.getUsersService().addGameToLibrary(userId, body).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful()) {
                    if (rating > 0 || !reviewText.trim().isEmpty()) {
                        saveReview(ctx, userId, gameId, rating, reviewText.trim());
                    } else {
                        Toast.makeText(ctx, "Juego añadido a tu biblioteca", Toast.LENGTH_SHORT).show();
                        dismissSafe();
                    }
                } else {
                    Toast.makeText(ctx, "Error al añadir juego", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void saveReview(android.content.Context ctx, int userId, int gameId, float rating, String reviewText) {
        Map<String, Object> body = new HashMap<>();
        body.put("id_usuario", userId);
        body.put("id_juego", gameId);
        body.put("nota", rating);
        body.put("texto", reviewText);

        RetrofitClient.getReviewsService().createOrUpdateReview(body).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                Toast.makeText(ctx, "Juego y reseña guardados", Toast.LENGTH_SHORT).show();
                dismissSafe();
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(ctx, "Juego añadido, error al guardar reseña", Toast.LENGTH_SHORT).show();
                dismissSafe();
            }
        });
    }

    private void dismissSafe() {
        try {
            if (isAdded()) dismiss();
        } catch (Exception ignored) {}
    }

    @Override
    public void onStart() {
        super.onStart();
        if (getDialog() != null && getDialog().getWindow() != null) {
            android.view.WindowManager.LayoutParams params = getDialog().getWindow().getAttributes();
            float density = getResources().getDisplayMetrics().density;
            params.width = (int) (350 * density);
            params.height = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
            getDialog().getWindow().setAttributes(params);
        }
    }
}
