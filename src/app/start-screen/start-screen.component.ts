import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  gameId: string | undefined;
  constructor(private firestore: AngularFirestore, private router: Router) { }
  // ngOnInit(): void {

  // }

  newGame() {
    // Start Game
    let game = new Game();
    this.firestore.collection('games').add(game.toJson()).then((ref: any) => {
      this.gameId = ref.id;
      this.router.navigateByUrl('/game/' + ref.id);
      console.log('Die Gameinfo ist:', ref);
    });
 }
}
