package com.example.mobileapp;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.widget.ImageView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestBuilder;
import com.bumptech.glide.load.model.GlideUrl;
import com.bumptech.glide.load.model.LazyHeaders;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class ImageUtils {

    
    private static String getBaseUrl() {
        return (BuildConfig.API_BASE_URL != null && !BuildConfig.API_BASE_URL.isEmpty()) ? BuildConfig.API_BASE_URL : "http://10.0.2.2:3000/";
    }
    private static final String USER_AGENT = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

    /** Igual que la web: avatar de BD o DiceBear por nombre si falla o no hay URL. */
    public static void loadUserAvatar(Context context, String avatarUrl, String displayName, ImageView target) {
        String seed = displayName != null && !displayName.trim().isEmpty() ? displayName.trim() : "user";
        try {
            seed = URLEncoder.encode(seed, StandardCharsets.UTF_8.toString());
        } catch (Exception ignored) {
            seed = "user";
        }
        String dicebearUrl = "https://api.dicebear.com/7.x/avataaars/png?seed=" + seed;

        String normalized = normalizeUrl(avatarUrl);
        if (normalized == null) {
            loadImage(context, dicebearUrl, target);
            return;
        }

        GlideUrl glideUrl = new GlideUrl(normalized, new LazyHeaders.Builder()
                .addHeader("User-Agent", USER_AGENT)
                .build());
        // No usar Glide.into() dentro de RequestListener: en Glide 4/5 puede cerrar la app.
        RequestBuilder<Drawable> diceBearFallback = Glide.with(context).load(dicebearUrl);
        Glide.with(context)
                .load(glideUrl)
                .error(diceBearFallback)
                .placeholder(R.drawable.ballxpit)
                .into(target);
    }

    public static String normalizeUrl(String url) {
        if (url == null || url.isEmpty()) return null;
        url = url.trim();
        if (url.startsWith("//")) return "https:" + url;
        if (url.startsWith("http")) return url;
        return getBaseUrl() + url;
    }

    public static void loadImage(Context context, String url, ImageView target) {
        String normalizedUrl = normalizeUrl(url);
        if (normalizedUrl != null) {
            GlideUrl glideUrl = new GlideUrl(normalizedUrl, new LazyHeaders.Builder()
                    .addHeader("User-Agent", USER_AGENT)
                    .build());
            Glide.with(context)
                    .load(glideUrl)
                    .placeholder(R.drawable.ballxpit)
                    .error(R.drawable.ballxpit)
                    .into(target);
        } else {
            target.setImageResource(R.drawable.ballxpit);
        }
    }
}
