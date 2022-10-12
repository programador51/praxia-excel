import excelToJson from "convert-excel-to-json";
import * as fs from "fs";
const jsonexport = require("jsonexport");

/**
 * @type {import("./types").ExcelCatalogue}
 */
const file = excelToJson({
  sourceFile: `${__dirname}/../../src/Conceptos/Plantillas carga de datos.xlsx`,

  columnToKey: {
    Z: "id",
    AA: "description",
  },
});

const conceptsParsed = file["Plantillas"].reduce((list, item, i) => {
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
    },
  ];
}, []);

jsonexport(conceptsParsed, function (err, csv) {
  if (err) return console.error(err);
  // const reader = fs.createReadStream(csv);
  const writer = fs.createWriteStream("TiposDeConcepto.csv");

  writer.write(csv);

  writer.end();

  // reader.pipe(jsonexport()).pipe(writer);
});
