export interface Concepto {
  id: number;
  createdBy: string;
  createdDate: string;
  currency: 1;
  description: string;
  idTypeInformativeIncomes: number;
  lastUpadatedDate: string;
  lastUpdatedBy: string;
  status: 1;
}

export interface ExcelCatalogue {
  "Conceptos Ingresos": Concepto[];
}
