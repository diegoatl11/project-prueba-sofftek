export type OptionKey = "me" | "other";

export const cardOptions: { key: OptionKey; title: string; text: string }[] = [
  {
    key: "me",
    title: "Para mí",
    text: "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
  },
  {
    key: "other",
    title: "Para alguien más",
    text: "Realiza una cotización para uno de tus familiares o cualquier persona.",
  },
];
