export class Game {
    public players: string[] = [];  // public, weil wir in anderen Dateien auch darauf zugreifen wollen
    public stack: string[] = [];   // ungespielte Karten
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

     constructor() {
        const suits = ['hearts', 'ace', 'diamonds', 'clubs'];
        for (let i = 1; i <= 13; i++) {
            suits.forEach(suit => {
                this.stack.push(`${suit}_${i}`);
            });
        }
        this.shuffleCards();
    }

    private shuffleCards() {
        for (let i = this.stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
        }
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer

        };
    }

}