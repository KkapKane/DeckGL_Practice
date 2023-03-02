
const csvToJson = require('convert-csv-to-json');

const input = './assets/us_county.csv'
const output = './assets/us_county.json'

csvToJson.fieldDelimiter(',').formatValueByType().generateJsonFileFromCsv(input, output)