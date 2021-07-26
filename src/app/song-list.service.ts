import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoardLineItem } from './previous-lists/lists';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  private url: string = 'https://top100-bingo.herokuapp.com/songlist';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getSongList(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  searchSong(category: string, artist: string, song: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${category}/${artist}/${song}`)
  }
}
