// offloading interfaces to a different file so only the actual logic is present in this file
import { Car, Rental, Actions, Rental_final, Options} from "./interfaces";

export function final_price_level_5(cars: Car[], rentals_arr: Rental[], options: Options[]): Rental_final[] {
	// maps the rentals_arr array
	const rentals: Rental_final[] = rentals_arr.map((rental: Rental) => {
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

		// get the price before the additional services fees
		const price_before_additional_fees: number = total_price_per_km + total_price_per_days;

		// calculate the commission fee and split it
		const commission: number = price_before_additional_fees * 0.3;
		
		const insurance_fee: number = commission * 0.5;
		const assistance_fee: number = total_days * 100;
		const drivy_fee: number = commission - assistance_fee - insurance_fee;

		// get the driver's selected options by filtering the options array
		const driver_options: string[] = options.filter((el: Options) => el.rental_id === rental.id).map((el: Options) => {return el.type})

		// calculate each fee amount for the additional services selected (10€/10000c per day for the additional insurance,
		// 5€/500c per day for the gps and 2€/200c per day for the baby_seat)
		const additional_insurance_fee: number = driver_options.includes('additional_insurance') ? total_days * 1000 : 0;
		const gps_fee: number = driver_options.includes('gps') ? total_days * 500 : 0;
		const baby_seat_fee: number = driver_options.includes('baby_seat') ? total_days * 200 : 0;

		// separating what will go directly to the owner as per the additional services (gps and baby seat)
		const owner_additional_services_fees = gps_fee + baby_seat_fee;

		const final_price: number = price_before_additional_fees + additional_insurance_fee + owner_additional_services_fees;

		// define the actions and push them one by one
		let actions: Actions[] = [];
		for(let i = 0; i < 5; i++){
			switch(i){
				case 0:
					actions.push({who: 'driver', type: "debit", amount: final_price });
					break;
				case 1:
					actions.push({who: 'owner', type: "credit", amount: price_before_additional_fees - commission + owner_additional_services_fees });
					break;
				case 2:
					actions.push({who: 'insurance', type: "credit", amount: insurance_fee });
					break;
				case 3:
					actions.push({who: 'assistance', type: "credit", amount: assistance_fee });
					break;
				case 4:
					// adding the insurance fee which will go directly to the company
					actions.push({who: 'drivy', type: "credit", amount: drivy_fee + additional_insurance_fee });
					break;
			}
		}

		// returns the final rental object with the rental id and the final added price of the total price per days and the total price per km
		// and with the actions details as well as the additional services selected and their accompanying fees
		return {id : rental.id, options: driver_options, actions: actions };
		
	})

	return rentals;
}


