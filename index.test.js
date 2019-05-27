const path = require('path');
const { readFile, utils } = require('xlsx');
const { 
  parseGeneralProgramme,
  findWeekRowStart,
  getDayEndRow,
} = require('.');

describe('Durbanville Calendar Manager', () => {
  describe('May 2019 Programme', () => {
    const testFilePath = path.resolve(__dirname, 'test-data','general-programme-may-2019.xlsx');
    const { SheetNames, Sheets} = readFile(testFilePath);
    const currentMonthSheetName = SheetNames[SheetNames.length-2];
    const sheet = Sheets[currentMonthSheetName]; 
   
    describe('parseGeneralProgramme', () => {
      let output; 
      beforeAll(() => {
        output = parseGeneralProgramme(sheet);
      });
      test('should be defined', () => {
        expect(output).toBeDefined();
      });
     test.skip('should have more than 28 entries', () => {
        expect(output.length).toBeGreaterThan(28);
      });
    });
    describe('findWeekRowStart', () => {
      test('should should be A3', () => {
       const result = findWeekRowStart(sheet);
       expect(utils.encode_cell(result)).toEqual('A2');
      });
    });
    describe('getDayEndRow', () => {
      const weekRowStart = findWeekRowStart(sheet); 
      const startRowCell = { ...weekRowStart, r: weekRowStart.r + 1 };

      const result = getDayEndRow(sheet, startRowCell);
      test('should should be A8', () => {
        expect(utils.encode_cell(result)).toEqual('A8');
      });
    });
  });
});