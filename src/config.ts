export const config = {
  ADMIN_EMAIL: 'admin@local',
  ADMIN_PASSWORD: 'admin123',
  APP_NAME: 'Travel Agency',
  APP_DESCRIPTION: 'Discover amazing travel destinations and book your perfect vacation',
  CONTACT_EMAIL: 'contact@travelagency.com',
  CONTACT_PHONE: '+1 (555) 123-4567',
  SOCIAL_LINKS: {
    facebook: 'https://facebook.com/travelagency',
    twitter: 'https://twitter.com/travelagency',
    instagram: 'https://instagram.com/travelagency',
  },
  CURRENCY: {
    symbol: '$',
    code: 'USD',
  },
  MAX_CART_QUANTITY: 10,
} as const;