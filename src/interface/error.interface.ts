export interface ErrorResponse {
  status: number;
  message: string;
  details?: Array<DetailsErrors>;
}

export interface DetailsErrors {
  field: string;
  issue: string;
  value?: any;
}