export interface TipoGasto {
  id:number;
  createdBy:string;
  createdDate:string;
  description:string;
  lastUpadatedDate:string;
  lastUpdatedBy:string;
  status:1;
}

export interface ExcelCatalogue {
  Plantillas: TipoGasto[];
}
