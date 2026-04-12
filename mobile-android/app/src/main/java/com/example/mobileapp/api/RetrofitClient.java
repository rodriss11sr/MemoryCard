package com.example.mobileapp.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import com.example.mobileapp.BuildConfig;

public class RetrofitClient {
    private static Retrofit retrofit = null;

    public static Retrofit getClient() {
        if (retrofit == null) {
            String base = (BuildConfig.API_BASE_URL != null && !BuildConfig.API_BASE_URL.isEmpty()) ? BuildConfig.API_BASE_URL : "http://10.0.2.2:3000/";
            retrofit = new Retrofit.Builder()
                    .baseUrl(base)
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

    public static ApiHomeService getHomeService() {
        return getClient().create(ApiHomeService.class);
    }

    public static ApiUsuariosService getUsersService() {
        return getClient().create(ApiUsuariosService.class);
    }
}
