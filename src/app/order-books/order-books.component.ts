import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradablecitiesService } from '../services/trading/tradablecities.service';
import { OrdersService } from '../services/trading/orders.service';

@Component({
  selector: 'app-order-books',
  imports: [CommonModule],
  templateUrl: './order-books.component.html',
  styleUrl: './order-books.component.css'
})
export class OrderBooksComponent {

  orderBooks: Map<string, Map<string, Map<number, number>>> = new Map<string, Map<string, Map<number, number>>>();

  constructor(private tradableCitiesService: TradablecitiesService, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.tradableCitiesService.getAllTradableCities().subscribe(
      (data: string[]) => {
        for (let i = 0; i < data.length; i++) {
          this.orderService.getOrderBook(data[i]).subscribe(
            (orderBookData) => {
              const buyOrdersPriceToVolume = orderBookData.buyOrdersPriceToVolume;
              const sellOrdersPriceToVolume = orderBookData.sellOrdersPriceToVolume;

              const buyOrdersMap = new Map<number, number>();
              const sellOrdersMap = new Map<number, number>();

              for (const price in buyOrdersPriceToVolume) {
                if (buyOrdersPriceToVolume.hasOwnProperty(price)) {
                  buyOrdersMap.set(Number(price), buyOrdersPriceToVolume[price]);
                }
              }

              for (const price in sellOrdersPriceToVolume) {
                if (sellOrdersPriceToVolume.hasOwnProperty(price)) {
                  sellOrdersMap.set(Number(price), sellOrdersPriceToVolume[price]);
                }
              }

              const ordersMap = new Map<string, Map<number, number>>([
                ["Buy", buyOrdersMap],
                ["Sell", sellOrdersMap]
              ]);
              this.orderBooks.set(data[i], ordersMap);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching tradable cities:', error);
      }
    );
  }

}
