import { Organization } from "./organization";

export class User {
  idUser: string;
  lnameUser: string;
  fnameUser: string;
  emailUser: string;
  passwordUser: string;
  telUser: string;
  fonctionUser: string;
  creationDateUser: any;
  roleUser: string;
  contryUser: string;
  regionUser: string;
  isSelected: boolean;
  isActive: boolean;
  birthDateUser: Date;
  imageprofileUser: string;
  organization: Organization;
  canDelete: boolean; //just pour le sharewith
  canEdit: boolean;
  canUse: boolean;
  canShare: boolean;
}
