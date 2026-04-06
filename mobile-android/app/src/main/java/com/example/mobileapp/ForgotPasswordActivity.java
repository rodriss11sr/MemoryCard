package com.example.mobileapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mobileapp.api.ApiAuthService;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.requests.ForgotPasswordRequest;
import com.example.mobileapp.models.responses.AuthResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ForgotPasswordActivity extends AppCompatActivity {
    private Button registerBtn;
    private Button recoverPasswordBtn;
    private EditText emailInput;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.forgot_password);

        emailInput = findViewById(R.id.editTextTextEmailAddress);
        registerBtn = findViewById(R.id.registerBtn);
        recoverPasswordBtn = findViewById(R.id.recoverPasswordBtn);

        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ForgotPasswordActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });

        recoverPasswordBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                performForgotPassword();
            }
        });
    }

    private void performForgotPassword() {
        String email = emailInput.getText().toString().trim();

        if (email.isEmpty()) {
            Toast.makeText(this, "Por favor, ingresa tu correo electrónico", Toast.LENGTH_SHORT).show();
            return;
        }

        ForgotPasswordRequest request = new ForgotPasswordRequest(email);
        ApiAuthService authService = RetrofitClient.getAuthService();
        Call<AuthResponse> call = authService.forgotPassword(request);

        call.enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    AuthResponse authResponse = response.body();
                    if (authResponse.isOk()) {
                        Toast.makeText(ForgotPasswordActivity.this, authResponse.getMessage(), Toast.LENGTH_LONG).show();
                        // Opcionalmente volver al login tras éxito
                        finish();
                    } else {
                        Toast.makeText(ForgotPasswordActivity.this, authResponse.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(ForgotPasswordActivity.this, "Error: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(ForgotPasswordActivity.this, "Error de conexión: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
