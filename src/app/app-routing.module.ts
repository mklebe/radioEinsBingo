import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoBoardComponent } from './bingo-board/bingo-board.component';
import { PreviousListsComponent } from './previous-lists/previous-lists.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'vorherige', component: PreviousListsComponent },
  { path: 'tippabgabe', component: BingoBoardComponent },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
