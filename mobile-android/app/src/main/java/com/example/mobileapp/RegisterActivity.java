package com.example.mobileapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mobileapp.api.ApiAuthService;
import com.example.mobileapp.api.RetrofitClient;
import com.example.mobileapp.models.requests.RegisterRequest;
import com.example.mobileapp.models.responses.RegisterResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
public class RegisterActivity extends AppCompatActivity {

    private EditText usernameInput;
    private EditText emailInput;
    private EditText passwordInput;
    private EditText confirmPasswordInput;
    private Button createAccountBtn;
    private Button logInButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register);

        // Inicializar campos de texto
        usernameInput = findViewById(R.id.usernameCreateAccount);
        emailInput = findViewById(R.id.emailCreateAccount);
        passwordInput = findViewById(R.id.passwordCreateAccount);
        confirmPasswordInput = findViewById(R.id.confirmPassword);

        // Inicializar botones
        createAccountBtn = findViewById(R.id.createAccountBtn);
        logInButton = findViewById(R.id.logInButton);

        logInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(RegisterActivity.this, LogInActivity.class);
                startActivity(intent);
                finish();
            }
        });

        createAccountBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                performRegister();
            }
        });

    }

    private void performRegister() {
        String nombre = usernameInput.getText().toString().trim();
        String correo = emailInput.getText().toString().trim();
        String password = passwordInput.getText().toString().trim();
        String confirmPassword = confirmPasswordInput.getText().toString().trim();

        // Validaciones
        if (nombre.isEmpty() || correo.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            Toast.makeText(this, "Por favor, rellena todos los campos", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password.equals(confirmPassword)) {
            Toast.makeText(this, "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show();
            return;
        }

        // Crear request
        RegisterRequest registerRequest = new RegisterRequest(correo, password, nombre);

        // Obtener servicio
        ApiAuthService authService = RetrofitClient.getAuthService();
        Call<RegisterResponse> call = authService.register(registerRequest);

        //Realizar llamada
        call.enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(Call<RegisterResponse> call, Response<RegisterResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    RegisterResponse registerResponse = response.body();

                    if (registerResponse.isOk()) {
                        RegisterResponse.User user = registerResponse.getUser();

                        // Guardar datos del usuario en SharedPreferences
                        SharedPreferences prefs = getSharedPreferences("user_session", MODE_PRIVATE);
                        SharedPreferences.Editor editor = prefs.edit();
                        editor.putInt("user_id", user.getId());
                        editor.putString("user_nombre", user.getNombre());
                        editor.putString("user_correo", user.getCorreo());
                        editor.putString("user_avatar", user.getAvatar() != null ? user.getAvatar() : "");
                        editor.putBoolean("is_logged_in", true);
                        editor.apply();

                        Toast.makeText(RegisterActivity.this, "¡Cuenta creada con éxito!", Toast.LENGTH_SHORT).show();

                        // Navegar a pantalla principal
                        Intent intent = new Intent(RegisterActivity.this, MainScreenActivity.class);
                        startActivity(intent);
                        finish();
                    } else {
                        // Error en la respuesta del servidor (ej. usuario ya existe)
                        Toast.makeText(RegisterActivity.this, registerResponse.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                } else {
                    // Error en la respuesta (ej. 400, 500)
                    Toast.makeText(RegisterActivity.this, "Error en el registro: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<RegisterResponse> call, Throwable t) {
                // Error de conexión
                Toast.makeText(RegisterActivity.this, "Error de conexión: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
