import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name: string;
  @Input() image: string = 'avatar-man.png';  // Bild als standard, wenn nichts eingegeben wird
  @Input() playerActive: boolean = false;

  constructor() {
    this.name = '';
    this.image = '';
  }

  ngOnInit(): void {
    console.log('Name of the player:', this.name);
    console.log('Name of the avatar:', this.image);
  }
}
