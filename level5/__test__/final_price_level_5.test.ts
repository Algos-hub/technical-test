import {describe, expect, test} from '@jest/globals';

// import the input and the expected output from the json files in the data directory
import * as input from "../data/input.json";
import * as expected_output from "../data/expected_output.json";
// import the function to be tested
import { final_price_level_5 } from "..";

describe('get final price', () => {
  test('same as level 4 with the additional services added and their properly calculated and shared between their respective providers' , () => {
    expect(final_price_level_5(input.cars, input.rentals, input.options)).toEqual(expected_output.rentals);
  });
});

