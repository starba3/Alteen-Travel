export interface Offer {
  title: string;
  discount: string;
  description: string;
  validUntil: string;
  image: string;
}

export const offers: Offer[] = [
  {
    title: "Early Bird Summer Special",
    discount: "25% OFF",
    description: "Book your summer vacation early and save big on selected destinations.",
    validUntil: "May 31, 2024",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Family Package Deal",
    discount: "Kids Go Free",
    description: "Children under 12 stay and eat free when sharing with parents.",
    validUntil: "December 31, 2024",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1",
  },
  {
    title: "Luxury Retreat Discount",
    discount: "30% OFF",
    description: "Premium accommodations at participating 5-star resorts.",
    validUntil: "September 30, 2024",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  },
];