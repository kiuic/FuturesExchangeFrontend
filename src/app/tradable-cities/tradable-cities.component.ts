import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradablecitiesService } from '../services/trading/tradablecities.service';
import { OrdersService } from '../services/trading/orders.service';

@Component({
  selector: 'app-tradable-cities',
  imports: [CommonModule],
  templateUrl: './tradable-cities.component.html',
  styleUrl: './tradable-cities.component.css'
})
export class TradableCitiesComponent {

  tradableCities: Map<string, number> = new Map<string, number>();
  ordersPerCity: Map<string, number> = new Map<string, number>();

  constructor(private tradableCitiesService: TradablecitiesService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.tradableCitiesService.getAllTradableCities().subscribe(
      (data: string[]) => {
        for (let i = 0; i < data.length; i++) {
          this.tradableCitiesService.getTemperature(data[i]).subscribe(
            (temperatureData) => {
              this.tradableCities.set(data[i], temperatureData.temperature);
            }
          );

            this.ordersService.getOrderBook(data[i]).subscribe(
            (orderBookData) => {
              const buyOrdersVolume: number = orderBookData.buyOrdersPriceToVolume 
                ? Object.values(orderBookData.buyOrdersPriceToVolume).reduce((acc: number, volume: unknown) => acc + (volume as number), 0) 
                : 0;
              const sellOrdersVolume: number = orderBookData.sellOrdersPriceToVolume 
                ? Object.values(orderBookData.sellOrdersPriceToVolume).reduce((acc: number, volume: unknown) => acc + (volume as number), 0) 
                : 0;
              this.ordersPerCity.set(data[i], buyOrdersVolume + sellOrdersVolume);
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
