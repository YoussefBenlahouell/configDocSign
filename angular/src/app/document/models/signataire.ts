import { Element } from "./element";

export class Signataire {
  constructor(
    public idSig: string,
    public lnameSig: string,
    public fnameSig: string,
    public emailSig: string,
    public passwordSig: string,
    public telSig: string,
    public color: string,
    public elements: any[]
  ) {}
}
