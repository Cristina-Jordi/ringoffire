import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId: string | undefined;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newGame(); // Erstellt ein neues Spiel
    this.route.params.subscribe((params) => {  // Wir holen die Parameter aus der URL
      console.log('Die ID ist:', params['id']);  // Loggt die ID des Docs aus
      this.gameId = params['id'];

      this.firestore.collection('games').doc<Game>(this.gameId).valueChanges().subscribe((game: any) => {
        console.log('Game update', game);
        this.game = game ?? {} as Game;
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.player_avatar = game.player_avatar;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {

      if (this.noPlayerAlert()) {
        return;
      }

      if (this.stackEmptyAlert()) {
        return;
      }

      this.game.pickCardAnimation = true
      this.game.currentCard = this.game.stack.pop();
      console.log('New card:', this.game.currentCard);
      console.log('Game is', this.game)

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
      const currentPlayerName = this.game.players[this.game.currentPlayer];
      console.log('Current player:', currentPlayerName)

      setTimeout(() => {
        if (this.game.currentCard !== undefined) {
          this.game.playedCards.push(this.game.currentCard);
        }
        this.game.pickCardAnimation = false
        if (this.gameId !== undefined) {
          this.firestore.collection('games').doc(this.gameId).update({
            players: this.game.players,
            stack: this.game.stack,
            playedCards: this.game.playedCards,
            currentPlayerName: this.game.players[this.game.currentPlayer]  // Speichert den currentPlayer mit Namen in die DB
          });
        }
        this.saveGame();  // Sobald eine Karte gepusht wird und vom Stapel genommen wird, diese auch wieder angezeigt wird
      }, 1000);
    }
  }

  editPlayerProfile(playerId: number) {
    console.log('Edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe(change => {
      console.log('Received change', change);
      if (change) {
        if (change == 'DELETE') {
          this.game.player_avatar.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          this.game.player_avatar[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  noPlayerAlert(): boolean {
    if (this.game.players.length === 0) {
      alert("Zuerst musst du mindestens einen Spieler erstellen bevor du eine Karte ziehen kannst! Drücke dazu auf das Plus-Icon.");
      return true;
    }
    return false;
  }

  stackEmptyAlert(): boolean {
    if (this.game.stack.length === 0) { // Überprüfung, ob der Stapel leer ist
      const confirmed = confirm("Das Spiel ist zu Ende. Ein neues Spiel muss gestartet werden, um weiterzuspielen!");
      if (confirmed) {
        window.location.href = "index.html"; // Weiterleitung zur Startseite
      }
      return true;
    }
    return false;
  }

  // Dialog-Fenster: Name, welchen wir in das Textfeld eingeben
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_avatar.push('avatar-man.png');
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
    // this.firestore.collection('games').doc<Game>(this.gameId).update(this.game.toJson());  --> fürht zu undefined
    const gameData = {
      currentPlayer: this.game.currentPlayer,
      playedCards: this.game.playedCards,
      players: this.game.players,
      player_avatar: this.game.player_avatar,
      stack: this.game.stack,
      currentCard: this.game.currentCard
    };

    const jsonData = JSON.stringify(gameData);
    this.firestore.collection('games').doc<Game>(this.gameId).update(JSON.parse(jsonData));
  }
}
