export const SHIPPING_RATES = {
  pakistan: 350,
  "united states": 11000,
  "united arab emirates": 5000,
  "united kingdom": 8500,
  canada: 11000,
  australia: 10500,
  "saudi arabia": 7000,
  qatar: 8500,
  kuwait: 8000,
  oman: 8000,
  bahrain: 8000,
  bangladesh: 7000,
  lebanon: 8000,
  jordan: 8000,
  srilanka: 7000,
  'new zealand': 10500,
  scotland: 9000,
  iran: 10000,
  egypt: 10000,
  singapore: 7000,
  malaysia: 7000,
  'hong kong': 7000
} as const;

export type ShippingCountry = keyof typeof SHIPPING_RATES;