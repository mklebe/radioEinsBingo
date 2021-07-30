import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

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

  public getUserTips(category: string): Promise<any> {
    const currentUser = localStorage.getItem('username')

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

  public async setUserTip(category: string, userTip: Record<string, string>): Promise<any> {
    const userName = await this.getCurrentUser()
    const categoryReference = this.db.object(`Top100Lists/${category}/${userName}`)
    categoryReference.update( userTip );
  }

  public getCurrentUser(): Promise<string> {
    return Promise.resolve( localStorage.getItem('username') || '' )
  }
}
