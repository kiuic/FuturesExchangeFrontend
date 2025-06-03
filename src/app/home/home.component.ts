import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/trading/users.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userAgents: Map<number, string> = new Map();

  constructor(private usersService: UsersService) {}

  public addTradingAgent(userID: number, agentType: string): void {
    console.log('dobar log');
    this.usersService.startTradingAgent(userID, agentType);
    this.userAgents.set(userID, agentType);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'userAgents',
        JSON.stringify(Array.from(this.userAgents.entries()))
      );
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const storedUserAgents = sessionStorage.getItem('userAgents');
      if (storedUserAgents) {
        this.userAgents = new Map(JSON.parse(storedUserAgents));
      }
    }
  }
}
