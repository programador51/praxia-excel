import excelToJson from "convert-excel-to-json";
import * as fs from "fs";
const jsonexport = require("jsonexport");

/**
 * @type {import("./types").ExcelCatalogue}
 */
const file = excelToJson({
  sourceFile: `${__dirname}/../../src/Lista Conceptos/Plantillas carga de datos.xlsx`,

  columnToKey: {
    A: "id",
    B: "idTypeInformativeExpenses",
    C: "description",
  },
});

const conceptList = file["Conceptos Egresos"].reduce((list, item, i) => {
  if (i === 0) return list;

  return [
    ...list,
    {
      ...item,
      createdBy: "José Luis Pérez Olguín",
      createdDate: new Date().toISOString().split("T")[0],
      status: 1,
      lastUpadatedDate: new Date().toISOString().split("T")[0],
      lastUpdatedBy: "José Luis Pérez Olguín",
      currency: 1,
    },
  ];
}, []);

jsonexport(conceptList, function (err, csv) {
  if (err) return console.error(err);
  // const reader = fs.createReadStream(csv);
  const writer = fs.createWriteStream("InformativeExpenses.csv");

  writer.write(csv);

  writer.end();

  // reader.pipe(jsonexport()).pipe(writer);
});
