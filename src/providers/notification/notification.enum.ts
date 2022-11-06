export interface ISingleEmail {
  email: string;
  subjectOrTemplateId: string;
  htmlOrTemplate?: any;
  options?: any;
  attachments?: any[];
}
