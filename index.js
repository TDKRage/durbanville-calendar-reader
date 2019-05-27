// https://sheetjs.gitbooks.io/docs
const { readFile, utils } = require('xlsx');


const findWeekRowStart = (sheet) => {
  for (let index = 0; index < 20; index++) {
    let cell = { c: 0 , r: index };

    const encodedCell = utils.encode_cell(cell);

    if(sheet[encodedCell] && sheet[encodedCell].v === 'Sunday'){
      return cell;
    }
  }
  return undefined;
}

const isEndingCell = (cell) => {
  console.log(cell);
   if(cell) {
    return !isNaN(cell.w);
   }
   return false; 
}

const getDayEndRow = (sheet, startRow) => {
  for (let index = startRow.r; index < startRow.r + 10; index++) {
    const cell = { ...startRow, r: index };
    if(isEndingCell(sheet[utils.encode_cell(cell)])){
      
      return { ...cell, r: cell.r -1 };
    } 
  }
}

const splitIntoDays = (sheet, weekRowStart) => {
  const startRowCell = { ...weekRowStart, r: weekRowStart.r + 1 };
  const dayEndRowCell = getDayEndRow(sheet, startRowCell);
  console.log('dayEndRowCell', dayEndRowCell);
}

const parseGeneralProgramme = (sheet) => {
  const weekRowStart = findWeekRowStart(sheet); 

  const daySplitArray = splitIntoDays(sheet, weekRowStart);

  return [];
}; 

module.exports = { 
  parseGeneralProgramme,
  findWeekRowStart,
  getDayEndRow,
};