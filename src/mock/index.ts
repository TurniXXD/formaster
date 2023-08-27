import {
  EFormFieldType,
  EFormFieldValidation,
  ELangs,
  ETranslatableErrors,
  Form,
  IUser,
} from "@/types";

const now = new Date();
const nowBeforeTwoHours = new Date(now);
nowBeforeTwoHours.setHours(nowBeforeTwoHours.getHours() - 2);

export const testUser: IUser = {
  id: "1",
  name: "Jan Novák",
  email: "jnovak@seznam.cz",
  password: "Nov4k_j3_n3j",
};

export const testForms: Array<Form> = [
  {
    id: "1",
    title: [
      {
        value: "Plánování dovolené",
        locale: ELangs.cs,
      },
      {
        value: "Vacation planning",
        locale: ELangs.en,
      },
    ],
    fields: [
      {
        type: EFormFieldType.text,
        validations: [
          {
            type: EFormFieldValidation.required,
            error: ETranslatableErrors.requiredField,
          },
        ],
        title: [
          {
            value: "Kam byste chtěli jet?",
            locale: ELangs.cs,
          },
          {
            value: "Where would you like to go?",
            locale: ELangs.en,
          },
        ],
      },
      {
        type: EFormFieldType.text,
        validations: [
          {
            type: EFormFieldValidation.required,
            error: ETranslatableErrors.requiredField,
          },
        ],
        title: [
          {
            value: "Jaký je váš rozpočet na dovolenou?",
            locale: ELangs.cs,
          },
          {
            value: "What is your vacation budget",
            locale: ELangs.en,
          },
        ],
      },
      {
        type: EFormFieldType.boolean,
        validations: [
          {
            type: EFormFieldValidation.required,
            error: ETranslatableErrors.requiredField,
          },
        ],
        title: [
          {
            value: "Máte rádi pizzu?",
            locale: ELangs.cs,
          },
          {
            value: "Do you like pizza?",
            locale: ELangs.en,
          },
        ],
      },
    ],
    createdAt: nowBeforeTwoHours,
    updatedAt: nowBeforeTwoHours,
  },
  {
    id: "2",
    title: [
      {
        value: "Výběr jídla pro restauraci",
        locale: ELangs.cs,
      },
      {
        value: "Food selection for restaurant",
        locale: ELangs.en,
      },
    ],
    fields: [
      {
        type: EFormFieldType.text,
        validations: [
          {
            type: EFormFieldValidation.required,
            error: ETranslatableErrors.requiredField,
          },
        ],
        title: [
          {
            value: "Jaké jídlo byste si přáli v naší restauraci",
            locale: ELangs.cs,
          },
          {
            value: "What kind of food would you like in our restaurant?",
            locale: ELangs.en,
          },
        ],
      },
      {
        type: EFormFieldType.boolean,
        validations: [
          {
            type: EFormFieldValidation.required,
            error: ETranslatableErrors.requiredField,
          },
        ],
        title: [
          {
            value: "Máte rádi pizzu?",
            locale: ELangs.cs,
          },
          {
            value: "Do you like pizza?",
            locale: ELangs.en,
          },
        ],
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
];
