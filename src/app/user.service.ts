import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { BingoBoard } from './interfaces';
import { HttpClient } from '@angular/common/http';

const API_DOMAIN = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginSubject: Subject<boolean>;

  constructor(
    private readonly http: HttpClient,
  ) {
    this.loginSubject = new Subject<boolean>();
  }

  public async getUserTips(category: string): Promise<any> {
    const currentUser = await this.getCurrentUser()

    return this.http.get<BingoBoard[]>(`${API_DOMAIN}/tips/${category}/${currentUser}`).toPromise();
  }

  public async getAllTipps(category: string): Promise<Array<BingoBoard>> {
    return this.http.get<BingoBoard[]>(`${API_DOMAIN}/tips/${category}`).toPromise();
  }

  public async setUserTip(category: string, userTip: Record<string, string>): Promise<any> {
    const currentUser = await this.getCurrentUser()
    return this.http.post<BingoBoard[]>(`${API_DOMAIN}/tips/${category}/${currentUser}`, {}).toPromise();
  }

  public async setUserJoker(category: string, field: string): Promise<any> {
    const currentUser = await this.getCurrentUser()
    return this.http.post<BingoBoard[]>(`${API_DOMAIN}/tips/${category}/setJoker/${currentUser}`, {}).toPromise();
  }

  public async unsetJoker(category: string): Promise<any> {
    const currentUser = await this.getCurrentUser()
    return this.http.post<BingoBoard[]>(`${API_DOMAIN}/tips/${category}/unsetJoker/${currentUser}`, {}).toPromise();
  }

  public getCurrentUser(): Promise<string> {
    return Promise.resolve( (localStorage.getItem('username') || '').replace(/\s/g, '') )
  }

  public isLoggedIn(): Promise<boolean> {
    const un = localStorage.getItem('username');
    return Promise.resolve( !!un );
  }

  public logOut(): Promise<void> {
    localStorage.removeItem('username');
    this.loginSubject.next(false);
    return Promise.resolve();
  }

  public login( userName: string = '' ): Promise<boolean> {
    localStorage.setItem( 'username', userName );
    this.loginSubject.next(true)
    return Promise.resolve(true)
  }

  public getIsLoginSubject(): Subject<boolean> {
    return this.loginSubject;
  }
}
