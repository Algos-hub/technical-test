export interface Car {
	id: number;
	price_per_day: number;
	price_per_km: number;
}
 
export interface Rental {
	id: number;
	distance: number;
	car_id: number;
	start_date: string;
	end_date: string;
}

export interface Commission {
	insurance_fee: number;
	assistance_fee: number;
	drivy_fee: number;
}

export interface Rental_price {
	id: number;
	price: number;
	commission: Commission;
}
