export interface User {
  /* firstName: string; // required
    lastName: string; // required
    email: string; // required, must be valid email format
    password: string; // required, value must be equal to confirm password and not include firstname || lastname.
    confirmPassword: string; // required, value must be equal to password.*/

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
  canDelete: boolean;
  canEdit: boolean;
  canUse: boolean;
  canShare: boolean;
}
