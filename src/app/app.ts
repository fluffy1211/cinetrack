import { Component, inject, signal } from '@angular/core';

import { TrackList } from './track-list/track-list';
import { Track } from './models/track';
import { TrackForm } from './track-form/track-form';
import { TrackService } from './services/track.service';
import { TrackDetail } from './track-detail/track-detail';
import { TrackSearch } from './track-search/track-search';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [TrackList, TrackForm, TrackDetail, TrackSearch, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private trackService = inject(TrackService);
  protected tracks = signal<Track[]>([]);

  constructor() {
    this.trackService.getTracks().subscribe(tracks => this.tracks.set(tracks));
  }

  onTrackSubmitted(track: Track) {
    this.tracks.update((tracks) => [...tracks, track]);
  }
}
