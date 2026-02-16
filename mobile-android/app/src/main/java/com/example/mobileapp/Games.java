package com.example.mobileapp;

public class Games {
    private String title;
    private String image;
    private float rating;

    public Games(String title, String image, float rating){
        this.title=title;
        this.image=image;
        this.rating=rating;
    }

    //Getters para los datos de los juegos.
    public String getTitle(){return this.title;}
    public String getImage(){return this.image;}
    public float getRating(){return this.rating;}


}

