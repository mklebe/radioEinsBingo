import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BoardLineItem } from '../previous-lists/lists';

enum BoardMarker {
  NOT_LISTED,
  IN_LIST,
  CORRECT_COLUMN
}

interface MarkedBoardLineItem extends BoardLineItem {
  marker: BoardMarker
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  result: number = 0;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  bingoBoard: Array<MarkedBoardLineItem> = [];

  markerTypes = BoardMarker

  constructor(
    private readonly db: AngularFireDatabase,
  ) {
    this.itemRef = db.object('80s')
    this.item = this.itemRef.valueChanges();
  }

  private updateResult() {
    this.result = 0
    this.bingoBoard.forEach(( mbli ) => {
      if( mbli.marker === BoardMarker.CORRECT_COLUMN ) {
        this.result += 3
      }
      if( mbli.marker === BoardMarker.IN_LIST ) {
        this.result += 1
      }
    })
    this.addBingo()
  }

  private addBingo() {
    const bb: Array<Array<number>> = new Array(5)
    bb[0] = new Array(5)
    bb[1] = new Array(5)
    bb[2] = new Array(5)
    bb[3] = new Array(5)
    bb[4] = new Array(5)

    let start = 0
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        bb[i][j] = this.bingoBoard[start++].marker !== BoardMarker.NOT_LISTED ? 1 : 0
      }
    }

    for(let i = 0; i < 5; i++) {
      if( (bb[i][0] + bb[i][1] + bb[i][2] + bb[i][3] + bb[i][4]) === 5 ) {
        this.result += 10
      }

      if( (bb[0][i] + bb[1][i] + bb[2][i] + bb[3][i] + bb[4][i]) === 5 ) {
        this.result += 10
      }
    }

    const sumdiagonal = bb[0][0] + bb[1][1] + bb[2][2] + bb[3][3] + bb[4][4]
    if( sumdiagonal === 5 ) [
      this.result += 10
    ]
    const otherdiagonal = bb[0][4] + bb[1][3] + bb[2][2] + bb[3][1] + bb[4][0]
    if( otherdiagonal === 5 ) [
      this.result += 10
    ]
  }

  correctColumn(mbli: MarkedBoardLineItem) {
    mbli.marker = BoardMarker.CORRECT_COLUMN;
    this.updateResult()
  }

  isInList(mbli: MarkedBoardLineItem) {
    mbli.marker = BoardMarker.IN_LIST;
    this.updateResult()
  }

  ngOnInit(): void {
    this.itemRef.snapshotChanges().subscribe( action => {
      const username = localStorage.getItem('username');
      const userTips = action.payload.val();
      let result: Array<MarkedBoardLineItem> = []
      if( username ) {
        for(let i = 1; i < 6; i++) {
          for(let j = 1; j < 6; j++) {
            const entry = userTips[username][`${j}_${i}`]
            const bli: MarkedBoardLineItem = {
              artist: entry.split('-')[0],
              song: entry.split('-')[1],
              marker: BoardMarker.NOT_LISTED,
              placement: 0,
            }
            result.push( bli );
          }
        }
      }
      this.bingoBoard = result;
      console.log(this.bingoBoard.length)
    })
  }

}
