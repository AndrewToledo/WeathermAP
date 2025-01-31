import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly detroyd$: Subject<void> = new Subject();
  initialCityName: string = 'São Paulo'; // Adicionado o tipo explícito para evitar conflitos
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWheatherDatas(this.initialCityName);
  }

  getWheatherDatas(cityName: string): void {
    this.weatherService
      .getWeatherData(cityName)
      .pipe(takeUntil(this.detroyd$))
      .subscribe({
        next: (response) => {
          response && (this.weatherDatas = response);
          console.log(this.weatherDatas);
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * Método chamado ao enviar o formulário
   */
  onSubmit(): void {
    if (this.initialCityName.trim()) {
      this.getWheatherDatas(this.initialCityName);
      console.log('CHAMOU A FUNÇÃO') // Chama a API para buscar a cidade
    } else {
      console.log('O campo de busca está vazio.');
    }
  }

  ngOnDestroy(): void {
    this.detroyd$.next();
    this.detroyd$.complete();
  }
}
