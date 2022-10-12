export interface CatalogueI {
  id_code: number;
  sku: string;
  description: string;
  uen: number;
  iva: number;
  currency: "USD" | "MXN";
  unit_cost: number;
  unit_price: number;
  SATCODE: string;
  SATUM: string;
  satCodeDescription: string;
  satUmDescription: string;
  excent: "Si" | "No";
}

export interface ExcelCatalogue {
  Catálogo: CatalogueI[];
}
