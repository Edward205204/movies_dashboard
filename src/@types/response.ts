export interface ResponseAPI<Content> {
  statusCode: number;
  message: string;
  content: Content;
  dateTime: string;
}
