package com.example.mobileapp;

import java.io.Serializable;


public class Games implements Serializable {
    private int id; // ID de la base de datos
    private String name;
    private String platforms;
    private int imageResId;
    private String description;
    private String releaseDate;
    private String developer;
    private String genres;

    public Games(int id, String name, String platforms, int imageResId, String description, String releaseDate, String developer, String genres) {
        this.id = id;
        this.name = name;
        this.platforms = platforms;
        this.imageResId = imageResId;
        this.description = description;
        this.releaseDate = releaseDate;
        this.developer = developer;
        this.genres = genres;
    }

    public int getId() { return id; }
    public String getName(){return name;}
    public String getPlatforms(){return platforms;}
    public int getImageResId(){return this.imageResId;}
    public String getDescription(){return description;}
    public String getReleaseDate(){return releaseDate;}
    public String getDeveloper(){return developer;}
    public String getGenres(){return genres;}
}
