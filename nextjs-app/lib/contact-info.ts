export const contactInfo = {
  email: "irispolymerecom@hotmail.com",
  phones: ["+213 560 09 00 18", "+213 560 09 00 16"],
  whatsappNumber: "213560090018", // digits only, international format, no leading +
  website: "www.irispolymere.com",
};

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${contactInfo.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
