import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviousListsComponent } from './previous-lists/previous-lists.component';
import { BingoBoardComponent } from './bingo-board/bingo-board.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SongListService } from './song-list.service';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { PlaceTipsComponent } from './place-tips/place-tips.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    PreviousListsComponent,
    BingoBoardComponent,
    WelcomeComponent,
    CategoryListComponent,
    ResultComponent,
    PlaceTipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    SongListService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
