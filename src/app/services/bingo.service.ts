import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, setDoc, deleteDoc } from '@angular/fire/firestore';
import {Observable, from, of, tap, catchError, switchMap, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import {Card, Cell} from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BingoService {
  private optionsCollection = collection(this.firestore, 'options'); // Firestore collection for options
  private localCardKey = 'bingoCard'; // Local storage key for bingo card
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private firestore: Firestore) { }

  // Get all options from Firestore
  getOptions(): Observable<string[]> {
    this.loadingSubject.next(true);
    return from(getDocs(this.optionsCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data()['option'] as string)),
      tap(options => {
        console.log('Fetched options:', options); // Log fetched options
        this.loadingSubject.next(false); // Set loading to false
      }),
      catchError(error => {
        console.error('Error fetching options:', error);
        this.loadingSubject.next(false); // Set loading to false on error
        return of([]); // Return an empty array on error
      })
    );
  }

  // Add a new option to Firestore
  addOption(option: string): Observable<void> {
    this.loadingSubject.next(true);
    const newOptionRef = doc(this.optionsCollection, option); // Use the option value as the document ID
    console.log(`Adding option: ${option}`); // Debugging line
    return from(setDoc(newOptionRef, { option })).pipe(
      tap(() => {
        console.log(`Option added: ${option}`); // Debugging line
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        console.error('Error adding option:', error);
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }

  // Remove an option from Firestore
  // Remove an option from Firestore
  removeOption(option: string): Observable<void> {
    this.loadingSubject.next(true);
    const optionRef = doc(this.optionsCollection, option);
    console.log(`Removing option: ${option}`); // Debugging line
    return from(deleteDoc(optionRef)).pipe(
      tap(() => {
        console.log(`Option removed: ${option}`); // Debugging line
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        console.error('Error removing option:', error);
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }

  // Generate a new bingo card
  getBingoCard(): Observable<Card> {
    return this.getLocalBingoCard().pipe(
      switchMap(localCard => {
        if (localCard) {
          console.log('Loaded cached bingo card:', localCard);
          return of(localCard);
        } else {
          console.log('No card found in cache. Generating new card.');
          return this.generateBingoCard();
        }
      }),
      catchError(error => {
        console.error('Error fetching or generating bingo card:', error);
        throw error;
      })
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

  generateBingoCard(): Observable<Card> {
    return this.getOptions().pipe(
      switchMap(options => {
        const newCard = this.createBingoCard(options);
        this.saveBingoCard(newCard); // Save the new card to local storage
        console.log('Generated and saved new bingo card:', newCard);
        return of(newCard);
      }),
      catchError(error => {
        console.error('Error generating bingo card:', error);
        throw error;
      })
    );
  }

  private createBingoCard(options: string[]): Card {
    const grid: Cell[][] = [];
    const shuffledOptions = this.shuffleArray(options.slice());

    for (let i = 0; i < 5; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {
          row.push({option: 'Free Space', marked: true, clickable: false});
        } else {
          row.push({option: shuffledOptions.pop() || '', marked: false, clickable: true});
        }
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
