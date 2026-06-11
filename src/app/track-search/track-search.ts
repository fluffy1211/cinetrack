// track-search.ts
import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { TrackService } from '../services/track.service';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.html',
  styleUrl: './track-search.css',
})
export class TrackSearch {
  private service = inject(TrackService);
  protected term = signal('');

  protected results = toSignal(
    toObservable(this.term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) => this.service.search(q).pipe(catchError(() => of([] as Track[])))),
    ),
    { initialValue: [] as Track[] },
  );
}
