export const WHATSAPP_NUMBER = "9779851033919"; // 9851033919 with Nepal country code
export const DEFAULT_MESSAGE =
  "Hello Siddhartha Suva Trade Link, I would like to inquire about your premium paint collections.";

export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productInquiryLink(productName: string): string {
  return whatsappLink(
    `Hello Siddhartha Suva Trade Link, I would like to inquire about ${productName}. Please share availability, sizes and pricing.`
  );
}

export const PHONES = {
  primary: "9851033919",
  secondary: ["9849431091", "9762684554"],
};
