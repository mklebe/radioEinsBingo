import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Category, getCurrentCategory } from './categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  public currentCategory: Category = getCurrentCategory()
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  public async logOut() {
    await this.userService.logOut();
    this.router.navigate(['/']);
  }
}
