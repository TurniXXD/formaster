import { EFormFieldType, EFormFieldValidation, IForm, IUser } from "@/types";
import { v4 } from "uuid";

const now = new Date();
const nowBeforeTwoHours = new Date(now);
nowBeforeTwoHours.setHours(nowBeforeTwoHours.getHours() - 2);

export const testUser: IUser = {
  id: v4(),
  name: "Jan Novák",
  email: "jnovak@seznam.cz",
  password: "Nov4k_j3_n3j",
};

export const testForms: Array<IForm> = [
  {
    id: v4(),
    csTitle: "Plánování dovolené",
    enTitle: "Vacation planning",
    fields: [
      {
        type: EFormFieldType.text,
        csTitle: "Kam byste chtěli jet?",
        enTitle: "Where would you like to go?",
        validation: EFormFieldValidation.required,
        validationValue: "",
      },
      {
        type: EFormFieldType.number,
        csTitle: "Jaký je váš rozpočet na dovolenou?",
        enTitle: "What is your vacation budget?",
        validation: EFormFieldValidation.required,
        validationValue: "",
      },
      {
        type: EFormFieldType.boolean,
        csTitle: "Cestujete sami?",
        enTitle: "Are you traveling alone?",
        validation: EFormFieldValidation.required,
        validationValue: "",
      },
    ],
    createdAt: nowBeforeTwoHours,
    updatedAt: nowBeforeTwoHours,
  },
  {
    id: v4(),
    csTitle: "Výběr jídla pro restauraci",
    enTitle: "Food selection for restaurant",
    fields: [
      {
        type: EFormFieldType.text,
        csTitle: "Jaké jídlo byste si přáli v naší restauraci?",
        enTitle: "What kind of food would you like in our restaurant?",
        validation: EFormFieldValidation.required,
        validationValue: "",
      },
      {
        type: EFormFieldType.boolean,
        csTitle: "Máte rádi pizzu?",
        enTitle: "Do you like pizza?",
        validation: EFormFieldValidation.required,
        validationValue: "",
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
];
