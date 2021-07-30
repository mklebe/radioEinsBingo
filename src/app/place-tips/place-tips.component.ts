import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class PlaceTipsComponent implements OnInit {

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
  }

  async ngOnInit(): Promise<void> {
    const catName = this.route.snapshot.paramMap.get('name')
    if( !catName ) {
      this.router.navigate(['/kategorien', {}]);
      return
    }

    this.userTips.user = await this.userService.getCurrentUser()
    this.userTips.category = categories.filter(cat => cat.name === catName)[0];
    this.userService.getUserTips( catName )
      .then( value => {
        if( value['1_1'] ) {
          this.bingoBoard.setValue(value)
        }
      });
  }

  submitForm() {
    this.userService.setUserTip( this.userTips.category.name, this.bingoBoard.value )
      .then(() => {
        this.notification = "Liste ist gespeichert!"

        window.setTimeout(() => {
          this.notification = '';
        }, 3000)
      })
  }

}
