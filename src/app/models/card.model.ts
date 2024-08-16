

export interface Cell {
  option: string;  // The content of the cell
  marked?: boolean;
  clickable: boolean;
}

export interface Card {
  grid: Cell[][];  // 2D array representing the bingo card
}
