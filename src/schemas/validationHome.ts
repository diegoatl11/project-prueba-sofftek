import * as Yup from "yup";

export const validationSchema = Yup.object({
  docNumber: Yup.string()
    .required("Número de documento es obligatorio")
    .matches(/^\d+$/, "Solo números permitidos"),
  phone: Yup.string()
    .required("Celular es obligatorio")
    .matches(/^\d+$/, "Solo números permitidos"),
  privacy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la Política de Privacidad"
  ),
  communications: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la Política de Comunicaciones"
  ),
});