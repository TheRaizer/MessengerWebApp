import { updateObjectWithPartial } from '../../helpers/updateObjectWithPartial';

describe('updateObjectWithPartial', () => {
  it('should update an object with a partial object', () => {
    const original = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
    };

    const partialObject = {
      age: 31,
      email: 'johnny@example.com',
    };

    const expected = {
      name: 'John',
      age: 31,
      email: 'johnny@example.com',
    };

    const result = updateObjectWithPartial(original, partialObject);

    expect(result).toEqual(expected);
  });

  it('should not update an object if the property is not in the partial object', () => {
    const original = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
    };

    const partialObject = {
      age: 31,
    };

    const expected = {
      name: 'John',
      age: 31,
      email: 'john@example.com',
    };

    const result = updateObjectWithPartial(original, partialObject);

    expect(result).toEqual(expected);
  });
});
