import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/RatingStars';
import { formatCurrency } from '@/utils/slug';
import type { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className = '' }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={className}
    >
      <Card className="overflow-hidden h-full group cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img
            src={destination.images[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&crop=center'}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&crop=center';
            }}
          />
          {destination.popular && (
            <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
              Popular
            </Badge>
          )}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
            <RatingStars rating={destination.rating} size="sm" showNumber />
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {destination.country}, {destination.region}
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {destination.name}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {destination.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {destination.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {destination.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{destination.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{destination.durationDays} days</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Best time: {destination.bestTime}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-lg font-semibold">
              {formatCurrency(destination.priceFrom)}
            </span>
            <span className="text-sm text-muted-foreground">from</span>
          </div>

          <Button asChild size="sm">
            <Link to={`/destinations/${destination.slug}`}>
              Explore
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}