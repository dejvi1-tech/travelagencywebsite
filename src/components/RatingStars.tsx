import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className = '',
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const filled = i < Math.floor(rating);
    const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;

    return (
      <div key={i} className="relative">
        <Star
          className={`${sizeClasses[size]} ${
            filled || halfFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
        {halfFilled && (
          <Star
            className={`${sizeClasses[size]} absolute top-0 left-0 text-yellow-400 fill-current`}
            style={{
              clipPath: 'inset(0 50% 0 0)',
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">{stars}</div>
      {showNumber && (
        <span className="text-sm text-muted-foreground ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}