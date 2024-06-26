export class ShareWithForDoc {
  constructor(
    public idShare: number,
    public canDelete: boolean,
    public canShare: boolean,
    public idUser: string,
    public idDocumentSign: string
  ) {}
}
