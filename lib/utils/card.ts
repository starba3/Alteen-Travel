export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(" ").substr(0, 19);
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 2) {
    return `${digits.substr(0, 2)}/${digits.substr(2, 2)}`;
  }
  return digits;
}

export function detectCardType(number: string): string {
  const cleaned = number.replace(/\D/g, "");
  
  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "Mastercard";
  if (/^3[47]/.test(cleaned)) return "American Express";
  if (/^6(?:011|5)/.test(cleaned)) return "Discover";
  
  return "";
}