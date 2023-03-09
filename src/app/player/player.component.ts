import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  @Input() name;

  constructor(){
    this.name='';
  }

  ngOnInit(): void {
    console.log('Name of the player:', this.name);
  }
}
