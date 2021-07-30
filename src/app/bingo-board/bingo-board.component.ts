import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { SongListService } from '../song-list.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.sass']
})

export class BingoBoardComponent implements OnInit {

  notification: string ='';
  isBeforeDeadline: boolean = true;
  usersStartedList: Array<string> = [];
  top100List: Array<any> = [];

  constructor(
    private readonly userService: UserService,
    private readonly songlistApi: SongListService,
  ) {

  }

  ngOnInit(): void {
    this.userService.getUserTips('Top100Eighties').then(( userTips ) => {
      console.log( userTips )
      if( userTips['1_1'] ) {
        // this.bingoBoard.setValue(userTips)
      }
    })

    this.songlistApi.getSongList().subscribe(( songlist ) => {
      this.top100List = songlist;
    })
  }

  public submitForm() {

    // this.userService.setUserTip('Top100Eighties', this.bingoBoard.value)
    //   .then(() => {
    //     this.notification = "Liste ist gespeichert!"

    //     window.setTimeout(() => {
    //       this.notification = '';
    //     }, 3000)
    //   })
  }

}
