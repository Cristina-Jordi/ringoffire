export class Game {
    public pickCardAnimation = false;  // Variable wird mit false initialisiertund bindet eine weitere css-Klasse ein.
    public currentCard: string | undefined;
    public players: string[] = [];  // public, weil wir in anderen Dateien auch darauf zugreifen wollen
    public stack: string[] = [];   // ungespielte Karten
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public game: any;  // Deklaration der Eigenschaft game


    constructor() {
        this.currentCard = "";
        const suits = ['hearts', 'ace', 'diamonds', 'clubs'];
        for (let i = 1; i <= 13; i++) {
            suits.forEach(suit => {
                this.stack.push(`${suit}_${i}`);
            });
        }
        this.shuffleCards();
        this.game = {}; // Initialisierung der Eigenschaft game
    }

    private shuffleCards() {
        for (let i = this.stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
        }
    }
    // Variablen, welche dem JSON hinzugefügt werden
    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard

        };
    }

    public addPlayer(playerName: string) {
        this.players.push(playerName);
        if (this.currentPlayer === null || this.currentPlayer === undefined) {
            this.currentPlayer = 0; // Setze currentPlayer auf den ersten Spieler, falls es noch keinen gibt
        } else {
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length; // Setze currentPlayer auf den nächsten Spieler
        }
        console.log('Current Player is:', this.players[this.currentPlayer]);
        this.saveGame();
    }

    drawCard() {
        const card = this.game.stack.pop();
        this.game.playedCards.push(card);
        this.game.nextPlayer(); // aktualisiere den currentPlayer
        this.saveGame(); // speichere das aktualisierte Spiel in Firebase
    }

    public nextPlayer() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        this.saveGame(); // speichere das aktualisierte Spiel in Firebase
    }

    private saveGame() {
        // Hier Code zum Speichern des Spiels in Firebase
    }

}