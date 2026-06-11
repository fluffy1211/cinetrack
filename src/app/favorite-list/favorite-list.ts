import { Component, inject, signal } from '@angular/core';
import { Track } from '../models/track';
import { FavoriteService } from '../services/favorite.service';
import { TrackCard } from '../track-card/track-card';

@Component({
  selector: 'app-favorite-list',
  imports: [TrackCard],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.css',
})
export class FavoriteList {
  private favoriteService = inject(FavoriteService);
  protected favorites = signal<Track[]>([]);

  constructor() {
    this.favoriteService.getFavorites().subscribe({
      next: tracks => this.favorites.set(tracks),
      error: err => console.error('Failed to load favorites', err),
    });
  }

  protected onFavoriteToggle(track: Track) {
    this.favoriteService.removeFavorite(track.id).subscribe({
      next: () => this.favorites.update(list => list.filter(t => t.id !== track.id)),
      error: err => console.error('Failed to remove favorite', err),
    });
  }
}
