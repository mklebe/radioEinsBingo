import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoBoardComponent } from './bingo-board/bingo-board.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { PlaceTipsComponent } from './place-tips/place-tips.component';
import { PreviousListsComponent } from './previous-lists/previous-lists.component';
import { ResultComponent } from './result/result.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'vorherige', component: PreviousListsComponent },
  { path: 'tippabgabe', component: BingoBoardComponent },
  { path: 'kategorien', component: CategoryListComponent },
  { path: 'kategorien/:name', component: PlaceTipsComponent },
  { path: 'ergebnisse', component: ResultComponent },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
