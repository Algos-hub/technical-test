import {describe, expect, test} from '@jest/globals';

// import the input and the expected output from the json files in the data directory
import * as input from "../data/input.json";
import * as expected_output from "../data/expected_output.json";
// import the function to be tested
import { final_price_level_1 } from "..";

describe('get final price', () => {
  test('maps the rentals array from the input file and matches each rental object to its corresponding car object from the cars array in the input file\n\ncalculates the total sum with the price per day, price per km, the estimated total distance traveled and the number of days the driver rented the car', () => {
    expect(final_price_level_1(input.cars, input.rentals)).toEqual(expected_output.rentals);
  });
});

