import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  private url: string = 'https://radio-bingo-backend.herokuapp.com/songlist';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getSongList(category: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${category}/search`);
  }

  searchSong(category: string, artist: string, song: string): Observable<any> {
    artist = window.encodeURIComponent(artist)
    song = window.encodeURIComponent(song)

    return this.httpClient.get(`${this.url}/${category}/${artist}/${song}`)
  }

  async updateIndex(name: string): Promise<any> {
    return this.httpClient.get(`${this.url}/${name}/updateindex`).toPromise()
  }
}
