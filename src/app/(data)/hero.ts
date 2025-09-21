import type { HeroData } from "../(types)/common";

export const heroData: HeroData = {
  name: "Bharat Kaushik",
  subhead: "Aligning people, processes, and tech to remove uncertainty from execution",
  photo: { src: "/images/avatar.jpg", alt: "Bharat Kaushik" },
  ctas: [
    { label: "Download CV", href: "/Bharat_Kaushik_IIMA.pdf", type: "primary" },
    { label: "Email", href: "mailto:bharat.15dck@gmail.com", type: "ghost" },
    { label: "Call", href: "tel:+919953779868", type: "ghost" },
  ],
  affiliations: [
    {
      name: "IIM Ahmedabad",
      url: "https://www.iima.ac.in/",
      logo: { src: "/images/affiliations/iima.png", width: 84, height: 24 },
    },
    {
      name: "CISF",
      url: "https://cisf.gov.in/",
      logo: { src: "/images/affiliations/cisf.png", width: 64, height: 24 },
    },
    {
      name: "MHA",
      url: "https://mha.gov.in/",
      logo: { src: "/images/affiliations/mha.png", width: 64, height: 24 },
    },
    {
      name: "ZS",
      url: "https://www.zs.com/",
      logo: { src: "/images/affiliations/zs.svg", width: 64, height: 24 },
    },
  ],
};