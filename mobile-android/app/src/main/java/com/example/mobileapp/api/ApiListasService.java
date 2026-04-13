package com.example.mobileapp.api;

import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.ListDetailResponse;
import com.example.mobileapp.models.responses.ListSummaryResponse;
import com.example.mobileapp.models.responses.UserListResponse;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface ApiListasService {

    // GET /api/listas - Obtener todas las listas públicas
    @GET("/api/listas")
    Call<List<ListSummaryResponse>> getAllLists();

    // GET /api/listas/:id - Obtener una lista por ID
    @GET("/api/listas/{id}")
    Call<ListDetailResponse> getListById(@Path("id") int id);

    // POST /api/listas - Crear una nueva lista
    @POST("/api/listas")
    Call<AuthResponse> createList(@Body Map<String, Object> listData);

    // POST /api/listas/:id/juegos - Agregar un juego a una lista
    @POST("/api/listas/{id}/juegos")
    Call<AuthResponse> addGameToList(@Path("id") int listId, @Body Map<String, Object> gameData);

    // DELETE /api/listas/:id - Eliminar una lista
    @DELETE("/api/listas/{id}")
    Call<AuthResponse> deleteList(@Path("id") int listId);

    // PUT /api/listas/:id - Actualizar una lista
    @PUT("/api/listas/{id}")
    Call<AuthResponse> updateList(@Path("id") int listId, @Body Map<String, Object> data);

    // DELETE /api/listas/:id/juegos/:id_juego - Eliminar un juego de una lista
    @DELETE("/api/listas/{id}/juegos/{id_juego}")
    Call<AuthResponse> removeGameFromList(@Path("id") int listId, @Path("id_juego") int gameId);

    // GET /api/listas/usuario/:id - Obtener listas de un usuario
    @GET("/api/listas/usuario/{id}")
    Call<List<UserListResponse>> getUserLists(@Path("id") int userId);
}
