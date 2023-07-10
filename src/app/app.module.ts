import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviousListsComponent } from './previous-lists/previous-lists.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SongListService } from './song-list.service';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { PlaceTipsComponent } from './place-tips/place-tips.component';
import { UserService } from './user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InternalGuardService } from './InternalGuardService';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent,
    PreviousListsComponent,
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
    NoopAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    SongListService,
    UserService,
    InternalGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
