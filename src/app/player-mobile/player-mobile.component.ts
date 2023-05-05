import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit{
  @Input() name;
  @Input() image = 'avatar-man.png';
  @Input() playerActive: boolean = false;

  constructor() {
    this.name = '';
  }

  ngOnInit(): void {
    
  }
}
