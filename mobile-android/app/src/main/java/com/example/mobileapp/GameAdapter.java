package com.example.mobileapp;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import java.util.ArrayList;
import java.util.List;

public class GameAdapter extends RecyclerView.Adapter<GameAdapter.ViewHolder> implements Filterable {

    private List<Games> listaOriginal;
    private List<Games> listaFiltrada;
    private OnGameClickListener listener;

    public interface OnGameClickListener {
        void onGameClick(Games game);
    }

    public GameAdapter(List<Games> listaGames) {
        this(listaGames, null);
    }
    public GameAdapter(List<Games> listaGames, OnGameClickListener listener) {
        this.listaOriginal = listaGames;
        this.listener = listener;
        this.listaFiltrada = new ArrayList<>();
        // Inicializamos con los primeros 10 o todos si hay menos
        int limit = Math.min(listaGames.size(), 10);
        for (int i = 0; i < limit; i++) {
            listaFiltrada.add(listaGames.get(i));
        }
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Games game = listaFiltrada.get(position);
        holder.title.setText(game.getName());
        holder.platforms.setText(game.getPlatforms());

        if (game.getImageUrl() != null && !game.getImageUrl().isEmpty()) {
            ImageUtils.loadImage(holder.itemView.getContext(), game.getImageUrl(), holder.cover);
        } else if (game.getImageResId() > 0) {
            holder.cover.setImageResource(game.getImageResId());
        } else {
            holder.cover.setImageResource(R.drawable.game);
        }

        holder.itemView.setOnClickListener(view -> {
            if (listener != null) {
                listener.onGameClick(game);
            } else {
                GameInfoActivity.open(view.getContext(), game);
            }
        });
    }
    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence charSequence) {
                String query = charSequence.toString().toLowerCase();
                List<Games> filtered = new ArrayList<>();
                if (query.isEmpty()) {
                    filtered = listaOriginal;
                } else {
                    for (Games g : listaOriginal) {
                        if (g.getName().toLowerCase().contains(query)){
                            filtered.add(g);
                            if (filtered.size() >= 10) {
                                break;
                            }
                        }
                    }
                }
                FilterResults results = new FilterResults();
                results.values = filtered;
                return results;
            }

            @Override
            protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
                listaFiltrada = (List<Games>) filterResults.values;
                notifyDataSetChanged();
            }
        };
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_game_search, parent, false);
        return new ViewHolder(v);
    }


    public void updateList(List<Games> newList) {
        this.listaOriginal = newList;
        this.listaFiltrada = new ArrayList<>(newList);
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() { return listaFiltrada.size(); }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        TextView platforms;
        ImageView cover;
        
        public ViewHolder(View v) { 
            super(v); 
            title = v.findViewById(R.id.itemGameTitle);
            platforms = v.findViewById(R.id.itemGamePlatforms);
            cover = v.findViewById(R.id.itemGameCover);
        }
    }




}