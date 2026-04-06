package com.example.mobileapp;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

public class AddGameFinalActivity extends DialogFragment {

    public static AddGameFinalActivity newInstance(String title, int imageRes) {
        AddGameFinalActivity frag = new AddGameFinalActivity();
        Bundle args = new Bundle();
        args.putString("title", title);
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

        if(getArguments() != null) {
            tvtitle.setText(getArguments().getString("title"));
            ivCover.setImageResource(getArguments().getInt("imageRes"));
        }
        v.findViewById(R.id.btnAddFinal).setOnClickListener(view -> dismiss());

        if(getDialog() != null && getDialog().getWindow() != null){
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        RatingBar ratingBar = v.findViewById(R.id.reviewRatingBar);
        EditText etReview = v.findViewById(R.id.etReviewText);
        Button btnAdd = v.findViewById(R.id.btnAddFinal);

        btnAdd.setOnClickListener(v1 ->{
            //Almaceno los datos del texto y la puntuacion en variables
            String reviewText = etReview.getText().toString();
            float rating = ratingBar.getRating();

            dismiss();
        });

        return v;
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
