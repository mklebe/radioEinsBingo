import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './categories';

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  private url: string = 'http://localhost:3000/categories';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getSongList(category: string): Promise<any> {
    return this.httpClient.get(`${this.url}/${category}/search`).toPromise();
    // return Promise.resolve({})
  }

  searchSong(category: string, artist: string, song: string): Promise<any> {
    artist = window.encodeURIComponent(artist)
    song = window.encodeURIComponent(song)

    // return this.httpClient.get(`${this.url}/${category}/${artist}/${song}`)
    return Promise.resolve({})
  }
}
