import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }  from '@angular/forms';
import { AppComponent }  from './app.component';
import { LightbulbsListComponent }  from './lightbulbs-list.component';
import { LightbulbService } from './lightbulb.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [ AppComponent, LightbulbsListComponent ],
  providers: [LightbulbService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
