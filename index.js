// https://sheetjs.gitbooks.io/docs
const { readFile, utils: { encode_cell, encode_range, sheet_to_json } } = require('xlsx');


const findWeekRowStart = (sheet) => {
  for (let index = 0; index < 20; index++) {
    let cell = { c: 0 , r: index };

    const encodedCell = encode_cell(cell);

    if(sheet[encodedCell] && sheet[encodedCell].v === 'Sunday'){
      return cell;
    }
  }
  return undefined;
}

const isEndingCell = (cell) => {
   if(cell) {
    return !isNaN(parseInt(cell.w));
   }
   return false; 
}

const getDayEndRow = (sheet, startRow) => {
  let cell;
  let index;
  for (index = startRow.r; index < startRow.r + 10; index++) {
    cell = { ...startRow, r: index };
    if(isEndingCell(sheet[encode_cell(cell)])){    
      return { ...cell, r: cell.r -1 };
    } 
  }
  return { ...cell, isEnd: true }
}

const getRawWeek = (weekStartRow, weekEndRow, sheet) => {
  const options = { blankrows: false, raw: false , header: 1 }
  const roughWeek = []; 
  for (let index = 0; index < 7; index++) {
    let topLeft = encode_cell({ c: index * 2, r: weekStartRow.r });
    let botRight = encode_cell({ c: (index * 2) + 1, r: weekEndRow.r });
    const data = sheet_to_json(sheet, { range: encode_range(topLeft, botRight), ...options });
    console.log( data[0]);
    roughWeek.push({
      firstRow: data[0],
      data,
    });
  }
  return roughWeek; 
}

const splitIntoDays = (sheet, weekRowStart) => {
  const startRowCell = { ...weekRowStart, r: weekRowStart.r + 1 };
  const dayEndRowCell = getDayEndRow(sheet, startRowCell);
 
  
  let weekEndRow = { ...dayEndRowCell };
  let weekStartRow = { ...startRowCell };
  let roughMonth = getRawWeek(weekStartRow, weekEndRow, sheet); 

  while(!weekEndRow.isEnd){
    weekStartRow = { ...startRowCell, r: weekEndRow.r + 1 }
    weekEndRow = getDayEndRow(sheet, {...weekStartRow, r: weekStartRow.r + 1 });
    roughMonth.push(...getRawWeek(weekStartRow, weekEndRow, sheet));
  }
  console.log(roughMonth.length);
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
  splitIntoDays,
};


