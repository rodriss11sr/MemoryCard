package com.example.mobileapp.api;

import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.ReviewResponse;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiReviewsService {

    // GET /api/resenas - Obtener todas las reseñas o por id_juego
    @GET("/api/resenas")
    Call<List<ReviewResponse>> getReviews(@Query("id_juego") Integer idJuego);

    // GET /api/resenas/populares - Obtener reseñas populares
    @GET("/api/resenas/populares")
    Call<List<ReviewResponse>> getPopularReviews();

    // GET /api/resenas/:id - Obtener una reseña por ID
    @GET("/api/resenas/{id}")
    Call<ReviewResponse> getReviewById(@Path("id") int id);

    // POST /api/resenas - Crear o actualizar una reseña
    @POST("/api/resenas")
    Call<AuthResponse> createOrUpdateReview(@Body Map<String, Object> reviewData);

    // PUT /api/resenas/:id/like - Dar like
    @PUT("/api/resenas/{id}/like")
    Call<AuthResponse> likeReview(@Path("id") int id);

    // PUT /api/resenas/:id/unlike - Quitar like
    @PUT("/api/resenas/{id}/unlike")
    Call<AuthResponse> unlikeReview(@Path("id") int id);
}
