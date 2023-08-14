import { expect, test } from "vitest";
import { INIT_CARDS_DISTRIBUTION } from "../constants/constants";


test(`the initial distribution of cards shouldn't contain duplicated values`, () => {
    const collection = new Set(INIT_CARDS_DISTRIBUTION)
    expect(collection.size === INIT_CARDS_DISTRIBUTION.length)
})
