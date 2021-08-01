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
  private url: string = 'https://top100-bingo.herokuapp.com/songlist';
  constructor(
    private readonly httpClient: HttpClient
  ) {
    window.updatePastIndicies = this.updatePastIndicies;
  }

  getSongList(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  searchSong(category: string, artist: string, song: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${category}/${artist}/${song}`)
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
