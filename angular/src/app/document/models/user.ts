import { Organization } from "src/app/user/models/organization";

export class User {
  constructor(
    public idUser: string,
    public lnameUser: string,
    public emailUser: string,
    public fnameUser: string,
    public passwordUser: string,
    public telUser: string,
    public fonctionUser: string,
    public roleUser: string,
    public organization: Organization,
    public isSelected: boolean = false,
    public canDelete: boolean,
    public canEdit: boolean,
    public canUse: boolean,
    public canShare: boolean
  ) {}
}
