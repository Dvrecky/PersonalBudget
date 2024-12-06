export interface Transaction {
    id: number;
    amount: number;
    date: Date;
    description: string;
    recurring: boolean;
    //reccuringPeriod: ReccuringPeriod,
    recurringPeriod: string;
    type: 'income' | 'expense';
    accountId: number;
    categoryId: number;
}
