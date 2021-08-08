import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare global {
  interface Window { updatePastIndicies: Function }
}

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  private url: string = 'https://radio-bingo-backend.herokuapp.com/songlist';
  constructor(
    private readonly httpClient: HttpClient
  ) {
    window.updatePastIndicies = this.updatePastIndicies;
  }

  getSongList(category: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${category}/search`);
  }

  searchSong(category: string, artist: string, song: string): Observable<any> {
    artist = window.encodeURIComponent(artist)
    song = window.encodeURIComponent(song)

    return this.httpClient.get(`${this.url}/${category}/${artist}/${song}`)
  }

  async updateCurrentIndex(): Promise<any> {
    return this.httpClient.get(`${this.url}/Top100Mobility/updateindex`).toPromise()
  }

  async updatePastIndicies(): Promise<any> {
    Promise.all([
      this.httpClient.get(`${this.url}/Top100Family/updateindex`).toPromise(),
      this.httpClient.get(`${this.url}/Top100Numbers/updateindex`).toPromise(),
      this.httpClient.get(`${this.url}/Top100Animals/updateindex`).toPromise(),
      this.httpClient.get(`${this.url}/Top100Drugs/updateindex`).toPromise(),
      this.httpClient.get(`${this.url}/Top100Eighties/updateindex`).toPromise(),
    ]).then(() => console.log('### All indicies updated ###'))
  }
}
