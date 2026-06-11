import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track } from '../models/track';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/favorites`;

  getFavorites() {
    return this.http.get<Track[]>(this.baseUrl);
  }

  addFavorite(trackId: number) {
    return this.http.post<Track>(`${this.baseUrl}/${trackId}`, {});
  }

  removeFavorite(trackId: number) {
    return this.http.delete<void>(`${this.baseUrl}/${trackId}`);
  }
}
