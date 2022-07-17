import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { InternalGuardService } from './InternalGuardService';
import { PlaceTipsComponent } from './place-tips/place-tips.component';
import { PreviousListsComponent } from './previous-lists/previous-lists.component';
import { ResultComponent } from './result/result.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'kategorien', component: CategoryListComponent, canActivate: [InternalGuardService] },
  { path: 'kategorien/:name', component: PlaceTipsComponent, canActivate: [InternalGuardService] },
  { path: 'kategorien/:name/ergebnisse', component: ResultComponent, canActivate: [InternalGuardService] },
  { path: 'ergebnisse', component: ResultComponent, canActivate: [InternalGuardService] },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
