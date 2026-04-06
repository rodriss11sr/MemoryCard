package com.example.mobileapp.api;

import retrofit2.Call;
import retrofit2.http.POST;
import retrofit2.http.Body;
import com.example.mobileapp.models.requests.LoginRequest;
import com.example.mobileapp.models.requests.RegisterRequest;
import com.example.mobileapp.models.requests.ForgotPasswordRequest;
import com.example.mobileapp.models.requests.ResetPasswordRequest;
import com.example.mobileapp.models.responses.LoginResponse;
import com.example.mobileapp.models.responses.RegisterResponse;
import com.example.mobileapp.models.responses.AuthResponse;

public interface ApiAuthService {

    // POST /api/auth/login
    @POST("/api/auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);

    // POST /api/auth/register
    @POST("/api/auth/register")
    Call<RegisterResponse> register(@Body RegisterRequest request);

    // POST /api/auth/forgot-password
    @POST("/api/auth/forgot-password")
    Call<AuthResponse> forgotPassword(@Body ForgotPasswordRequest request);

    // POST /api/auth/reset-password
    @POST("/api/auth/reset-password")
    Call<AuthResponse> resetPassword(@Body ResetPasswordRequest request);
}