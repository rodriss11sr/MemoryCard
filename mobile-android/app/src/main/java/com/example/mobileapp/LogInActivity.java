package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.api.ApiAuthService;
import com.example.mobileapp.models.requests.LoginRequest;
import com.example.mobileapp.models.responses.LoginResponse;

public class LogInActivity extends AppCompatActivity {
    private Button registerBtn;
    private Button forgotPasswordBtn;
    private Button logInBtn;
    private EditText emailInput;
    private EditText passwordInput;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.log_in);

        // Inicializar campos de texto
        emailInput = findViewById(R.id.editTextTextEmailAddress);
        passwordInput = findViewById(R.id.editTextTextPassword);

        // Inicializar botones
        registerBtn = findViewById(R.id.registerBtn);
        forgotPasswordBtn = findViewById(R.id.forgotPasswordBtn);
        logInBtn = findViewById(R.id.logInBtn);

        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LogInActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });

        forgotPasswordBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LogInActivity.this, ForgotPasswordActivity.class);
                startActivity(intent);
            }
        });

        logInBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                performLogin();
            }
        });
    }

    private void performLogin() {
        String email = emailInput.getText().toString().trim();
        String password = passwordInput.getText().toString().trim();

        // Validar que los campos no estén vacíos
        if (email.isEmpty()) {
            Toast.makeText(this, "Por favor ingresa tu correo electrónico", Toast.LENGTH_SHORT).show();
            emailInput.requestFocus();
            return;
        }

        if (password.isEmpty()) {
            Toast.makeText(this, "Por favor ingresa tu contraseña", Toast.LENGTH_SHORT).show();
            passwordInput.requestFocus();
            return;
        }

        // Crear request
        LoginRequest loginRequest = new LoginRequest(email, password);

        // Obtener servicio
        ApiAuthService authService = RetrofitClient.getAuthService();
        Call<LoginResponse> call = authService.login(loginRequest);

        // Realizar llamada
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse loginResponse = response.body();

                    if (loginResponse.isOk()) {
                        LoginResponse.User user = loginResponse.getUser();

                        // Guardar datos del usuario en SharedPreferences
                        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
                        SharedPreferences.Editor editor = prefs.edit();
                        editor.putInt("user_id", user.getId());
                        editor.putString("user_nombre", user.getNombre());
                        editor.putString("user_correo", user.getCorreo());
                        editor.putString("user_avatar", user.getAvatar() != null ? user.getAvatar() : "");
                        editor.putBoolean("is_logged_in", true);
                        editor.apply();

                        // Mostrar mensaje de bienvenida
                        Toast.makeText(LogInActivity.this, "¡Bienvenido " + user.getNombre() + "!", Toast.LENGTH_SHORT).show();

                        // Navegar a pantalla principal
                        Intent intent = new Intent(LogInActivity.this, MainScreenActivity.class);
                        startActivity(intent);
                        finish();
                    } else {
                        // Error en la respuesta del servidor
                        Toast.makeText(LogInActivity.this, loginResponse.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                } else {
                    // Error en la respuesta
                    Toast.makeText(LogInActivity.this, "Error: " + response.code() + " - " + response.message(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                // Error de conexión
                Toast.makeText(LogInActivity.this, "Error de conexión: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }


}
