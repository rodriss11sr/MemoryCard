package com.example.mobileapp;

import androidx.fragment.app.DialogFragment;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class SearchPopUp extends DialogFragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState){
        View view = inflater.inflate(R.layout.search_popup, container, false);
        if(getDialog() !=null && getDialog().getWindow() != null){
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        EditText search = view.findViewById(R.id.etNombreJuegoSearch);

        if (search != null) {
            search.setOnEditorActionListener(new TextView.OnEditorActionListener() {
                @Override
                public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                    // Detecta si se presionó la tecla Enter
                    if (actionId == EditorInfo.IME_ACTION_SEARCH ||
                            (event != null && event.getKeyCode() == KeyEvent.KEYCODE_ENTER)) {

                        String query = search.getText().toString().trim();

                        if (!query.isEmpty()) {
                            Intent intent = new Intent(getActivity(), GamesListedActivity.class);
                            intent.putExtra("SEARCH_QUERY", query);
                            startActivity(intent);

                            dismiss();
                            return true;
                        }
                    }
                    return false;
                }
            });
        }

        return view;
    }
    @Override
    public void onStart() {
        super.onStart();
        if (getDialog() != null && getDialog().getWindow() != null) {
            int width = (int)(getResources().getDisplayMetrics().widthPixels * 0.90);
            int height = ViewGroup.LayoutParams.WRAP_CONTENT;

            getDialog().getWindow().setLayout(width, height);
            getDialog().getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));

        }

    }

}
