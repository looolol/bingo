import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, setDoc, deleteDoc } from '@angular/fire/firestore';
import {Observable, from, of, tap, catchError} from 'rxjs';
import { map } from 'rxjs/operators';
import {Card, Cell} from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BingoService {
  private optionsCollection = collection(this.firestore, 'options'); // Firestore collection for options
  private localCardKey = 'bingoCard'; // Local storage key for bingo card

  constructor(private firestore: Firestore) { }

  // Get all options from Firestore
  getOptions(): Observable<string[]> {
    return from(getDocs(this.optionsCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data()['option'] as string)),
      tap(options => console.log('Fetched options:', options)) // Log fetched options
    );
  }

  // Add a new option to Firestore
  addOption(option: string): Observable<void> {
    const newOptionRef = doc(this.optionsCollection, option); // Use the option value as the document ID
    console.log(`Adding option: ${option}`); // Debugging line
    return from(setDoc(newOptionRef, { option })).pipe(
      map(() => {
        console.log(`Option added: ${option}`); // Debugging line
      })
    );
  }

  // Remove an option from Firestore
  // Remove an option from Firestore
  removeOption(option: string): Observable<void> {
    const optionRef = doc(this.optionsCollection, option);
    console.log(`Removing option: ${option}`); // Debugging line
    return from(deleteDoc(optionRef)).pipe(
      map(() => {
        console.log(`Option removed: ${option}`); // Debugging line
      }),
      catchError(error => {
        console.error('Error removing option:', error);
        throw error;
      })
    );
  }

  // Generate a new bingo card
  getBingoCard(): Observable<Card> {
    return this.getOptions().pipe(
      map(options => this.generateBingoCard(options))
    );
  }

  // Save a bingo card locally
  saveBingoCard(card: Card): void {
    localStorage.setItem(this.localCardKey, JSON.stringify(card));
  }

  // Get the bingo card from local storage
  getLocalBingoCard(): Observable<Card | null> {
    const cardData = localStorage.getItem(this.localCardKey);
    if (cardData) {
      return of(JSON.parse(cardData) as Card);
    } else {
      return of(null); // or an empty card object
    }
  }

  private generateBingoCard(options: string[]): Card {
    const grid: Cell[][] = [];
    const shuffledOptions = this.shuffleArray(options.slice());
    for (let i = 0; i < 5; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({ option: shuffledOptions.pop() || '' });
      }
      grid.push(row);
    }
    return { grid };
  }

  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
