export interface Category {
	id: string;
	slug: string;
	nameBn: string;
	icon: string;
}

export interface ProductChange {
	dir: "up" | "down" | "neutral";
	pct: number;
}

export interface Product {
	id: number;
	slug: string;
	nameBn: string;
	category: string;
	categoryNameBn: string;
	categoryIcon: string;
	unit: string;
	image: string;
	today: number;
	yesterday: number;
	lastWeek: number;
	lastMonth: number;
	change: ProductChange;
	markets: {
		market: string;
		division: string;
		min: number;
		max: number;
	}[];
}
