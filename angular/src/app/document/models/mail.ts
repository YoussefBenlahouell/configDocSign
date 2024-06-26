export class Mail {
  constructor(
    public idMail: string,
    public subjectMail: string,
    public messageMail: string,
    public reminderEnabled: boolean,
    public reminderDelay: number
  ) //   public reminderFrequency: number
  {}
}
