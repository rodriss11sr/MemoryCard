package com.example.mobileapp;

import android.content.Context;
import android.widget.ImageView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.model.GlideUrl;
import com.bumptech.glide.load.model.LazyHeaders;

public class ImageUtils {

    private static final String BASE_URL = "http://10.0.2.2:3000/";
    private static final String USER_AGENT = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

    public static String normalizeUrl(String url) {
        if (url == null || url.isEmpty()) return null;
        url = url.trim();
        if (url.startsWith("//")) return "https:" + url;
        if (url.startsWith("http")) return url;
        return BASE_URL + url;
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
