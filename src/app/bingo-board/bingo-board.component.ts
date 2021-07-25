import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { SongListService } from '../song-list.service';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.sass']
})

export class BingoBoardComponent implements OnInit {

  notification: string ='';
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  bingoBoard: FormGroup;
  isBeforeDeadline: boolean = true;
  usersStartedList: Array<string> = [];
  top100List: Array<any> = [];

  constructor(
    private readonly db: AngularFireDatabase,
    private readonly songlistApi: SongListService,
  ) {
    this.itemRef = db.object('80s')
    this.item = this.itemRef.valueChanges();

    this.bingoBoard = new FormGroup({
      '1_1': new FormControl(''),
      '2_1': new FormControl(''),
      '3_1': new FormControl(''),
      '4_1': new FormControl(''),
      '5_1': new FormControl(''),
      '1_2': new FormControl(''),
      '2_2': new FormControl(''),
      '3_2': new FormControl(''),
      '4_2': new FormControl(''),
      '5_2': new FormControl(''),
      '1_3': new FormControl(''),
      '2_3': new FormControl(''),
      '3_3': new FormControl(''),
      '4_3': new FormControl(''),
      '5_3': new FormControl(''),
      '1_4': new FormControl(''),
      '2_4': new FormControl(''),
      '3_4': new FormControl(''),
      '4_4': new FormControl(''),
      '5_4': new FormControl(''),
      '1_5': new FormControl(''),
      '2_5': new FormControl(''),
      '3_5': new FormControl(''),
      '4_5': new FormControl(''),
      '5_5': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.itemRef.snapshotChanges().subscribe( action => {
      const username = localStorage.getItem('username');
      const userTips = action.payload.val();
      this.usersStartedList = Object.keys(userTips);
      if( username ) {
        this.bingoBoard.setValue(userTips[username])
      }
    })

    this.songlistApi.getSongList().subscribe(( songlist ) => {
      this.top100List = songlist;
    })
  }

  public submitForm() {
    const username = localStorage.getItem('username');
    if(!!username) {
      this.itemRef.update( {
        [username]: this.bingoBoard.value
      }).then((() => {
        this.notification = "Liste ist gespeichert!"

        window.setTimeout(() => {
          this.notification = '';
        }, 2000)
      }))
    }
  }

}
