import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { BingoBoard } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  itemRef: AngularFireObject<any>;
  private loginSubject: Subject<boolean>;

  constructor(
    private readonly db: AngularFireDatabase,
  ) {
    this.itemRef = this.db.object('Top100Lists');
    this.loginSubject = new Subject<boolean>();
  }

  public async getUserTips(category: string): Promise<any> {
    const currentUser = await this.getCurrentUser()

    return new Promise((resolve, reject) => {
      if(!category || !currentUser) {
        reject();
        return
      }
      this.itemRef.snapshotChanges().subscribe( action => {
        const payload = action?.payload?.val() || {}
        const categoryList = payload[category] || {}

        resolve(categoryList[currentUser])
      })
    })
  }

  public async getAllTipps(category: string): Promise<Array<BingoBoard>> {
    return new Promise((resolve, reject) => {
      if(!category) {
        reject();
        return
      }
      this.itemRef.snapshotChanges().subscribe( action => {

        const payload = action?.payload?.val() || {}
        const categoryList: Record<string, Record<string, string>> = payload[category] || {}

        const allBoards: Array<BingoBoard> = []
        for (const [player, playerSelection] of Object.entries(categoryList)) {
          const table: Record<string, string> = {}
          for (const [key, songLine] of Object.entries(playerSelection)) {
            table[key] = songLine
          }
          allBoards.push({
            player,
            table,
            joker: playerSelection.joker
          })
        }

        resolve(allBoards)
      })
    })
  }

  public async setUserTip(category: string, userTip: Record<string, string>): Promise<any> {
    const userName = await this.getCurrentUser()
    const categoryReference = this.db.object(`Top100Lists/${category}/${userName}`)
    return categoryReference.update( userTip );
  }

  public async setUserJoker(category: string, field: string): Promise<any> {
    const userName = await this.getCurrentUser()
    const categoryReference = this.db.object(`Top100Lists/${category}/${userName}`)
    return categoryReference.update( {'joker': field} );
  }

  public async unsetJoker(category: string): Promise<any> {
    const userName = await this.getCurrentUser()
    const categoryReference = this.db.object(`Top100Lists/${category}/${userName}/joker`)
    categoryReference.remove()
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
