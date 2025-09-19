import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { PackageCard } from '@/components/PackageCard';
import { EmptyState } from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDataStore } from '@/stores/data';

export default function Packages() {
  const packages = useDataStore((state) => state.packages);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [durationFilter, setDurationFilter] = useState<string>('');
  const [hotelFilter, setHotelFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      if (searchQuery && !pkg.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number);
        if (max ? pkg.price < min || pkg.price > max : pkg.price < min) {
          return false;
        }
      }

      if (durationFilter) {
        const duration = parseInt(durationFilter);
        if (pkg.durationDays !== duration) {
          return false;
        }
      }

      if (hotelFilter) {
        const hotel = parseInt(hotelFilter);
        if (pkg.hotelClass !== hotel) {
          return false;
        }
      }

      return true;
    });
  }, [packages, searchQuery, priceFilter, durationFilter, hotelFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Travel Packages
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated travel packages designed to give you the best experience at every destination.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search packages..."
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

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-lg border p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {['', '0-1500', '1500-3000', '3000-5000', '5000'].map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={range}
                          checked={priceFilter === range}
                          onChange={(e) => setPriceFilter(e.target.value)}
                          className="mr-2"
                        />
                        {range === '' ? 'Any Price' :
                         range === '5000' ? '$5,000+' :
                         `$${range.split('-')[0]} - $${range.split('-')[1]}`}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Duration</h3>
                  <div className="space-y-2">
                    {['', '4', '5', '6', '7', '8'].map((duration) => (
                      <label key={duration} className="flex items-center">
                        <input
                          type="radio"
                          name="duration"
                          value={duration}
                          checked={durationFilter === duration}
                          onChange={(e) => setDurationFilter(e.target.value)}
                          className="mr-2"
                        />
                        {duration === '' ? 'Any Duration' : `${duration} days`}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Hotel Class</h3>
                  <div className="space-y-2">
                    {['', '3', '4', '5'].map((hotel) => (
                      <label key={hotel} className="flex items-center">
                        <input
                          type="radio"
                          name="hotel"
                          value={hotel}
                          checked={hotelFilter === hotel}
                          onChange={(e) => setHotelFilter(e.target.value)}
                          className="mr-2"
                        />
                        {hotel === '' ? 'Any Class' : `${hotel} Star`}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </div>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PackageCard package={pkg} showDestination={true} />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="package"
            title="No packages found"
            description="Try adjusting your search criteria or filters."
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchQuery('');
              setPriceFilter('');
              setDurationFilter('');
              setHotelFilter('');
            }}
          />
        )}
      </div>
    </div>
  );
}