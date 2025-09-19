import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDataStore } from '@/stores/data';
import { formatCurrency, formatDate } from '@/utils/slug';

export default function Deals() {
  const deals = useDataStore((state) => state.deals);

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
              Special Deals
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't miss these limited-time offers! Save big on your next adventure with our exclusive travel deals.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {deals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={deal.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center'}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center';
                      }}
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                      {deal.discount}% OFF
                    </Badge>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Until {formatDate(deal.validUntil)}</span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {deal.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{deal.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg text-gray-500 line-through">
                            {formatCurrency(deal.originalPrice)}
                          </span>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Save {formatCurrency(deal.originalPrice - deal.discountPrice)}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(deal.discountPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full">
                        Book This Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals available</h3>
            <p className="text-gray-600">Check back soon for amazing travel deals!</p>
          </div>
        )}
      </div>
    </div>
  );
}