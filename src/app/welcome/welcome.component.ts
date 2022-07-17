import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  username: string = '';
  tempUsername: string = '';
  public isLoggedIn: boolean = false;
  public loginForm: FormGroup;

  constructor(
    private readonly userService: UserService,
  ) {
    this.userService.isLoggedIn()
      .then(() => {
        this.isLoggedIn;
      });
    this.loginForm = new FormGroup({
      username: new FormControl(''),
    });
  }

  async ngOnInit(): Promise<void> {
    this.username = await this.userService.getCurrentUser();
    this.userService.getIsLoginSubject().subscribe(async ( isLoggedIn ) => {
      this.isLoggedIn = isLoggedIn;
      this.username = await this.userService.getCurrentUser();
    })
  }

  public register(): void {
    this.userService.login(this.loginForm.value.username);
    this.username = this.loginForm.value.username;

    this.username = this.tempUsername;
  }
}
