import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePics = ['avatar-man.png', 'avatar-woman.png', 'boy.png', 'girl.png', 'cat.png', 'doggy.png', 'football.png', 'pinguin.png'];

  constructor(){}

  ngOnInit(): void {
    
  }
}
