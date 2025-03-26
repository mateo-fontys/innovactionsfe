import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common'; // Keep CommonModule if using *ngFor

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule // Keep this for *ngFor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
