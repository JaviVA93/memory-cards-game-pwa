import { expect, test } from "vitest";
import { randomIntFromInterval } from "../utils/utils";

test('generate a random interval between 1 and 100', () => {
    expect(randomIntFromInterval(1, 100)).above(0).below(101)
})
