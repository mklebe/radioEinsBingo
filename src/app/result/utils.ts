import { BoardLineItem } from "../previous-lists/lists"

export enum BoardMarker {
  NOT_LISTED,
  IN_LIST,
  CORRECT_COLUMN,
  IS_JOKER,
  IS_CORRECT_WINNER,
}

export interface MarkedBoardLineItem extends BoardLineItem {
  marker: BoardMarker
}

export function calculateRegularPoints(board: Array<MarkedBoardLineItem>): number {
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
    if (mbli.marker === BoardMarker.IS_CORRECT_WINNER) {
      result += 10;
    }
  })

  return result;
}

export function calculateBingoPoints(bingoBoard: MarkedBoardLineItem[]): number {
  const bb: Array<Array<number>> = new Array(5)
  bb[0] = new Array(5)
  bb[1] = new Array(5)
  bb[2] = new Array(5)
  bb[3] = new Array(5)
  bb[4] = new Array(5)
  let result = 0;

  let start = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      bb[i][j] = bingoBoard[start++].marker !== BoardMarker.NOT_LISTED ? 1 : 0
    }
  }

  for (let i = 0; i < 5; i++) {
    if ((bb[i][0] + bb[i][1] + bb[i][2] + bb[i][3] + bb[i][4]) === 5) {
      result += 10
    }

    if ((bb[0][i] + bb[1][i] + bb[2][i] + bb[3][i] + bb[4][i]) === 5) {
      result += 10
    }
  }

  const sumdiagonal = bb[0][0] + bb[1][1] + bb[2][2] + bb[3][3] + bb[4][4]
  if (sumdiagonal === 5) {
    result += 10
  }

  const otherdiagonal = bb[0][4] + bb[1][3] + bb[2][2] + bb[3][1] + bb[4][0]
  if (otherdiagonal === 5) {
    result += 10
  }

  return result;
}