import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  constructor( 
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  public async logOut() {
    await this.userService.logOut();
    this.router.navigate(['/']);
  }
}
