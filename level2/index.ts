// offloading interfaces to a different file so only the actual logic is present in this file
import { Car, Rental, Rental_price } from "./interfaces";

export function final_price_level_2(cars: Car[], rentals_arr: Rental[]): Rental_price[] {
	// maps the rentals_arr array
	const rentals: Rental_price[] = rentals_arr.map((rental: Rental) => {
		// matches the car_id to its corresponding car obj in the cars array
		const car: Car = cars.filter((el: Car) => el.id === rental.car_id)[0];

		// calculate the number of days the driver rented the car (the last day included hence the "+ 1" at the end of the equation)
		const total_days: number = Math.floor((Date.parse(rental.end_date) - Date.parse(rental.start_date)) / 86400000) + 1;

		// calculate the total price per km and the total price per days based on the total days and the estimated distance travelled 
		const total_price_per_km: number = rental.distance * car.price_per_km;

		// initialize the total price per day
		let total_price_per_days: number = car.price_per_day;

		// initialise the discount multiplier
		let discount: number = 1;

		// loop through the number of days and apply the correct discount for the current day
		for(let i = 1; i <= total_days; ++i) {
			if(i > 1) discount = 0.1;
			if(i > 4) discount = 0.3;
			if(i > 10) discount = 0.5;
			total_price_per_days += car.price_per_day - (car.price_per_day * discount);
		}

		
		// returns the final rental object with the rental id and the final added price of the total price per days and the total price per km
		return {id: rental.id, price: total_price_per_days + total_price_per_km}
	})

	return rentals;
}

