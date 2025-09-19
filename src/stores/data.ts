import { create } from 'zustand';
import type { Destination, Package, Deal, Testimonial, Order } from '@/types';
import {
  getDestinations,
  saveDestinations,
  getPackages,
  savePackages,
  getDeals,
  saveDeals,
  getTestimonials,
  getOrders,
  addOrder,
  loadSeedData,
} from '@/utils/storage';

interface DataState {
  // Data
  destinations: Destination[];
  packages: Package[];
  deals: Deal[];
  testimonials: Testimonial[];
  orders: Order[];

  // Loading states
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;

  // Destinations
  addDestination: (destination: Destination) => void;
  updateDestination: (id: string, destination: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;

  // Packages
  addPackage: (pkg: Package) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  deletePackage: (id: string) => void;

  // Deals
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;

  // Orders
  createOrder: (order: Order) => void;

  // Getters
  getDestinationById: (id: string) => Destination | undefined;
  getDestinationBySlug: (slug: string) => Destination | undefined;
  getPackageById: (id: string) => Package | undefined;
  getPackagesByDestination: (destinationId: string) => Package[];
  getFeaturedDestinations: () => Destination[];
  getPopularDestinations: () => Destination[];
}

export const useDataStore = create<DataState>((set, get) => ({
  // Initial state
  destinations: [],
  packages: [],
  deals: [],
  testimonials: [],
  orders: [],
  isLoading: false,
  isInitialized: false,

  // Initialize data
  initialize: async () => {
    set({ isLoading: true });

    try {
      await loadSeedData();

      const destinations = getDestinations();
      const packages = getPackages();
      const deals = getDeals();
      const testimonials = getTestimonials();
      const orders = getOrders();

      set({
        destinations,
        packages,
        deals,
        testimonials,
        orders,
        isInitialized: true,
      });
    } catch (error) {
      console.error('Failed to initialize data:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Destinations
  addDestination: (destination) => {
    const { destinations } = get();
    const newDestinations = [...destinations, destination];
    set({ destinations: newDestinations });
    saveDestinations(newDestinations);
  },

  updateDestination: (id, updates) => {
    const { destinations } = get();
    const newDestinations = destinations.map(dest =>
      dest.id === id ? { ...dest, ...updates } : dest
    );
    set({ destinations: newDestinations });
    saveDestinations(newDestinations);
  },

  deleteDestination: (id) => {
    const { destinations, packages } = get();
    const newDestinations = destinations.filter(dest => dest.id !== id);
    // Also delete related packages
    const newPackages = packages.filter(pkg => pkg.destinationId !== id);

    set({ destinations: newDestinations, packages: newPackages });
    saveDestinations(newDestinations);
    savePackages(newPackages);
  },

  // Packages
  addPackage: (pkg) => {
    const { packages } = get();
    const newPackages = [...packages, pkg];
    set({ packages: newPackages });
    savePackages(newPackages);
  },

  updatePackage: (id, updates) => {
    const { packages } = get();
    const newPackages = packages.map(pkg =>
      pkg.id === id ? { ...pkg, ...updates } : pkg
    );
    set({ packages: newPackages });
    savePackages(newPackages);
  },

  deletePackage: (id) => {
    const { packages } = get();
    const newPackages = packages.filter(pkg => pkg.id !== id);
    set({ packages: newPackages });
    savePackages(newPackages);
  },

  // Deals
  addDeal: (deal) => {
    const { deals } = get();
    const newDeals = [...deals, deal];
    set({ deals: newDeals });
    saveDeals(newDeals);
  },

  updateDeal: (id, updates) => {
    const { deals } = get();
    const newDeals = deals.map(deal =>
      deal.id === id ? { ...deal, ...updates } : deal
    );
    set({ deals: newDeals });
    saveDeals(newDeals);
  },

  deleteDeal: (id) => {
    const { deals } = get();
    const newDeals = deals.filter(deal => deal.id !== id);
    set({ deals: newDeals });
    saveDeals(newDeals);
  },

  // Orders
  createOrder: (order) => {
    const { orders } = get();
    const newOrders = [...orders, order];
    set({ orders: newOrders });
    addOrder(order);
  },

  // Getters
  getDestinationById: (id) => {
    const { destinations } = get();
    return destinations.find(dest => dest.id === id);
  },

  getDestinationBySlug: (slug) => {
    const { destinations } = get();
    return destinations.find(dest => dest.slug === slug);
  },

  getPackageById: (id) => {
    const { packages } = get();
    return packages.find(pkg => pkg.id === id);
  },

  getPackagesByDestination: (destinationId) => {
    const { packages } = get();
    return packages.filter(pkg => pkg.destinationId === destinationId);
  },

  getFeaturedDestinations: () => {
    const { destinations } = get();
    return destinations.filter(dest => dest.popular).slice(0, 6);
  },

  getPopularDestinations: () => {
    const { destinations } = get();
    return destinations
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  },
}));