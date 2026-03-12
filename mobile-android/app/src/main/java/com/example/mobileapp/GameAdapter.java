package com.example.mobileapp;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class GameAdapter extends RecyclerView.Adapter<GameAdapter.ViewHolder> implements Filterable {

    private List<Games> listaOriginal;
    private List<Games> listaFiltrada;

    public GameAdapter(List<Games> listaGames) {
        this.listaOriginal = listaGames;
        this.listaFiltrada = new ArrayList<>(listaGames);
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
                        if (g.getName().toLowerCase().contains(query)) filtered.add(g);
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

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.title.setText(listaFiltrada.get(position).getName());
    }

    @Override
    public int getItemCount() { return listaFiltrada.size(); }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        public ViewHolder(View v) { super(v); title = v.findViewById(R.id.itemGameTitle); }
    }
}