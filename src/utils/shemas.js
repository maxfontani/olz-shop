import * as yup from "yup";

export const BasicProductSchema = yup.object().shape({
  title: yup.string().min(3).max(20).required(),
  price: yup.number().positive().integer().required(),
  origin: yup.string().required(),
});
