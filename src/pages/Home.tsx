import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, Star, Users } from 'lucide-react';
import { HeroSearch } from '@/components/HeroSearch';
import { DestinationCard } from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDataStore } from '@/stores/data';
import { formatCurrency } from '@/utils/slug';
import { clearAllData } from '@/utils/storage';

export default function Home() {
  const featuredDestinations = useDataStore((state) => state.getFeaturedDestinations());
  const deals = useDataStore((state) => state.deals);

  console.log('Home page data:', { featuredDestinations: featuredDestinations.length, deals: deals.length });

  const handleReloadData = () => {
    clearAllData();
    window.location.reload();
  };

  const stats = [
    { label: 'Happy Travelers', value: '50,000+', icon: Users },
    { label: 'Destinations', value: '200+', icon: Plane },
    { label: 'Average Rating', value: '4.9/5', icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://picsum.photos/1920/1080?random=500")',
          }}
        />
        <div className="absolute inset-0 hero-bg" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <span className="block text-yellow-400">Travel Destinations</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Explore the world's most beautiful places with our carefully curated travel packages.
              Create memories that last a lifetime.
            </p>
          </motion.div>

          <HeroSearch className="max-w-4xl mx-auto" />

          {/* Temporary debug button */}
          <div className="mt-8">
            <Button onClick={handleReloadData} variant="outline" className="bg-white/20 text-white border-white/50">
              🔄 Reload Data (Debug)
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular travel destinations, handpicked for their beauty,
              culture, and unforgettable experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/destinations">
                View All Destinations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Deals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Special Deals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these limited-time offers for incredible travel experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.slice(0, 3).map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={deal.image || '/placeholder-deal.jpg'}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                      {deal.discount}% OFF
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(deal.originalPrice)}
                        </span>
                        <span className="text-lg font-bold text-primary ml-2">
                          {formatCurrency(deal.discountPrice)}
                        </span>
                      </div>
                      <Button size="sm" asChild>
                        <Link to="/deals">View Deal</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/deals">
                View All Deals
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Newsletter */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new destinations,
              special deals, and travel tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border-0 text-gray-900"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}