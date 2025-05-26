import * as Yup from "yup";

export const validationSchema = Yup.object({
  docNumber: Yup.string()
    .required("Número de documento es obligatorio")
    .matches(/^\d+$/, "Solo números permitidos")
    .length(8, "El número de documento debe tener 8 dígitos"),
  phone: Yup.string()
    .required("Celular es obligatorio")
    .matches(/^\d+$/, "Solo números permitidos")
    .length(9, "El número de documento debe tener 9 dígitos"),
  privacy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la Política de Privacidad"
  ),
  communications: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la Política de Comunicaciones"
  ),
});
