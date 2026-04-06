package com.example.mobileapp;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.responses.AuthResponse;
import java.util.HashMap;
import java.util.Map;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditListDialog extends DialogFragment {

    public interface OnListUpdatedListener {
        void onListUpdated();
    }

    private int listId;
    private String currentName;
    private String currentDescription;
    private OnListUpdatedListener listener;

    public static EditListDialog newInstance(int listId, String name, String description) {
        EditListDialog dialog = new EditListDialog();
        Bundle args = new Bundle();
        args.putInt("list_id", listId);
        args.putString("name", name);
        args.putString("description", description);
        dialog.setArguments(args);
        return dialog;
    }

    public void setOnListUpdatedListener(OnListUpdatedListener listener) {
        this.listener = listener;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.edit_list_popup, container, false);
        if (getDialog() != null && getDialog().getWindow() != null) {
            getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        if (getArguments() != null) {
            listId = getArguments().getInt("list_id");
            currentName = getArguments().getString("name", "");
            currentDescription = getArguments().getString("description", "");
        }

        EditText etNombre = view.findViewById(R.id.etEditNombre);
        EditText etDescripcion = view.findViewById(R.id.etEditDescripcion);
        Button btnSave = view.findViewById(R.id.btnSaveEdit);

        etNombre.setText(currentName);
        etDescripcion.setText(currentDescription);

        btnSave.setOnClickListener(v -> {
            String nombre = etNombre.getText().toString().trim();
            if (nombre.isEmpty()) {
                Toast.makeText(getContext(), "El nombre es obligatorio", Toast.LENGTH_SHORT).show();
                return;
            }

            Map<String, Object> body = new HashMap<>();
            body.put("nombre", nombre);
            body.put("descripcion", etDescripcion.getText().toString().trim());

            RetrofitClient.getListsService().updateList(listId, body).enqueue(new Callback<AuthResponse>() {
                @Override
                public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                    if (response.isSuccessful() && response.body() != null && response.body().isOk()) {
                        Toast.makeText(getContext(), "Lista actualizada", Toast.LENGTH_SHORT).show();
                        if (listener != null) listener.onListUpdated();
                        dismiss();
                    } else {
                        Toast.makeText(getContext(), "Error al actualizar", Toast.LENGTH_SHORT).show();
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
