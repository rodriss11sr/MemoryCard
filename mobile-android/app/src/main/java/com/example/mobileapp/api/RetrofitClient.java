package com.example.mobileapp.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {
    private static Retrofit retrofit = null;
    private static final String BASE_URL = "http://10.0.2.2:3000/";

    public static Retrofit getClient() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }

    //Metodos por servicio
    public static ApiAuthService getAuthService() {
        return getClient().create(ApiAuthService.class);
    }

    public static ApiJuegosService getGamesService() {
        return getClient().create(ApiJuegosService.class);
    }

    public static ApiListasService getListsService() {
        return getClient().create(ApiListasService.class);
    }

    public static ApiPerfilService getProfileService() {
        return getClient().create(ApiPerfilService.class);
    }

    public static ApiReviewsService getReviewsService() {
        return getClient().create(ApiReviewsService.class);
    }

    public static ApiUsuariosService getUsersService() {
        return getClient().create(ApiUsuariosService.class);
    }
}
