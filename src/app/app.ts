import { Component, signal } from '@angular/core';
import { TrackList } from './track-list/track-list';
import { Track } from './models/track';

@Component({
  selector: 'app-root',
  imports: [TrackList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected tracks = signal<Track[]>([
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'Synth-pop', durationSeconds: 200, year: 2019, rating: 9, favorite: true, coverUrl: 'https://picsum.photos/seed/1/300' },
    { id: 2, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", genre: 'Pop', durationSeconds: 167, year: 2022, rating: 8, favorite: false, coverUrl: 'https://picsum.photos/seed/2/300' },
    { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', durationSeconds: 203, year: 2020, rating: 8, favorite: true, coverUrl: 'https://picsum.photos/seed/3/300' },
    { id: 4, title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', album: 'F*CK LOVE 3', genre: 'Pop', durationSeconds: 141, year: 2021, rating: 7, favorite: false, coverUrl: 'https://picsum.photos/seed/4/300' },
    { id: 5, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', genre: 'Pop-punk', durationSeconds: 178, year: 2021, rating: 9, favorite: true, coverUrl: 'https://picsum.photos/seed/5/300' },
    { id: 6, title: 'Montero', artist: 'Lil Nas X', album: 'Montero', genre: 'Pop rap', durationSeconds: 137, year: 2021, rating: 8, favorite: false, coverUrl: 'https://picsum.photos/seed/6/300' },
    { id: 7, title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', genre: 'R&B', durationSeconds: 198, year: 2021, rating: 7, favorite: false, coverUrl: 'https://picsum.photos/seed/7/300' },
    { id: 8, title: 'Kiss Me More', artist: 'Doja Cat', album: 'Planet Her', genre: 'Pop', durationSeconds: 208, year: 2021, rating: 8, favorite: true, coverUrl: 'https://picsum.photos/seed/8/300' },
  ]);
}
