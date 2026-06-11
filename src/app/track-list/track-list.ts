import { Component, inject, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TrackCard } from '../track-card/track-card';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { FavoriteService } from '../services/favorite.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-track-list',
  imports: [TrackCard, RouterLink],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
})
export class TrackList {
  private trackService = inject(TrackService);
  private favoriteService = inject(FavoriteService);
  private tracks = signal<Track[]>([]);
  protected selectedId = signal<number | null>(null);
  protected searchTerm = signal('');
  protected auth = inject(AuthService);
  protected featFavorites = environment.featFavorites;

  constructor() {
    this.trackService.getTracks().subscribe(tracks => this.tracks.set(tracks));
  }

  protected filteredTracks = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.tracks();
    return this.tracks().filter(
      t => t.title.toLowerCase().includes(term) || t.artist.toLowerCase().includes(term),
    );
  });

  protected onFavoriteToggle(track: Track) {
    const toggle$: Observable<unknown> = track.favorite
      ? this.favoriteService.removeFavorite(track.id)
      : this.favoriteService.addFavorite(track.id);

    toggle$.subscribe({
      next: () => {
        this.tracks.update(list =>
          list.map(t => (t.id === track.id ? { ...t, favorite: !t.favorite } : t)),
        );
      },
      error: (err: unknown) => console.error('Favorite toggle failed', err),
    });
  }
}
