export type Destination = {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: "Europe" | "Asia" | "Africa" | "Americas" | "Oceania" | "Middle East";
  shortDescription: string;
  description: string;
  images: string[];
  tags: string[];
  bestTime: string;
  priceFrom: number;
  durationDays: number;
  rating: number;
  popular?: boolean;
  coordinates?: { lat: number; lng: number };
  highlights: string[];
  included: string[];
  excluded: string[];
  faq: { q: string; a: string }[];
};

export type Package = {
  id: string;
  slug: string;
  destinationId: string;
  title: string;
  price: number;
  durationDays: number;
  hotelClass: 3 | 4 | 5;
  flightsIncluded: boolean;
  activities: string[];
};

export type Deal = {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  validUntil: string;
  image: string;
  packageId?: string;
  destinationId?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  destinationId?: string;
};

export type CartItem = {
  packageId: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: Array<{
    packageId: string;
    qty: number;
    unitPrice: number;
    title: string;
  }>;
  total: number;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  status: "paid" | "pending";
};

export type User = {
  email: string;
  role: 'admin';
};

export type FilterState = {
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  rating?: number;
  tags?: string[];
  bestTime?: string;
};

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc'
  | 'duration-asc'
  | 'duration-desc';