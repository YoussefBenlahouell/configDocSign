export class Contact {
  constructor(
    public idContact: number,
    public fullNameContact: string,
    public emailContact: string,
    public companyContact: string,
    public telContact: string, //   public reminderFrequency: number
    public isSelected: boolean,
    public idUser: string
  ) {}
}
