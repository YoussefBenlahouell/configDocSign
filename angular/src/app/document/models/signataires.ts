import { Element } from "./element";
import { Signataire } from "./signataire";
export const signatairelist: Signataire[] = [
  {
    idSig: "1000",
    lnameSig: "yassine",
    fnameSig: "elj",
    emailSig: "eljyassine1@gmail.com",
    passwordSig: "123456",
    telSig: "25201185",
    color:
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
    elements: [null],
  },
  {
    idSig: "2000",
    lnameSig: "slim",
    fnameSig: "elj",
    emailSig: "slimelj@gmail.com",
    passwordSig: "123456",
    telSig: "2222222",
    color:
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
    elements: [null],
  },
];
