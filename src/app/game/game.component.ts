import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { this.currentCard = ""; }

  ngOnInit(): void {
    this.newGame(); // Erstellt ein neues Spiel
    this.game.currentPlayer = 0;
    this.route.params.subscribe((params) => {  // Wir holen die Parameter aus der URL
      console.log('Die ID ist:', params['id']);  // Loggt die ID des Docs aus
      this.gameId = params['id'];

      this.firestore.collection('games').doc<Game>(this.gameId).valueChanges().subscribe((game: any) => {
        console.log('Game update', game);
        this.game = game ?? {} as Game;
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
    });
  }

  newGame() {
    this.game = new Game();
    this.game.currentPlayer = 0;
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true
      console.log('New card:', this.currentCard);
      console.log('Game is', this.game)
      this.saveGame();  // Es wird gespeichert, dass eine Karte vom Stapel genommen wird

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
      const currentPlayerName = this.game.players[this.game.currentPlayer];
      console.log('Current player:', currentPlayerName)
      setTimeout(() => {
        if (this.currentCard !== undefined) {
          this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false
        if (this.gameId !== undefined) {
          this.firestore.collection('games').doc(this.gameId).update({
            players: this.game.players,
            stack: this.game.stack,
            playedCards: this.game.playedCards,
            currentPlayer: this.game.players[this.game.currentPlayer]
          });
        }
        this.saveGame();  // Sobald eine Karte gepusht wird, diese auch wieder angezeigt wird
      }, 1000);
    }
  }

  // Name, welchen wir in das Textfeld eingeben
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
        if (this.gameId !== undefined) {
          this.firestore.collection('games').doc(this.gameId).update({
            players: this.game.players
          });
        }
      }
    });
  }

  saveGame() {
    // this.firestore.collection('games').doc<Game>(this.gameId).update(this.game.toJson());
    const gameData = {
      currentPlayer: this.game.currentPlayer,
      playedCards: this.game.playedCards,
      players: this.game.players,
      stack: this.game.stack,
    };

    const jsonData = JSON.stringify(gameData);
    this.firestore.collection('games').doc<Game>(this.gameId).update(JSON.parse(jsonData));
  }
}
