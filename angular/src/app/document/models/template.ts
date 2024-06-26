import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { Mail } from "./mail";

export class Template {
  constructor(
    public idTemplate: string,
    public nameTemplate: string,
    public descTemplate: string,
    public creationDateTemplate: Date,
    public lastChangeDateTemplate: Date,
    public filePdf: any,
    public idFolder: string,
    public mail: Mail,
    public placeholders: any[],
    public idOwner: String,
    public isSelected: Boolean = false,
    public typeofSend: string
  ) {}
}
