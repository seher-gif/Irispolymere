export const contactInfo = {
  email: "irispolymerecom@hotmail.com",
  phones: ["+213 560 09 00 18", "+213 560 09 00 16"],
  whatsappNumber: "213560090018", // digits only, international format, no leading +
  website: "www.irispolymere.com",
  // Not localized — it's the same physical location regardless of UI language.
  address: "Rue Dahmani Rabah, Groupe Propriete 40, Ilot 04, Soumaa, Wilaya de Blida, 09470, Algeria",
};

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${contactInfo.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** No-API-key Google Maps embed URL — interactive (zoom/pan) by default. */
export function mapEmbedSrc() {
  return `https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`;
}
