import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  username: string = '';
  tempUsername: string = '';

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || ''
  }

  public register(): void {
    localStorage.setItem('username', this.tempUsername || '');
    this.username = this.tempUsername;
  }

}
