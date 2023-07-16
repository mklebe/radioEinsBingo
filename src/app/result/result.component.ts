import { Component, OnInit } from '@angular/core';
import { UserTip } from '../interfaces';
import { BoardLineItem } from '../previous-lists/lists';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SongListService } from '../song-list.service';
import { UserService } from '../user.service';
import { BoardMarker, calculateBingoPoints, MarkedBoardLineItem } from './utils';
import { Subscription } from 'rxjs';
import { Category } from '../categories';

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
export class ResultComponent {
  result: number = 0;
  bingoBoard: Array<MarkedBoardLineItem> = [];
  notification: string = '';
  private navigationSubscription: Subscription;
  private currentCategory: string = '';

  otherPlayersBingoBoards: Array<OtherPlayersBingoBoard> = [];

  billboard: Array<BoardLineItem> = []
  isJokerSet: boolean = false;


  shownOtherUsersBoard: OtherPlayersBingoBoard | null = null;

  markerTypes = BoardMarker

  userTips: UserTip = {
    category: {
      displayName: '',
      imageUrl: '',
      isFinished: false,
      name: '',
      isAiring: false,
      isUpcoming: true,
      isRunning: false,
    } as Category,
    user: '',
    tips: []
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly userService: UserService,
    private readonly songlistApi: SongListService,
  ) {
    this.navigationSubscription = this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        const catName = this.route.snapshot.paramMap.get('name')
        if (!catName) {
          this.router.navigate(['/kategorien', {}]);
          return
        }
        this.currentCategory = catName;
        this.fetchResults();
      }
    })
  }

  async ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  private calculateRegularPoints(board: Array<MarkedBoardLineItem>): number {
    let result = 0;
    board.forEach((mbli) => {
      if (
        mbli.marker === BoardMarker.CORRECT_COLUMN ||
        mbli.marker === BoardMarker.IS_CORRECT_WINNER
      ) {
        result += 3
      }
      if (mbli.marker === BoardMarker.IN_LIST) {
        result += 1
      }
      if(mbli.marker === BoardMarker.IS_CORRECT_WINNER) {
        result += 10;
      }
    })

    return result;
  }

  private calculatePlayerScore(board: Array<MarkedBoardLineItem>): number {
    let result = 0;
    result += this.calculateRegularPoints(board)
    result += calculateBingoPoints(board);
    return result
  }

  private updateResult() {
    this.result = this.calculatePlayerScore(this.bingoBoard)
    this.isJokerSet = this.bingoBoard.filter( i => i.marker === BoardMarker.IS_JOKER).length > 0
  }

  private convertStringToMarkedBoardLineItem(entry: string): MarkedBoardLineItem {
    const line = entry.replace('–', '-')
    const titleDivider = new RegExp(/ – | - /);
    const artist: string = line.split(titleDivider)[0]
    const song: string = line.split(titleDivider)[1];

    return {
      artist,
      title: song,
      marker: BoardMarker.NOT_LISTED,
      placement: 0,
    }
  }

  async setJoker(item: MarkedBoardLineItem) {
    if( item.marker === BoardMarker.IS_JOKER ) {
      item.marker = BoardMarker.NOT_LISTED
      await this.userService.unsetJoker(this.currentCategory)
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

    await this.userService.setUserJoker(this.currentCategory, item.boardPosition || '')
    this.updateResult()
  }

  private setBingoBoardValues(value: any): Array<MarkedBoardLineItem> {
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
    return result;
  }

  private setPlacementForMarkedBoardLineItem(inputMbli: MarkedBoardLineItem, foundItem: BoardLineItem): MarkedBoardLineItem {
    const outputMbli = {...inputMbli}
    if(foundItem.placement === 0) {
      outputMbli.marker = BoardMarker.NOT_LISTED
      return outputMbli
    }

    const placementDelta = outputMbli.placement - foundItem.placement
    const isPlacedInRightColumn = placementDelta >= 0 && placementDelta < 20
    if (isPlacedInRightColumn) {
      outputMbli.marker = BoardMarker.CORRECT_COLUMN
    } else {
      outputMbli.marker = BoardMarker.IN_LIST
    }
    outputMbli.placement = foundItem.placement
    if( outputMbli.boardPosition === "5_1" && foundItem.placement === 1) {
      console.log(outputMbli)
      outputMbli.marker = BoardMarker.IS_CORRECT_WINNER
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
        if(!!bli.artist || !!bli.title) {
          this.songlistApi.searchSong(this.currentCategory, bli.artist, bli.title).then((result: BoardLineItem) => {
            console.log(result);
            resolve(
              this.setPlacementForMarkedBoardLineItem(bli, result)
            )
          })
        } else {
          const a: MarkedBoardLineItem = {
            artist: '',
            title: '',
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

  private async fetchResults(): Promise<void> {
    this.songlistApi.getSongList(this.currentCategory).then((data) => {
      this.billboard = data;
      this.billboard = this.billboard.reverse()
    })
    this.userTips.user = await this.userService.getCurrentUser()
    if (this.userTips.user) {
      this.userService.getUserTips(this.currentCategory)
        .then(async (value) => {
          const currentUsersBoard: MarkedBoardLineItem[] = this.setBingoBoardValues(value);
          this.bingoBoard = currentUsersBoard;
          const checksForPlacement: Promise<MarkedBoardLineItem>[] = this.getPlacementForBoard(this.bingoBoard)
          Promise.all(checksForPlacement).then((e) => {
            this.bingoBoard = e
            this.updateResult()
          })
            .catch((e) => {
              this.notification = "Error: Es trat ein Fehler im Abrufen Titel Platzierung auf. Bitte kontaktieren Sie die Administrator."
              window.setInterval(() => {
                this.notification = '';
              }, 5000)
            })
        })

      this.userService.getAllTipps(this.currentCategory)
        .then(async ( allBingoBoards ) => {
          allBingoBoards
            .filter( board => board.player !== this.userTips.user)
            .map((board) => {
              const value = board.table
              console.log( value )
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
              // return result;
              return {
                player: board.player,
                lines: result,
                points: 0,
              }
            }).map((b) => {
              return {
                player: b.player,
                points: 0,
                lines: this.getPlacementForBoard(b.lines),
              }
            }).map(async b => {
              let z = await Promise.all(b.lines).then(a => {
                return {...b, ...{ lines: a }}
              })
              z.points = this.calculatePlayerScore(z.lines)
              this.otherPlayersBingoBoards.push(z)
            })
        })
    }
  }
}
