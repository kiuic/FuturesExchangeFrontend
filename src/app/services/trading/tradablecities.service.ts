import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradablecitiesService {

  constructor(private http: HttpClient) { }

  getAllTradableCities(): Observable<string[]> {
     return this.http.get<string[]>('http://localhost:8448/exchangedata/gettradablecities');
  }

  getTemperature(city: string): Observable<any> {
    return this.http.get<{ city: string, temperature: number }>(
      `http://localhost:8286/temperaturedata/getcurrentcitytemperature?city=${city}`
    );
  }
}
