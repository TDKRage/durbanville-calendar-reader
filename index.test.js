const path = require('path');
const {parseGeneralProgramme} = require('.');

describe('Durbanville Calendar Manager', () => {
  describe('parseGeneralProgramme', () => {
    const testFilePath = path.resolve(__dirname, 'test-data','general-programme-may-2019.xlsx');
    let output; 
    beforeAll(() => {
      output = parseGeneralProgramme(testFilePath);
    });
    test('should be an Array', () => {
      expect(Array.isArray(output)).toBeTruthy();
    });
    test('should have length greater than 0', () => {
      expect(output.length).toBeGreaterThan(0);
    });
  });
});