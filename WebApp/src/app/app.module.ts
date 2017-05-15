import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }  from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { AppComponent }  from './app.component';
import { LightbulbsListComponent }  from './lightbulbs-list.component';
import { LightbulbService } from './lightbulb.service';
import { LightbulbControllerComponent }  from './lightbulb-controller.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule],
  declarations: [ AppComponent, LightbulbsListComponent, LightbulbControllerComponent ],
  providers: [LightbulbService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
