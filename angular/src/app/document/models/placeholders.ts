import { Element } from "./element";
import { Placeholder } from "./placeholder";
import * as uuid from "uuid";

export const placeholderlist: Placeholder[] = [
  {
    idPlaceholderBack: null,
    idPlaceholder: uuid.v4(),
    namePlaceholder: null,
    colorPlaceholder:
      "#" +
      (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
      "7F",
    typePlaceholder: "needSign",
    elements: [],
    template: null,
    nameRecipient: null,
    emailRecipient: null,
    orderPlaceholder: null,
    isvisible: true,
    phoneRecipient: null,
    orgRecipient: null,
  },
];
