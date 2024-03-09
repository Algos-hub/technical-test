import {describe, expect, test} from '@jest/globals';

// import the input and the expected output from the json files in the data directory
import * as input from "../data/input.json";
import * as expected_output from "../data/expected_output.json";
// import the function to be tested
import { final_price_level_3 } from "..";

describe('get final price', () => {
  test('same as level 2 + added the detailed commission object: commission total = 30% of the total price, insurance fee = 50% of the commission fee, roadside assistance 1€ (100c) per day, and the rest for the company ' , () => {
    expect(final_price_level_3(input.cars, input.rentals)).toEqual(expected_output.rentals);
  });
});


