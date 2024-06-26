export class ShareWith {
  constructor(
    public idShare: number,
    public canDelete: boolean,
    public canEdit: boolean,
    public canUse: boolean,
    public canShare: boolean,
    public idUser: string,
    public idtemplate: string
  ) {}
}
