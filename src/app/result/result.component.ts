import { Component, OnInit } from '@angular/core';
import { BingoBoard, UserTip } from '../interfaces';
import { BoardLineItem } from '../previous-lists/lists';
import { SongListService } from '../song-list.service';
import { UserService } from '../user.service';
import { BoardMarker, calculateBingoPoints, MarkedBoardLineItem } from './utils';

const CURRENT_CATEGORY = 'Top100Instrumentals'

interface OtherPlayersBingoBoard {
  player: string;
  lines: Array<MarkedBoardLineItem>;
  points: number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  result: number = 0;
  bingoBoard: Array<MarkedBoardLineItem> = [];
  notification: string = '';

  otherPlayersBingoBoards: Array<OtherPlayersBingoBoard> = [];

  billboard: Array<BoardLineItem> = []
  isJokerSet: boolean = false;

  shownOtherUsersBoard: OtherPlayersBingoBoard | null = null;

  markerTypes = BoardMarker

  userTips: UserTip = {
    category: {
      displayName: '',
      imageUrl: '',
      isClosed: false,
      name: ''
    },
    user: '',
    tips: []
  }

  constructor(
    private readonly userService: UserService,
    private readonly songlistApi: SongListService,
  ) { }

  private updateResult() {
    this.result = 0
    this.bingoBoard.forEach((mbli) => {
      if (mbli.marker === BoardMarker.CORRECT_COLUMN) {
        this.result += 3
      }
      if (mbli.marker === BoardMarker.IN_LIST) {
        this.result += 1
      }
    })
    this.result += calculateBingoPoints(this.bingoBoard);
    this.isJokerSet = this.bingoBoard.filter( i => i.marker === BoardMarker.IS_JOKER).length > 0
  }

  private convertStringToMarkedBoardLineItem(entry: string): MarkedBoardLineItem {
    const line = entry.replace('–', '-')
    const titleDivider = new RegExp(/ – | - /);
    const artist: string = line.split(titleDivider)[0]
    const song: string = line.split(titleDivider)[1];

    return {
      artist,
      song,
      marker: BoardMarker.NOT_LISTED,
      placement: 0,
    }
  }

  async setJoker(item: MarkedBoardLineItem) {
    if( item.marker === BoardMarker.IS_JOKER ) {
      item.marker = BoardMarker.NOT_LISTED
      await this.userService.unsetJoker(CURRENT_CATEGORY)
      this.updateResult()
      return
    } else if( item.marker !== BoardMarker.NOT_LISTED ) {
      return
    }

    let joker = this.bingoBoard
      .filter((b) => b.marker === BoardMarker.IS_JOKER )[0]
    if(joker)
      joker.marker = BoardMarker.NOT_LISTED

    if( item.marker === BoardMarker.NOT_LISTED ) {
      item.marker = BoardMarker.IS_JOKER
    } else if( item.marker === BoardMarker.IS_JOKER ) {
      item.marker = BoardMarker.NOT_LISTED
    }

    await this.userService.setUserJoker(CURRENT_CATEGORY, item.boardPosition || '')
    this.updateResult()
  }

  private setBingoBoardValues(value: any) {
    const result: MarkedBoardLineItem[] = []
    for (let i = 1; i < 6; i++) {
      for (let j = 1; j < 6; j++) {
        const mbli = this.convertStringToMarkedBoardLineItem(value[`${j}_${i}`]);
        mbli.boardPosition = `${j}_${i}`;

        if(value.joker == `${j}_${i}`) {
          mbli.marker = BoardMarker.IS_JOKER
        }

        result.push( mbli );
      }
    }
    this.bingoBoard = result;
  }

  private setPlacementForMarkedBoardLineItem(inputMbli: MarkedBoardLineItem, result: any): MarkedBoardLineItem {
    const outputMbli = {...inputMbli}
    if (result.length > 0) {
      const foundItem = result[0];
      const placementDelta = outputMbli.placement - foundItem.placement
      const isPlacedInRightColumn = placementDelta >= 0 && placementDelta < 20
      if (isPlacedInRightColumn) {
        outputMbli.marker = BoardMarker.CORRECT_COLUMN
      } else {
        outputMbli.marker = BoardMarker.IN_LIST
      }
      outputMbli.placement = foundItem.placement
    } else {
      outputMbli.placement = 0
    }
    return outputMbli;
  }

  private getPlacementForBoard(board: Array<MarkedBoardLineItem>): Promise<MarkedBoardLineItem>[] {
    let runningCount = [
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
    ];

    const result: Promise<MarkedBoardLineItem>[] = board.map((bli, index) => {
      bli.placement = runningCount[index];
      return new Promise((resolve, reject) => {
        if(!!bli.artist || !!bli.song) {
          this.songlistApi.searchSong(CURRENT_CATEGORY, bli.artist, bli.song).subscribe((result) => {
            resolve(
              this.setPlacementForMarkedBoardLineItem(bli, result)
            )
          })
        } else {
          const a: MarkedBoardLineItem = {
            artist: '',
            song: '',
            marker: BoardMarker.NOT_LISTED,
            placement: 0,
          }
          reject(a)
        }
      })
    })

    return result;
  }

  showOtherUsersBoard( board: OtherPlayersBingoBoard ): void {
    this.shownOtherUsersBoard = board;
  }

  async ngOnInit(): Promise<void> {
    this.songlistApi.getSongList(CURRENT_CATEGORY).subscribe((data) => {
      this.billboard = data;
    })
    this.userTips.user = await this.userService.getCurrentUser()
    if (this.userTips.user) {
      this.userService.getUserTips(CURRENT_CATEGORY)
        .then(async (value) => {
          this.setBingoBoardValues(value);
          const checksForPlacement: Promise<MarkedBoardLineItem>[] = this.getPlacementForBoard(this.bingoBoard)
          Promise.all(checksForPlacement).then(() => this.updateResult())
            .catch((e) => {
              this.notification = "Error: Es trat ein Fehler im Abrufen Titel Platzierung auf. Bitte kontaktieren Sie die Administrator."
              window.setInterval(() => {
                this.notification = '';
              }, 5000)
            })
        })

      this.userService.getAllTipps(CURRENT_CATEGORY)
        .then(( allBingoBoards ) => {
          this.otherPlayersBingoBoards = allBingoBoards
          .filter( board => board.player !== this.userTips.user)
          .map((board) => {
            return {
              player: board.player,
              lines: board.table.map( bli => this.convertStringToMarkedBoardLineItem(bli)),
              points: 0,
            }
          });
        })
    }
  }
}
