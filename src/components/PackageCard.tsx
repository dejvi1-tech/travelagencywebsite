import { motion } from 'framer-motion';
import { Clock, Users, Star, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/slug';
import { useCartStore } from '@/stores/cart';
import { useDataStore } from '@/stores/data';
import type { Package } from '@/types';

interface PackageCardProps {
  package: Package;
  className?: string;
  showDestination?: boolean;
}

export function PackageCard({
  package: pkg,
  className = '',
  showDestination = false
}: PackageCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const getDestinationById = useDataStore((state) => state.getDestinationById);

  const destination = showDestination ? getDestinationById(pkg.destinationId) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(pkg.id);
  };

  const hotelStars = Array.from({ length: pkg.hotelClass }, (_, i) => (
    <Star key={i} className="w-3 h-3 fill-current text-yellow-400" />
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={className}
    >
      <Card className="overflow-hidden h-full group cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {pkg.title}
              </CardTitle>
              {showDestination && destination && (
                <p className="text-sm text-muted-foreground mt-1">
                  {destination.name}, {destination.country}
                </p>
              )}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={handleAddToCart}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{pkg.durationDays} days</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <div className="flex items-center">
                {hotelStars}
                <span className="ml-1">hotel</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {pkg.flightsIncluded && (
              <Badge variant="secondary">Flights Included</Badge>
            )}
            <Badge variant="outline">
              {pkg.hotelClass}-Star Hotel
            </Badge>
          </div>

          <div className="space-y-1">
            <h4 className="font-medium text-sm">Activities included:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {pkg.activities.slice(0, 3).map((activity, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                  {activity}
                </li>
              ))}
              {pkg.activities.length > 3 && (
                <li className="text-primary text-xs font-medium">
                  +{pkg.activities.length - 3} more activities
                </li>
              )}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between">
          <div className="text-left">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(pkg.price)}
            </div>
            <div className="text-xs text-muted-foreground">
              per person
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
            {showDestination && destination && (
              <Button asChild size="sm">
                <Link to={`/destinations/${destination.slug}`}>
                  View Details
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}