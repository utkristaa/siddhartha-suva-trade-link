export type Product = {
  id: string;
  brand: "Berger" | "Asian Paints";
  name: string;
  category: string;
  tag: string;
  image: string;
  glow: string;
  note: string;
  inquiryName: string;
};

export const products: Product[] = [
  {
    id: "silk-breatheeasy",
    brand: "Berger",
    name: "Silk BreatheEasy",
    category: "Luxury Interior Emulsion",
    tag: "BreatheEasy Luxury",
    image: "/products/berger-silk-breatheeasy.png",
    glow: "#3E6A8A",
    note: "A smooth, washable finish for living rooms and bedrooms.",
    inquiryName: "Berger Silk BreatheEasy (Luxury Interior Emulsion)",
  },
  {
    id: "weathercoat-long-life",
    brand: "Berger",
    name: "Weathercoat Long Life",
    category: "Exterior Emulsion with PU",
    tag: "PU Shield",
    image: "/products/berger-weathercoat-long-life.png",
    glow: "#C0553F",
    note: "An exterior finish made to stand up to strong sun, rain and dust.",
    inquiryName: "Berger Weathercoat Long Life (Exterior Emulsion with PU)",
  },
  {
    id: "berger-family",
    brand: "Berger",
    name: "Easy Clean, Glamor, Anti Dust and Bison",
    category: "Berger interior range",
    tag: "High Sheen",
    image: "/products/berger-family.png",
    glow: "#D9A441",
    note: "Everyday Berger options, from washable finishes to anti-dust and high-sheen paints.",
    inquiryName: "Berger Easy Clean / Glamor / Anti Dust / Bison range",
  },
  {
    id: "royale",
    brand: "Asian Paints",
    name: "Royale",
    category: "Luxury Emulsion",
    tag: "High Sheen",
    image: "/products/asian-royale.png",
    glow: "#E0785F",
    note: "Asian Paints' luxury emulsion with a smooth, lustrous finish.",
    inquiryName: "Asian Paints Royale (Luxury Emulsion)",
  },
  {
    id: "apex-ultima",
    brand: "Asian Paints",
    name: "Apex Ultima",
    category: "Weather-proof Exterior Emulsion",
    tag: "Weather Guard",
    image: "/products/asian-apex-ultima.png",
    glow: "#7E9C84",
    note: "A durable exterior finish for walls exposed to changing weather.",
    inquiryName: "Asian Paints Apex Ultima (Exterior Emulsion)",
  },
  {
    id: "ace",
    brand: "Asian Paints",
    name: "Ace",
    category: "Exterior Emulsion",
    tag: "Weather Guard",
    image: "/products/asian-ace.png",
    glow: "#B9A4D9",
    note: "A straightforward exterior option for everyday home projects.",
    inquiryName: "Asian Paints Ace (Exterior Emulsion)",
  },
];
