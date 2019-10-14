import '../polyfills';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material/core';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { SpirographComponent } from './spirograph/spirograph.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [ AppComponent, SpirographComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
