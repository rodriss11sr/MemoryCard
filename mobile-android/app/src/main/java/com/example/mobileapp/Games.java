package com.example.mobileapp;

public class Games {
    private String name;
    private String platforms;
    private int imageResId;

    public Games(String name, String platforms, int imageResId){
        this.name=name;
        this.platforms=platforms;
        this.imageResId=imageResId;
    }

    public String getName(){return name;}
    public String getPlatforms(){return platforms;}
    public int getImageResId(){return this.imageResId;}
}

