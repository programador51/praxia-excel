import excelToJson from "convert-excel-to-json";
import * as fs from "fs";
const jsonexport = require("jsonexport");

/**
 * @type {import("./types").ExcelCatalogue}
 */
const file = excelToJson({
  sourceFile: `${__dirname}/../../src/UEN/UEN.xlsx`,

  columnToKey: {
    A: "UENID",
    B: "description",
    C: "family",
    D: "subfamily",
    E: "SATCode",
    F: "SATUM",
    G: "iva",
    H: "marginRate",
    K: "excent",
  },
});

const uenParsed = file["UEN"].reduce((list, item, i) => {
  if (i === 0) return list;

  if (
    item.UENID === undefined ||
    item.UENID === null ||
    item.UENID === "" ||
    typeof item.UENID !== "number"
  )
    return list;

  return [
    ...list,
    {
      ...item,
      createdBy: "José Luis Pérez Olguín",
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdatedBy: "José Luis Pérez Olguín",
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      satCodeDescription: "No disponible",
      satUmDescription: "No disponible",
      marginRate:item.marginRate * 100,
      iva:item.iva*100,
      excent:item.excent === "No" ? 0 : 1,
      status:1
    },
  ];
}, []);

jsonexport(uenParsed, function (err, csv) {
  if (err) return console.error(err);
  // const reader = fs.createReadStream(csv);
  const writer = fs.createWriteStream("UEN.csv");

  writer.write(csv);

  writer.end();

  // reader.pipe(jsonexport()).pipe(writer);
});
