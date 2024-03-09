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

export interface Actions {
	who: string;
	type: string;
	amount: number;
}

export interface Rental_final {
	id: number;
	actions: Actions[];
}

