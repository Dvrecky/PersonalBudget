import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { AddTransactionComponent } from './pages/transaction/add-transaction/add-transaction.component';
import { AccountComponent } from './pages/account/account/account.component';
// dodanie (importowanie) komponentów, których użyjemy do routingu

// zdefiniowanie komponentów jakich Angular ma użyć dla podanych ścieżek
export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'transaction', component: AddTransactionComponent},
    {path: 'accounts', component: AccountComponent},
];
