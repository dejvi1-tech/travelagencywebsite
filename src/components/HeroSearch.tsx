import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface SearchFilters {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
}

interface HeroSearchProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

export function HeroSearch({ onSearch, className = '' }: HeroSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={className}
    >
      <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Destination
              </label>
              <Input
                id="destination"
                type="text"
                placeholder="Where to?"
                value={filters.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Check-in
              </label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Check-out
              </label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Budget
              </label>
              <select
                id="budget"
                value={filters.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Any budget</option>
                <option value="0-1000">Under $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000+">$5,000+</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button type="submit" size="lg" className="px-8">
              <Search className="w-4 h-4 mr-2" />
              Search Adventures
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}