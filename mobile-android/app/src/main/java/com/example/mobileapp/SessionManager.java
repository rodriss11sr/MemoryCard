package com.example.mobileapp;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private final SharedPreferences sharedPreferences;
    private final SharedPreferences.Editor editor;
    private static final String PREF_NAME = "user_session";
    private static final String KEY_USER_ID = "user_id";
    private static final String KEY_USER_NOMBRE = "user_nombre";
    private static final String KEY_USER_AVATAR = "user_avatar";
    private static final String KEY_IS_LOGGED_IN = "is_logged_in";

    public SessionManager(Context context) {
        sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
    }

    public void createSession(int userId, String userName, String userAvatar) {
        editor.putInt(KEY_USER_ID, userId);
        editor.putString(KEY_USER_NOMBRE, userName);
        editor.putString(KEY_USER_AVATAR, userAvatar);
        editor.putBoolean(KEY_IS_LOGGED_IN, true);
        editor.apply();
    }

    public void updateUserData(String userName, String userAvatar) {
        editor.putString(KEY_USER_NOMBRE, userName);
        editor.putString(KEY_USER_AVATAR, userAvatar);
        editor.apply();
    }

    public boolean isLoggedIn() {
        return sharedPreferences.getBoolean(KEY_IS_LOGGED_IN, false);
    }

    public int getUserId() {
        return sharedPreferences.getInt(KEY_USER_ID, -1);
    }

    public String getUserNombre() {
        return sharedPreferences.getString(KEY_USER_NOMBRE, "");
    }

    public String getUserAvatar() {
        return sharedPreferences.getString(KEY_USER_AVATAR, null);
    }

    public void logout() {
        editor.clear();
        editor.apply();
    }
}