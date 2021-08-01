import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, categories } from '../categories';
import { UserService } from '../user.service';


interface UserTip {
  category: Category,
  user: string,
  tips: Array<[string, string, string, string, string]>
}

@Component({
  selector: 'app-place-tips',
  templateUrl: './place-tips.component.html',
  styleUrls: ['./place-tips.component.sass']
})
export class PlaceTipsComponent implements OnInit, OnDestroy {

  userTips: UserTip = {
    category: {
      displayName: '',
      imageUrl: '',
      isClosed: false,
      name: ''
    },
    user: '',
    tips: []
  }

  notification: string = '';

  bingoBoard: FormGroup;
  isBeforeDeadline: boolean = true

  private navigationSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.bingoBoard = new FormGroup({
      '1_1': new FormControl(''),
      '2_1': new FormControl(''),
      '3_1': new FormControl(''),
      '4_1': new FormControl(''),
      '5_1': new FormControl(''),
      '1_2': new FormControl(''),
      '2_2': new FormControl(''),
      '3_2': new FormControl(''),
      '4_2': new FormControl(''),
      '5_2': new FormControl(''),
      '1_3': new FormControl(''),
      '2_3': new FormControl(''),
      '3_3': new FormControl(''),
      '4_3': new FormControl(''),
      '5_3': new FormControl(''),
      '1_4': new FormControl(''),
      '2_4': new FormControl(''),
      '3_4': new FormControl(''),
      '4_4': new FormControl(''),
      '5_4': new FormControl(''),
      '1_5': new FormControl(''),
      '2_5': new FormControl(''),
      '3_5': new FormControl(''),
      '4_5': new FormControl(''),
      '5_5': new FormControl(''),
    });

    this.navigationSubscription = this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        const catName = this.route.snapshot.paramMap.get('name')
        if (!catName) {
          this.router.navigate(['/kategorien', {}]);
          return
        }

        this.setCurrentTip(catName)
      }
    })
  }

  private async setCurrentTip(catName: string) {
    this.userTips.user = await this.userService.getCurrentUser()
    this.userTips.category = categories.filter(cat => cat.name === catName)[0];
    this.isBeforeDeadline = !this.userTips.category.isClosed
    this.userService.getUserTips(catName)
      .then(value => {
        if (value['1_1']) {
          this.bingoBoard.setValue(value)
        }
      });
  }

  async ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    const catName = this.route.snapshot.paramMap.get('name')
    if (!catName) {
      this.router.navigate(['/kategorien', {}]);
      return
    }

    this.setCurrentTip(catName);
  }

  submitForm() {
    this.userService.setUserTip(this.userTips.category.name, this.bingoBoard.value)
      .then(() => {
        this.notification = "Liste ist gespeichert!"

        window.setTimeout(() => {
          this.notification = '';
        }, 3000)
      })
  }

}
