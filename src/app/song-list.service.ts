import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './categories';
import { Board, BoardLineItem } from './previous-lists/lists';

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  // private url: string = 'http://localhost:3000/categories';
  private url: string = 'https://sommer-sonntage.vercel.app/categories';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  bulkSearchSong(category: string, batch: BoardLineItem[]): Promise<BoardLineItem[]> {
    const encodedBatch: BoardLineItem[] = batch.map((item) => ({
      ...item,
      artist: window.encodeURIComponent(item.artist),
      title: window.encodeURIComponent(item.title)
    }))

    return new Promise((resolve) => {
      this.httpClient
        .post<BoardLineItem[]>(`${this.url}/search/bulk/${category}/`, encodedBatch)
        .subscribe((item) => resolve(item));
    })
  }

  getSongList(category: string): Promise<BoardLineItem[]> {
    return this.httpClient.get<BoardLineItem[]>(`${this.url}/${category}`).toPromise();
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
