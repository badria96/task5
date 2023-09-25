import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { FormsModule } from '@angular/forms';
import { WeatherCacheService } from 'src/WeatherCacheService';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [WeatherCacheService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
