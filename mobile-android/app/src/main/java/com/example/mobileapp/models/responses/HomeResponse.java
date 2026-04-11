package com.example.mobileapp.models.responses;

import java.util.List;

public class HomeResponse {
    private List<GameResponse> juegos;
    private List<ReviewResponse> reviews;

    public List<GameResponse> getJuegos() { return juegos; }
    public List<ReviewResponse> getReviews() { return reviews; }

    public void setJuegos(List<GameResponse> juegos) { this.juegos = juegos; }
    public void setReviews(List<ReviewResponse> reviews) { this.reviews = reviews; }
}
