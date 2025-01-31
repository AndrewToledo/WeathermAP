import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apikey = '8f82085aa05a7f955ef0a2ddb4a4d508';

  constructor(private http: HttpClient) {}

  getWeatherData(cityName: String): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apikey}`,{}
    );
  }
}
