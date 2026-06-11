import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css'
})
export class TrackForm {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private trackService = inject(TrackService);

  protected editId = this.route.snapshot.paramMap.get('id');
  protected model = signal({ title: '', artist: '', rating: 5 });

  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0);
    max(path.rating, 10);
  });

  constructor() {
    if (this.editId) {
      this.trackService.getTrack(Number(this.editId)).subscribe(track => {
        this.model.set({ title: track.title, artist: track.artist, rating: track.rating });
      });
    }
  }

  protected save(event: Event) {
    event.preventDefault();
    if (!this.trackForm().valid()) return;
    const { title, artist, rating } = this.model();
    if (this.editId) {
      this.trackService.update(Number(this.editId), { title, artist, rating }).subscribe(() => {
        this.router.navigate(['/tracks']);
      });
    } else {
      const payload: Omit<Track, 'id'> = {
        title, artist, rating,
        album: '', genre: '', durationSeconds: 0,
        year: new Date().getFullYear(), favorite: false, coverUrl: ''
      };
      this.trackService.create(payload).subscribe(() => {
        this.router.navigate(['/tracks']);
      });
    }
  }
}
