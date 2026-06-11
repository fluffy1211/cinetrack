import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-track-detail',
  imports: [RouterLink],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail {
  private trackService = inject(TrackService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private id = Number(this.route.snapshot.paramMap.get('id'));
  track = toSignal(this.trackService.getTrack(this.id));

  protected delete() {
    this.trackService.remove(this.id).subscribe(() => {
      this.router.navigate(['/tracks']);
    });
  }
}
