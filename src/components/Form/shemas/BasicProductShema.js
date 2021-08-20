import * as Nope from "nope-validator";

export const BasicProductSchema = Nope.object().shape({
  title: Nope.string()
    .required("Это поле обязательное.")
    .greaterThan(2, "Введите от 3 до 20 символов")
    .lessThan(21, "Введите от 3 до 20 символов")
    .regex(
      /^[^0-9!"@#;:%^&*()=+\\/]+$/,
      "Не должно сожержать цифр / спец. символов.",
    ),
  price: Nope.number("Цена должна быть числом.")
    .required("Это поле обязательное.")
    .positive("Цена должна быть положительной.")
    .integer("Цена должна быть целым числом.")
    .lessThan(1000000, "Столько никто не заплатит."),
  origins: Nope.object("Выберите регион.").shape({
    label: Nope.string().required("Выберите регион."),
    value: Nope.string().required("Выберите регион."),
  }),
});
