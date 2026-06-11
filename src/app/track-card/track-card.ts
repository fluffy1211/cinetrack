import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';
import { HighlightFavorite } from '../directives/highlight-favorite';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
  imports: [DurationFormatPipe, HighlightFavorite, RouterLink],
})
export class TrackCard {
  track = input.required<Track>();
  active = input(false);
  showFavorite = input(false);
  select = output<Track>();
  favoriteToggle = output<Track>();

  protected onFavoriteClick(event: Event) {
    event.stopPropagation();
    this.favoriteToggle.emit(this.track());
  }
}
