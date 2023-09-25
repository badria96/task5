import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherCacheService } from 'src/WeatherCacheService';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})

export class WeatherForecastComponent {
  cityName: string = '';
  weatherData: any; 
  isCelsius: boolean = true; // Default to Celsius

  toggleTemperatureUnit() {
    this.isCelsius = !this.isCelsius;
    this.convertTemperature();
  }

  convertTemperature() {
    if (this.weatherData && this.weatherData.main) {
      if (this.isCelsius) {
        this.weatherData.main.temp = this.kelvinToCelsius(this.weatherData.main.temp);
      } else {
        this.weatherData.main.temp = this.kelvinToFahrenheit(this.weatherData.main.temp);
      }
    }
  }

  kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

  kelvinToFahrenheit(kelvin: number): number {
    return (kelvin - 273.15) * 9 / 5 + 32;
  }


  private cache: Map<string, any> = new Map();
  private cacheDurationMs: number = 60000; 

  get(key: string): any {
    const cachedData = this.cache.get(key);
    if (cachedData && Date.now() - cachedData.timestamp <= this.cacheDurationMs) {
      return cachedData.data;
    }
    return null; 
  }

  set(key: string, data: any): void {
    const timestamp = Date.now();
    this.cache.set(key, { data, timestamp });
  }


  constructor(private http: HttpClient, private cacheService: WeatherCacheService) {}

  getWeather() {
    console.log('Fetching weather data...');
    const apiKey = '261b0a3e37d8efb583e5ff536bad2cbe'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${apiKey}`;

    this.http.get(apiUrl).subscribe((data) => {
      console.log('Received data:', data);
      this.weatherData = data;
    },
      (error: HttpErrorResponse) => { // Specify the type here
        console.error('Error:', error);
        // Handle error here, display a user-friendly message to the user
      }
  
    );
  }

  getWeatherIcon(conditionCode: string): string {
    switch (conditionCode) {
      case '01d':
        return 'data:image/jpeg;base64,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';
      case '02d':
      case '03d':
      case '04d':
        return 'data:image/png;base64,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';
      case '09d':
      case '10d':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4A6TOg0djfq1XgoxGjCy0u0PCQSDiuNXtdw&usqp=CAU';
      // Add more mappings for other conditions as needed
      default:
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9q_kQFVkHFZ2pVE9WQoGmHwT2w2iOPg5kQ&usqp=CAU'; // Default icon for unknown conditions
    }
  }
  
  addToFavorites(cityName: string) {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(cityName)) {
      favorites.push(cityName);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  
  removeFromFavorites(cityName: string) {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(cityName);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  
  getFavoriteCities(): string[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
  

}
