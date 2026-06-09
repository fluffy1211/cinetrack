// track-detail.ts
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail {
  trackId = input.required<number>();
  private service = inject(TrackService);

  protected track = toSignal(
    toObservable(this.trackId).pipe(switchMap((id) => this.service.getTrack(id))),
  );
}
