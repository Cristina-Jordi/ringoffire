import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePics = ['avatar-woman.png', 'boy.png', 'girl.png', 'cat.png', 'doggy.png', 'football.png', 'pinguin.png'];
  @Input() game: any;
 

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {  }

  ngOnInit(): void {

  }
}
