// https://sheetjs.gitbooks.io/docs
const xlsx = require('xlsx');

const parseGeneralProgramme = (programme) => {
  const { SheetNames, Sheets} = xlsx.readFile(programme); 
  
  const currentMonthSheetName = SheetNames[SheetNames.length - 2];
  
  console.log(currentMonthSheetName);

  return currentMonthSheetName;
}; 

module.exports = { parseGeneralProgramme };