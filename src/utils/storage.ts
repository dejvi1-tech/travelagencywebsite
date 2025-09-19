import type { Destination, Package, Deal, Testimonial, Order } from '@/types';

const STORAGE_KEYS = {
  DESTINATIONS: 'travel_destinations',
  PACKAGES: 'travel_packages',
  DEALS: 'travel_deals',
  TESTIMONIALS: 'travel_testimonials',
  ORDERS: 'travel_orders',
  CART: 'travel_cart',
  AUTH: 'travel_auth',
  INITIALIZED: 'travel_initialized',
} as const;

// Generic storage helpers
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// Destinations
export function getDestinations(): Destination[] {
  return getFromStorage(STORAGE_KEYS.DESTINATIONS, []);
}

export function saveDestinations(destinations: Destination[]): void {
  saveToStorage(STORAGE_KEYS.DESTINATIONS, destinations);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return getDestinations().find(dest => dest.slug === slug);
}

// Packages
export function getPackages(): Package[] {
  return getFromStorage(STORAGE_KEYS.PACKAGES, []);
}

export function savePackages(packages: Package[]): void {
  saveToStorage(STORAGE_KEYS.PACKAGES, packages);
}

export function getPackagesByDestination(destinationId: string): Package[] {
  return getPackages().filter(pkg => pkg.destinationId === destinationId);
}

export function getPackageById(id: string): Package | undefined {
  return getPackages().find(pkg => pkg.id === id);
}

// Deals
export function getDeals(): Deal[] {
  return getFromStorage(STORAGE_KEYS.DEALS, []);
}

export function saveDeals(deals: Deal[]): void {
  saveToStorage(STORAGE_KEYS.DEALS, deals);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  return getFromStorage(STORAGE_KEYS.TESTIMONIALS, []);
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  saveToStorage(STORAGE_KEYS.TESTIMONIALS, testimonials);
}

// Orders
export function getOrders(): Order[] {
  return getFromStorage(STORAGE_KEYS.ORDERS, []);
}

export function saveOrders(orders: Order[]): void {
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
}

// Cart
export function getCart(): any[] {
  return getFromStorage(STORAGE_KEYS.CART, []);
}

export function saveCart(cart: any[]): void {
  saveToStorage(STORAGE_KEYS.CART, cart);
}

// Auth
export function getAuth(): any {
  return getFromStorage(STORAGE_KEYS.AUTH, null);
}

export function saveAuth(auth: any): void {
  saveToStorage(STORAGE_KEYS.AUTH, auth);
}

export function clearAuth(): void {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
}

// Initialization
export function isInitialized(): boolean {
  return getFromStorage(STORAGE_KEYS.INITIALIZED, false);
}

export function markAsInitialized(): void {
  saveToStorage(STORAGE_KEYS.INITIALIZED, true);
}

// Data export/import
export function exportData(): string {
  const data = {
    destinations: getDestinations(),
    packages: getPackages(),
    deals: getDeals(),
    testimonials: getTestimonials(),
    orders: getOrders(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

export function downloadData(): void {
  const data = exportData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `travel-agency-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importData(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        if (data.destinations) saveDestinations(data.destinations);
        if (data.packages) savePackages(data.packages);
        if (data.deals) saveDeals(data.deals);
        if (data.testimonials) saveTestimonials(data.testimonials);
        if (data.orders) saveOrders(data.orders);

        resolve();
      } catch (error) {
        reject(new Error('Invalid data format'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Clear all data (for testing)
export function clearAllData(): void {
  localStorage.clear();
  console.log('All localStorage data cleared');
}

// Seed data loading
export async function loadSeedData(): Promise<void> {
  if (isInitialized()) {
    console.log('Data already initialized, skipping seed load');
    return;
  }

  try {
    console.log('Loading seed data...');
    const [destinations, packages, deals, testimonials] = await Promise.all([
      fetch('/data/destinations.json').then(r => {
        console.log('Destinations response:', r.status);
        return r.json();
      }),
      fetch('/data/packages.json').then(r => {
        console.log('Packages response:', r.status);
        return r.json();
      }),
      fetch('/data/deals.json').then(r => {
        console.log('Deals response:', r.status);
        return r.json();
      }),
      fetch('/data/testimonials.json').then(r => {
        console.log('Testimonials response:', r.status);
        return r.json();
      }),
    ]);

    console.log('Loaded data:', { destinations: destinations.length, packages: packages.length, deals: deals.length, testimonials: testimonials.length });

    saveDestinations(destinations);
    savePackages(packages);
    saveDeals(deals);
    saveTestimonials(testimonials);
    markAsInitialized();
    console.log('Seed data loaded successfully');
  } catch (error) {
    console.error('Failed to load seed data:', error);
  }
}