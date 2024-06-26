import { User } from "./user";

export class Contact {
  constructor(
    public idContact: number,
    public fullNameContact: string,
    public emailContact: string,
    public companyContact: boolean,
    public telContact: string, //   public reminderFrequency: number
    public isSelected: boolean,
    public user: User
  ) {}
}
