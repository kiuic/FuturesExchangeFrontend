import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  startTradingAgent(userID: number, type: string): void {
    console.log('Starting trading agent for user:', userID, 'with type:', type);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:8188/trading/AddTradingAgent`;
    const body = { userID, type };
    this.http.post(url, body, { headers }).subscribe({
      next: response => console.log('Trading agent started successfully:', response),
      error: error => console.error('Error starting trading agent:', error)
    });
  }

  getPnl(userID: number, book: string): Observable<any> {
    const url = `http://localhost:8188/trading/getpnl?userid=${userID}&book=${book}`;
    return this.http.get<any>(url).pipe();
  }
}