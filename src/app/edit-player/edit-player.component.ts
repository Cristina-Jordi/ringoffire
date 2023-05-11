// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePics = ['avatar-woman.png', 'boy.png', 'girl.png', 'cat.png', 'doggy.png', 'football.png', 'pinguin.png'];
  @Input() game: any;
 

  constructor() { 

  }

  ngOnInit(): void {

  }
}
