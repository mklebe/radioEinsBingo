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

  getSongList(category: string): Promise<any> {
    // return this.httpClient.get(`${this.url}/${category}/search`);
    return Promise.resolve({})
  }

  searchSong(category: string, artist: string, song: string): Promise<any> {
    artist = window.encodeURIComponent(artist)
    song = window.encodeURIComponent(song)

    // return this.httpClient.get(`${this.url}/${category}/${artist}/${song}`)
    return Promise.resolve({})
  }

  async updateIndex(name: string): Promise<any> {
    return this.httpClient.get(`${this.url}/${name}/updateindex`).toPromise()
  }
}
