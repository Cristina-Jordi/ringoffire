import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';  // 30.03.2023 Diese Objekte und Funktionen werden verwendet,
// ...um Daten aus der Firebase Firestore zu lesen und zu schreiben.
import { Observable } from 'rxjs';  // 30.03.2023 Erstellung einer Datenströmung, die von der Firebase Firestore abgerufen wird


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;  // Variable wird mit false initialisiertund bindet eine weitere css-Klasse ein.
  currentCard: string | undefined;

  firestore: Firestore = inject(Firestore);  // 30.03.2023
  items$: Observable<any[]>;  // 30.03.2023 Der Datenstrom, der später von der Firebase Firestore abgerufen wird

  // currentCard: string | undefined = '';
  game: Game = new Game();

  constructor(public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'items')  // Firestore-Sammlung wird mit dem Namen "items" erstellt...
    this.items$ = collectionData(aCollection);  // ...und in der "aCollection"-Variable gespeichert
    // collectionData"-Funktion lädt die Daten aus der Sammlung in den "items$"-Datenstrom

  }

  ngOnInit(): void {
    this.newGame();
    
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      console.log('New card:', this.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        if (this.currentCard) {
          this.game.playedCards.push(this.currentCard);  // Erst wenn die Animation beendet ist, wird die playedCard ins Array gepusht
        }
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}


