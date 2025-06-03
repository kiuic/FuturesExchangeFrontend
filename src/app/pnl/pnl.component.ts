import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradablecitiesService } from '../services/trading/tradablecities.service';
import { UsersService } from '../services/trading/users.service';

@Component({
  selector: 'app-pnl',
  imports: [CommonModule],
  templateUrl: './pnl.component.html',
  styleUrl: './pnl.component.css'
})
export class PNLComponent {

  pnlData: Map<string, Map<number, PNLData>> = new Map<string, Map<number, PNLData>>();
  userAgents: Map<number, string> = new Map();

  constructor(private tradableCitiesService: TradablecitiesService, private usersService: UsersService) {}

  ngOnInit(): void {
    if (typeof window == 'undefined') {
      return;
    }
    const storedUserAgents = sessionStorage.getItem('userAgents');
    if (storedUserAgents) {
      this.userAgents = new Map(JSON.parse(storedUserAgents));
    }
    this.tradableCitiesService.getAllTradableCities().subscribe(
      (data: string[]) => {
        for (let i = 0; i < data.length; i++) {
          for (const userID of this.userAgents.keys()) {
            this.usersService.getPnl(userID, data[i]).subscribe(
              (pnlData) => {
                const pnlMap = this.pnlData.get(data[i]) || new Map<number, PNLData>();
                if (pnlData.hasOwnProperty("book")) {
                  const pnlEntry = new PNLData(
                    pnlData.book,
                    pnlData.totalLongVolume,
                    pnlData.totalShortVolume,
                    pnlData.signedTotalOutstandingVolume,
                    pnlData.totalDebit,
                    pnlData.totalCredit,
                    pnlData.impliedPnl
                  );
                  pnlMap.set(userID, pnlEntry);
                }
                this.pnlData.set(data[i], pnlMap);
              }
            )
          }
        }
      },
      (error) => {
        console.error('Error fetching tradable cities:', error);
      }
    );
  }
}

class PNLData {
  book: string;
  totalLongVolume: number;
  totalShortVolume: number;
  signedTotalOutstandingVolume: number;
  totalDebit: number;
  totalCredit: number;
  impliedPnl: number;

  constructor(
    book: string,
    totalLongVolume: number,
    totalShortVolume: number,
    signedTotalOutstandingVolume: number,
    totalDebit: number,
    totalCredit: number,
    impliedPnl: number
  ) {
    this.book = book;
    this.totalLongVolume = totalLongVolume;
    this.totalShortVolume = totalShortVolume;
    this.signedTotalOutstandingVolume = signedTotalOutstandingVolume;
    this.totalDebit = totalDebit;
    this.totalCredit = totalCredit;
    this.impliedPnl = impliedPnl;
  }
}
