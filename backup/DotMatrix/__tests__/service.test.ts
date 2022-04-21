import {validateMatrixShape} from '../Service';

describe('validateMatrixShape', () => {
  it('should return null if the matrixString is not valid', () => {
    expect(validateMatrixShape('')).toBeNull();
    expect(validateMatrixShape('000000000000000000000000')).toBeNull();
    expect(validateMatrixShape('100000000000000000000000')).toBeNull();
    expect(validateMatrixShape('000001000000000000000000')).toBeNull();
    expect(validateMatrixShape('100001000000000000000000')).toBeNull();
    expect(validateMatrixShape('000000000000000000100001')).toBeNull();
    expect(validateMatrixShape('100001000000000000100001')).toBeNull();

    expect(validateMatrixShape('111111000000000000111111')).toBeNull();
  });

  it('should return the matrixString flipped if shape is upside down', () => {
    expect(validateMatrixShape('000001100000100000100001')).toBe(
      '100001000001000001100000',
    );
    expect(validateMatrixShape('000001100000000100100001')).toBe(
      '100001001000000001100000',
    );
  });

  it('should return the matrixString same matrix string if its valid', () => {
    expect(validateMatrixShape('100001000000000000100000')).toBe(
      '100001000000000000100000',
    );
  });
});
