import { Component, OnInit } from '@angular/core';
import { UserTip } from '../interfaces';
import { BoardLineItem } from '../previous-lists/lists';
import { SongListService } from '../song-list.service';
import { UserService } from '../user.service';
import { BoardMarker, calculateBingoPoints, MarkedBoardLineItem } from './utils';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  result: number = 0;
  bingoBoard: Array<MarkedBoardLineItem> = [];

  billboard: Array<BoardLineItem> = []

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

  async ngOnInit(): Promise<void> {
    this.songlistApi.getSongList('Top100Mobility').subscribe((data) => {
      this.billboard = data;
    })
    this.userTips.user = await this.userService.getCurrentUser()
    if (this.userTips.user) {
      this.userService.getUserTips('Top100Mobility')
        .then(async (value) => {
          const result: MarkedBoardLineItem[] = []
          for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
              result.push(this.convertStringToMarkedBoardLineItem(value[`${j}_${i}`]));
            }
          }

          let runningCount = [
            100, 80, 60, 40, 20,
            100, 80, 60, 40, 20,
            100, 80, 60, 40, 20,
            100, 80, 60, 40, 20,
            100, 80, 60, 40, 20,
          ];
          this.bingoBoard = result;

          const a: Promise<MarkedBoardLineItem>[] = this.bingoBoard.map((bli, index) => {
            bli.placement = runningCount[index];
            return new Promise((resolve, reject) => {
              this.songlistApi.searchSong('Top100Mobility', bli.artist, bli.song).subscribe((result) => {
                if (result.length > 0) {
                  const foundItem = result[0];
                  const a = bli.placement - foundItem.placement
                  if (a >= 0 && a < 20) {
                    bli.marker = BoardMarker.CORRECT_COLUMN
                  } else {
                    bli.marker = BoardMarker.IN_LIST
                  }
                  bli.placement = foundItem.placement
                } else {
                  bli.marker = BoardMarker.NOT_LISTED
                  bli.placement = 0
                }
                resolve(bli)
              })
            })
          })

          Promise.all(a).then(() => this.updateResult())
        })
    }
  }
}
