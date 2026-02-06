export interface ErrorResponse {
  status: number;
  message: string;
  details?: Array<detailsErrors>;
}

export interface detailsErrors {
  field: string;
  issue: string;
  value?: any;
}