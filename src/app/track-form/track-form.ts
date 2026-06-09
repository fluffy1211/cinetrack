// track-form.ts
import { Component, signal, output } from '@angular/core';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css'
})
export class TrackForm {
  protected model = signal({ title: '', artist: '', rating: 5 });

  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0);
    max(path.rating, 10);
  });

  trackSubmitted = output<Track>();

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.trackForm().valid()) {
      const data = this.model();
      const newTrack: Track = {
        id: Date.now(),
        title: data.title,
        artist: data.artist,
        rating: data.rating,
        album: '',
        genre: '',
        durationSeconds: 0,
        year: new Date().getFullYear(),
        favorite: false,
        coverUrl: 'https://picsum.photos/seed/' + Date.now() + '/300'
      };
      this.trackSubmitted.emit(newTrack);
      this.model.set({ title: '', artist: '', rating: 5 });
    }
  }
}
