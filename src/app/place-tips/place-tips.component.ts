import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, categories } from '../categories';
import { UserTip } from '../interfaces';
import { UserService } from '../user.service';


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
  numberOfSetTips: number = 0;

  bingoBoard: FormGroup;
  isBeforeDeadline: boolean = true;
  motivationsMap: Array<string> = ['']

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
      'joker': new FormControl(''),
    });

    this.bingoBoard.valueChanges.subscribe((object: Object) => {
      let numberOfTouchedField = 0;
      for (const [key, value] of Object.entries(object)) {
        if( value !== '' ) {
          ++numberOfTouchedField;
        }
      }
      this.numberOfSetTips = numberOfTouchedField;
    })

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

  getMotivationText(): string {
    const texts: Array<string> = [
      'Es ist ein wundervoller Tag mit dem Tippen zu beginnen, findest du nicht auch?',
      `Ja, du hast deine erste(n) ${this.numberOfSetTips} abgegeben. Bleib am Ball!`,
      `Sehr gut! Mit den weiter so! Du hast bereits ${this.numberOfSetTips} platziert!`,
      `Du hast bereits ${this.numberOfSetTips} abgegeben, wenn du 25 Tipps abgibst stehen deine Chancen am besten.`,
      'Super, du hast das maximum an Tipps abgegeben! Damit bist du bestimmt ganz vorne mit dabei!',
    ]
    const motivationCohort = this.numberOfSetTips === 0
      ? 0
      : this.numberOfSetTips < 9
        ? 1 : this.numberOfSetTips < 18
          ? 2 : this.numberOfSetTips < 25
            ? 3 : 4

    return texts[motivationCohort]
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

    window.onblur = () => {
      this.saveForm();
    }

    this.setCurrentTip(catName);
  }

  private saveForm(): void {
    this.userService.setUserTip(this.userTips.category.name, this.bingoBoard.value)
      .then(() => {
        this.notification = "Liste ist gespeichert!"

        window.setTimeout(() => {
          this.notification = '';
        }, 3000)
      })
  }

  submitForm() {
    this.saveForm();
  }

}
