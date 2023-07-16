import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './categories';
import { BoardLineItem } from './previous-lists/lists';

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  private url: string = 'https://sommer-sonntage.vercel.app/categories';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getSongList(category: string): Promise<any> {
    return this.httpClient.get(`${this.url}/${category}/search`).toPromise();
    // return Promise.resolve({})
  }

  searchSong(category: string, artist: string, song: string): Promise<BoardLineItem> {
    artist = window.encodeURIComponent(artist)
    song = window.encodeURIComponent(song)

    return new Promise((resolve) => {
      this.httpClient.post<BoardLineItem>(`${this.url}/search/${category}`, {
        artist,
        title: song,
      }).subscribe((item) => resolve(item));
    })
  }
}
