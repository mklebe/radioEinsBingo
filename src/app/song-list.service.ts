import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoardLineItem } from './previous-lists/lists';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  private url: string = `${environment.apiUrl}/categories`;
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
