'use client'

import Image from 'next/image';

interface PlayerCardProps {
  name: string;
  position: string;
  team: string;
  price: string;
  photo?: string;
}

export const PlayerCard = ({ name, position, team, price, photo }: PlayerCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-600 transition-all duration-200">
      <div className="flex items-center gap-4">
        {/* Player Photo */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100 relative">
          {photo ? (
            <Image 
              src={photo} 
              alt={name}
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-full object-top"
              style={{ objectPosition: 'top center' }}
              unoptimized
            />
          ) : (
            <span className="text-2xl">👤</span>
          )}
        </div>
        
        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-black text-sm truncate">{name}</h4>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              {price}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="font-medium">{position}</span>
            <span>•</span>
            <span>{team}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

