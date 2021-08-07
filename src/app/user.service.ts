import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BingoBoard } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  itemRef: AngularFireObject<any>

  constructor(
    private readonly db: AngularFireDatabase,
  ) {
    this.itemRef = this.db.object('Top100Lists')
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
        const categoryList: { string: { string: string } } = payload[category] || {}

        const allBoards: Array<BingoBoard> = []
        for (const [key, value] of Object.entries(categoryList)) {
          const table: Array<string> = []
          for (const [key, songLine] of Object.entries(value)) {
            table.push(songLine)
          }
          allBoards.push({
            player: key,
            table
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
}
