"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _convertExcelToJson = _interopRequireDefault(require("convert-excel-to-json"));

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var jsonexport = require("jsonexport");
/**
 * @type {import("./types").ExcelCatalogue}
 */


var file = (0, _convertExcelToJson["default"])({
  sourceFile: "".concat(__dirname, "/../../src/catalogo/Tabla Cat\xE1logo de Productos y Servicios.xlsx"),
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
    N: "excent"
  }
});
var catalogueParsed = file["Catálogo"].reduce(function (list, item, i) {
  if (typeof item["id_code"] !== "number" || typeof item.iva !== "number" || typeof item.uen !== "number" || typeof item.unit_price !== "number" || typeof item.unit_cost !== "number") return list;
  if (typeof item.sku !== "string" || typeof item.description !== "string" || typeof item.SATCODE === "undefined" || typeof item.SATUM === "undefined" || typeof item.satCodeDescription !== "string" || typeof item.satUmDescription !== "string") return list;
  if (item.currency !== "MXN" && item.currency !== "USD") return list;
  if (item.excent !== "No" && item.excent !== "Si") return list;
  return [].concat(_toConsumableArray(list), [{
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
    excent: item.excent === "Si" ? 1 : 0
  }]);
}, []);
jsonexport(catalogueParsed, function (err, csv) {
  if (err) return console.error(err); // const reader = fs.createReadStream(csv);

  var writer = fs.createWriteStream("Catalogue.csv");
  writer.write(csv);
  writer.end(); // reader.pipe(jsonexport()).pipe(writer);
});