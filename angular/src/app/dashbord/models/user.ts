import { organization } from "./organization";

export class User {
  constructor(
    public idUser: string,
    public lnameUser: string,
    public fnameUser: string,
    public emailUser: string,
    public passwordUser: string,
    public telUser: string,
    public fonctionUser: string,
    public creationDateUser: any,
    public roleUser: string,
    public contryUser: string,
    public regionUser: string,
    public isSelected: boolean,
    public organization: organization,
    public isActive: boolean,
    public birthDateUser: Date,
    public imageprofileUser: string,
    public ishomme: boolean
  ) {}
}
