import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;  // Variable wird mit false initialisiertund bindet eine weitere css-Klasse ein.
  currentCard: string | undefined;
  game!: Game;
  gameId: string | undefined;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { this.currentCard = ""; }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    this.firestore.collection('games').add(this.game.toJson()).then(ref => { 
      this.gameId = ref.id;
    });
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      console.log('New card:', this.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      const currentPlayerName = this.game.players[this.game.currentPlayer];
      console.log('Current player:', currentPlayerName);

      setTimeout(() => {
        if (this.currentCard !== undefined) {
          this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;

        if (this.gameId !== undefined) {
          this.firestore.collection('games').doc(this.gameId).update({
            players: this.game.players,
            stack: this.game.stack,
            playedCards: this.game.playedCards,
            currentPlayer: this.game.players[this.game.currentPlayer]
          });
        }
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        if (this.gameId !== undefined) {
          this.firestore.collection('games').doc(this.gameId).update({
            players: this.game.players
          });
        }
      }
    });
  }
}
