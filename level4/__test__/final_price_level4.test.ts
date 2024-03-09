import {describe, expect, test} from '@jest/globals';

// import the input and the expected output from the json files in the data directory
import * as input from "../data/input.json";
import * as expected_output from "../data/expected_output.json";
// import the function to be tested
import { final_price_level_4 } from "..";

describe('get final price', () => {
  test('same as level 3 but the price and the commission object have been replaced with an actions array detailing exactly who is debited and who is credited and how much' , () => {
    expect(final_price_level_4(input.cars, input.rentals)).toEqual(expected_output.rentals);
  });
});

