import excelToJson from "convert-excel-to-json";
import * as fs from "fs";
const jsonexport = require("jsonexport");

/**
 * @type {import("./types").ExcelCatalogue}
 */
const file = excelToJson({
  sourceFile: `${__dirname}/../../src/catalogo/Tabla Catálogo de Productos y Servicios.xlsx`,

  columnToKey: {
    A: "id_code",
    B: "sku",
    C: "description",
    D: "uen",
    E: "iva",
    F: "currency",
    G: "unit_cost",
    H: "unit_price",
    I: "SATCODE",
    J: "SATUM",
    L: "satCodeDescription",
    M: "satUmDescription",
    N: "excent",
  },
});

const catalogueParsed = file["Catálogo"].reduce((list, item, i) => {
  if (
    typeof item["id_code"] !== "number" ||
    typeof item.iva !== "number" ||
    typeof item.uen !== "number" ||
    typeof item.unit_price !== "number" ||
    typeof item.unit_cost !== "number"
  )
    return list;

  if (
    typeof item.sku !== "string" ||
    typeof item.description !== "string" ||
    typeof item.SATCODE === "undefined" ||
    typeof item.SATUM === "undefined" ||
    typeof item.satCodeDescription !== "string" ||
    typeof item.satUmDescription !== "string"
  )
    return list;

  if (item.currency !== "MXN" && item.currency !== "USD") return list;

  if (item.excent !== "No" && item.excent !== "Si") return list;

  return [
    ...list,
    {
      id_code: item.id_code,
      description: item.description,
      unit_price: item.unit_price,
      unit_cost: item.unit_cost,
      SATCODE: item.SATCODE,
      SATUM: item.SATUM,
      iva: item.iva,
      uen: item.uen,
      status: 1,
      createdBy: "Praxia",
      createdDate: new Date().toISOString(),
      lastUpdatedBy: "Praxia",
      lastUpdatedDate: new Date().toISOString(),
      sku: item.sku,
      currency: item.currency === "MXN" ? 1 : 2,
      syncStatus: 0,
      idMizar: "NA",
      satCodeDescription: item.satCodeDescription,
      satUmDescription: item.satUmDescription,
      excent: item.excent === "Si" ? 1 : 0,
    },
  ];
}, []);

jsonexport(catalogueParsed, function (err, csv) {
  if (err) return console.error(err);
  // const reader = fs.createReadStream(csv);
  const writer = fs.createWriteStream("Catalogue.csv");

  writer.write(csv);

  writer.end();

  // reader.pipe(jsonexport()).pipe(writer);
});
