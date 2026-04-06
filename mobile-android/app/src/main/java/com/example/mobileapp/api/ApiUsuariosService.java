package com.example.mobileapp.api;

import com.example.mobileapp.models.responses.AuthResponse;
import com.example.mobileapp.models.responses.ReviewResponse;
import com.example.mobileapp.models.responses.UserGameResponse;
import com.example.mobileapp.models.responses.UserResponse;
import com.example.mobileapp.models.responses.UserSearchResponse;
import java.util.List;
import java.util.Map;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiUsuariosService {

    // GET /api/usuarios/buscar - Buscar usuarios
    @GET("/api/usuarios/buscar")
    Call<UserSearchResponse> searchUsers(
            @Query("q") String query,
            @Query("id_usuario_actual") Integer idUsuarioActual
    );

    // GET /api/usuarios - Obtener todos los usuarios
    @GET("/api/usuarios")
    Call<List<UserResponse>> getAllUsers();

    // GET /api/usuarios/:id - Obtener un usuario por ID
    @GET("/api/usuarios/{id}")
    Call<UserResponse> getUserById(@Path("id") int id);

    // GET /api/usuarios/:id/juegos - Obtener juegos guardados por un usuario
    @GET("/api/usuarios/{id}/juegos")
    Call<List<UserGameResponse>> getUserGames(
            @Path("id") int userId,
            @Query("estado") String estado
    );

    // GET /api/usuarios/:id/wishlist - Obtener wishlist
    @GET("/api/usuarios/{id}/wishlist")
    Call<List<UserGameResponse>> getWishlist(@Path("id") int userId);

    // GET /api/usuarios/:id/resenas - Obtener reseñas de un usuario
    @GET("/api/usuarios/{id}/resenas")
    Call<List<ReviewResponse>> getUserReviews(@Path("id") int userId);

    // GET /api/usuarios/:id/amigos - Obtener amigos (seguidores/seguindo)
    @GET("/api/usuarios/{id}/amigos")
    Call<List<UserSearchResponse.UserSearchItem>> getFriends(
            @Path("id") int userId,
            @Query("tipo") String tipo
    );

    // POST /api/usuarios/:id/juegos - Añadir juego a la biblioteca
    @POST("/api/usuarios/{id}/juegos")
    Call<AuthResponse> addGameToLibrary(@Path("id") int userId, @Body Map<String, Object> gameData);

    // DELETE /api/usuarios/:id/juegos/:idJuego - Eliminar juego de la biblioteca
    @DELETE("/api/usuarios/{id}/juegos/{idJuego}")
    Call<AuthResponse> removeGameFromLibrary(@Path("id") int userId, @Path("idJuego") int gameId);

    // POST /api/usuarios/:id/seguir - Seguir a un usuario
    @POST("/api/usuarios/{id}/seguir")
    Call<AuthResponse> followUser(@Path("id") int myUserId, @Body Map<String, Integer> followData);

    // DELETE /api/usuarios/:id/seguir/:idSeguido - Dejar de seguir a un usuario
    @DELETE("/api/usuarios/{id}/seguir/{idSeguido}")
    Call<AuthResponse> unfollowUser(@Path("id") int myUserId, @Path("idSeguido") int idSeguido);
}
