

export interface Cell {
  option: string;  // The content of the cell
}

export interface Card {
  grid: Cell[][];  // 2D array representing the bingo card
}
