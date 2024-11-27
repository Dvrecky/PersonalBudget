import { Category } from "./category.model";

export interface CategoryChart {
    labels: string[],
    datasets: {
        data: number[],
        backgroundColor: string[];
    }[];
}