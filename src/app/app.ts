import { Component, inject, signal } from '@angular/core';
import { TrackList } from './track-list/track-list';
import { Track } from './models/track';
import { TrackForm } from './track-form/track-form';
import { TrackDetail } from './track-detail/track-detail';
import { Login } from "./login/login";
import { TrackService } from './services/track.service';

@Component({
  selector: 'app-root',
  imports: [TrackList, TrackForm, Login],
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
