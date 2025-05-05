export interface ResponseAPI<Content> {
  statusCode: number;
  message: string;
  content: Content; // generic type
  dateTime: string;
}
