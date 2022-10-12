export interface TipoConcepto {
  id:number;
  createdBy:string;
  createdDate:string;
  description:string;
  lastUpdatedDate:string;
  lastUpdatedBy:string;
  status:1;
}

export interface ExcelCatalogue {
  Plantillas: TipoConcepto[];
}
