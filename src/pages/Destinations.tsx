import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { DestinationCard } from '@/components/DestinationCard';
import { EmptyState } from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDataStore } from '@/stores/data';
import type { FilterState } from '@/types';

export default function Destinations() {
  const destinations = useDataStore((state) => state.destinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      // Search query filter
      if (searchQuery && !destination.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !destination.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !destination.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Region filter
      if (filters.region && destination.region !== filters.region) {
        return false;
      }

      // Price filter
      if (filters.minPrice && destination.priceFrom < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && destination.priceFrom > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.rating && destination.rating < filters.rating) {
        return false;
      }

      return true;
    });
  }, [destinations, searchQuery, filters]);

  const regions = ['Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Middle East'];
  const priceRanges = [
    { label: 'Under $1,000', min: 0, max: 1000 },
    { label: '$1,000 - $2,500', min: 1000, max: 2500 },
    { label: '$2,500 - $5,000', min: 2500, max: 5000 },
    { label: '$5,000+', min: 5000, max: Infinity },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Destinations
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing places around the world. From tropical paradises to cultural treasures,
              find your perfect travel destination.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg border p-6 space-y-6"
            >
              {/* Region Filter */}
              <div>
                <h3 className="font-medium mb-3">Region</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!filters.region ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilters(prev => ({ ...prev, region: undefined }))}
                  >
                    All Regions
                  </Badge>
                  {regions.map((region) => (
                    <Badge
                      key={region}
                      variant={filters.region === region ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, region }))}
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!filters.minPrice && !filters.maxPrice ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))}
                  >
                    Any Price
                  </Badge>
                  {priceRanges.map((range) => (
                    <Badge
                      key={range.label}
                      variant={filters.minPrice === range.min && filters.maxPrice === range.max ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, minPrice: range.min, maxPrice: range.max }))}
                    >
                      {range.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium mb-3">Minimum Rating</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!filters.rating ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilters(prev => ({ ...prev, rating: undefined }))}
                  >
                    Any Rating
                  </Badge>
                  {[4, 4.5, 5].map((rating) => (
                    <Badge
                      key={rating}
                      variant={filters.rating === rating ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, rating }))}
                    >
                      {rating}+ Stars
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </p>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
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
        ) : (
          <EmptyState
            icon="search"
            title="No destinations found"
            description="Try adjusting your search criteria or filters to find more destinations."
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchQuery('');
              setFilters({});
            }}
          />
        )}
      </div>
    </div>
  );
}