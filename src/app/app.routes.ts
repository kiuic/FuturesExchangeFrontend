import { Routes } from '@angular/router';
import { TradableCitiesComponent } from './tradable-cities/tradable-cities.component';
import { HomeComponent } from './home/home.component';
import { OrderBooksComponent } from './order-books/order-books.component';
import { PNLComponent } from './pnl/pnl.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'TradableCities', component: TradableCitiesComponent },
    { path: 'OrderBooks', component: OrderBooksComponent },
    { path: 'PNL', component: PNLComponent }
];
