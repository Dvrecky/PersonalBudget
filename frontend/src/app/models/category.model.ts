export interface Category {
    id: number;
    name: string;
    type: "income" | "expense";
    color: string;
    iconPath: string;
    isDefault: boolean;
}
