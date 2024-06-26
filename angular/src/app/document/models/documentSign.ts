import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { Folderdoc } from "./folder";
import { Mail } from "./mail";

export class DocumentSign {
  constructor(
    public idDocumentSign: string,
    public idCreatedBy: string,
    private createdBy: any,
    public nameDocumentSign: string,
    public descDocumentSign: string,
    public creationDateDocumentSign: Date,
    public filePdf: any,
    public idFolder: string,
    public mail: Mail,
    public placeholders: any[],
    public visible: Boolean,
    public typeofSend: string,
    public isSelected: boolean,
    public folder: Folderdoc,
    public status: string
  ) {}
}
