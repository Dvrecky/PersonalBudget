import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { AddTransactionComponent } from './pages/transaction/add-transaction/add-transaction.component';
import { AccountComponent } from './pages/account/account/account.component';
import {CategoriesComponent} from './pages/categories/categories.component';
import {RecurringPaymentsComponent} from './pages/recurring-payments/recurring-payments.component';
// dodanie (importowanie) komponentów, których użyjemy do routingu

// zdefiniowanie komponentów jakich Angular ma użyć dla podanych ścieżek
export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'transactions', component: AddTransactionComponent},
    {path: 'accounts', component: AccountComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'recurring-payments', component: RecurringPaymentsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
