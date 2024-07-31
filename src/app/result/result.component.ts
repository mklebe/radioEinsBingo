import { Component, OnInit } from '@angular/core';
import { UserTip } from '../interfaces';
import { BoardLineItem } from '../previous-lists/lists';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SongListService } from '../song-list.service';
import { UserService } from '../user.service';
import { BoardMarker, calculateBingoPoints, calculateRegularPoints, convertStringToMarkedBoardLineItem, MarkedBoardLineItem, setPlacementForMarkedBoardLineItem } from './utils';
import { Subscription } from 'rxjs';
import { Category } from '../categories';
import { Title } from '@angular/platform-browser';

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
  currentCategoriesList: BoardLineItem[] = [];
  categoryName: string = '';
  allPlayersScores: Array<OtherPlayersBingoBoard> = [];

  otherPlayersBingoBoards: Array<OtherPlayersBingoBoard> = [];

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
    private readonly titleService: Title,
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
        this.categoryName = catName;
        this.titleService.setTitle(`${catName} Ergebnisse`);
      }
    })
  }

  async ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  private calculatePlayerScore(board: Array<MarkedBoardLineItem>): number {
    let result = 0;
    result += calculateRegularPoints(board)
    result += calculateBingoPoints(board);
    return result
  }

  private updateResult() {
    this.result = this.calculatePlayerScore(this.bingoBoard);
    const [currentPlayer] = this.allPlayersScores.filter((p) => p.player === this.userTips.user)
    if (currentPlayer) {
      currentPlayer.points = this.result;
      currentPlayer.lines = this.bingoBoard;
    } else {
      this.allPlayersScores.push({
        player: this.userTips.user,
        lines: this.bingoBoard,
        points: this.result,
      });
    }

    this.isJokerSet = this.bingoBoard.filter(i => i.marker === BoardMarker.IS_JOKER).length > 0
  }

  async setJoker(item: MarkedBoardLineItem) {
    if (item.marker === BoardMarker.IS_JOKER) {
      item.marker = BoardMarker.NOT_LISTED
      await this.userService.unsetJoker(this.currentCategory)
      this.updateResult()
      return
    } else if (item.marker !== BoardMarker.NOT_LISTED) {
      return
    }

    let joker = this.bingoBoard
      .filter((b) => b.marker === BoardMarker.IS_JOKER)[0]
    if (joker)
      joker.marker = BoardMarker.NOT_LISTED

    if (item.marker === BoardMarker.NOT_LISTED) {
      item.marker = BoardMarker.IS_JOKER
    } else if (item.marker === BoardMarker.IS_JOKER) {
      item.marker = BoardMarker.NOT_LISTED
    }

    await this.userService.setUserJoker(this.currentCategory, item.boardPosition || '')
    this.updateResult()
  }

  private setBingoBoardValues(value: any): Array<MarkedBoardLineItem> {
    const result: MarkedBoardLineItem[] = []
    for (let i = 1; i < 6; i++) {
      for (let j = 1; j < 6; j++) {
        const mbli = convertStringToMarkedBoardLineItem(value[`${j}_${i}`]);
        mbli.boardPosition = `${j}_${i}`;

        if (value.joker == `${j}_${i}`) {
          mbli.marker = BoardMarker.IS_JOKER
        }

        result.push(mbli);
      }
    }
    return result;
  }

  private async getPlacementForBoard(board: Array<MarkedBoardLineItem>): Promise<MarkedBoardLineItem[]> {
    let runningCount = [
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
      100, 80, 60, 40, 20,
    ];

    const searchResultList = await this.songlistApi.bulkSearchSong(this.currentCategory, board);
    // console.log(board, searchResultList);
    return searchResultList.map((searchResult: BoardLineItem, index) => {
      const bli = board[index];
      bli.placement = runningCount[index];
      return setPlacementForMarkedBoardLineItem(bli, searchResult)
    })
  }

  showOtherUsersBoard(board: OtherPlayersBingoBoard): void {
    this.shownOtherUsersBoard = board;
  }

  private async fetchResults(): Promise<void> {
    this.songlistApi.getSongList(this.currentCategory)
      .then((currentList) => {
        this.currentCategoriesList = currentList;
      });
    this.userTips.user = await this.userService.getCurrentUser()
    if (this.userTips.user) {
      this.userService.getUserTips(this.currentCategory)
        .then(async (value) => {
          console.log(value);
          const currentUsersBoard: MarkedBoardLineItem[] = this.setBingoBoardValues(value);
          this.bingoBoard = currentUsersBoard;
          this.getPlacementForBoard(this.bingoBoard).then((e) => {
            console.log(e);
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
        .then(async (allBingoBoards) => {
          allBingoBoards
            .filter(board => board.player !== this.userTips.user)
            .map((board) => {
              const value = board.table
              const result: MarkedBoardLineItem[] = []
              for (let i = 1; i < 6; i++) {
                for (let j = 1; j < 6; j++) {
                  const mbli = convertStringToMarkedBoardLineItem(value[`${j}_${i}`]);
                  mbli.boardPosition = `${j}_${i}`;

                  if (value.joker == `${j}_${i}`) {
                    mbli.marker = BoardMarker.IS_JOKER
                  }

                  result.push(mbli);
                }
              }
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
              let z = await b.lines.then(a => {
                return { ...b, ...{ lines: a } }
              })
              z.points = this.calculatePlayerScore(z.lines)
              this.otherPlayersBingoBoards.push(z)
              this.allPlayersScores.push(z)
              this.allPlayersScores.sort((a, b) => {
                return b.points - a.points
              });
            })
        });
    }
  }
}
