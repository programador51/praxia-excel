export interface UEN {
  "UENID": number;
  "description": string;
  "family": string;
  "subFamily": string;
  "SATcode": string;
  "SATUM": string;
  "status": 1;
  "iva": number;
  "createdBy": string;
  "createdDate": string;
  "lastUpdatedBy": string;
  "lastUpdatedDate": string;
  "marginRate": number;
  "satCodeDescription": string;
  "satUmDescription": string;
  "excent": number;
}

export interface ExcelCatalogue {
  UEN: UEN[];
}
