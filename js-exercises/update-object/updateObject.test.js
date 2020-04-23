import { updateObject } from "./updateObject";

describe("updateObject", () => {

    test('should replace value at the given index', () => {

        const position = 1,
              value = "-",
              arr = ['a','b','c'];
              
        expect(updateObject(position,value,arr)).toEqual(['a','-','c']);

    });

    test('should replace at the last index if position is less than zero', () => {

        const position = -1,
              value = "-",
              arr = ['a','b','c'];
              
        expect(updateObject(position,value,arr)).toEqual(['a','b','-']);

    });

    test('should return with the value if array is empty', () => {

        const position = -1,
              value = "-",
              arr = [];
              
        expect(updateObject(position,value,arr)).toEqual(['-']);

    });

});
