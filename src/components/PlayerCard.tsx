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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-purple-600 hover:shadow-lg transition-all duration-200 group">
      {/* Player Photo Section */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
        {photo ? (
          <Image 
            src={photo} 
            alt={name}
            fill
            className="object-cover object-top"
            style={{ objectPosition: 'top center' }}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">👤</span>
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
          {price}
        </div>
      </div>
      
      {/* Player Info Section */}
      <div className="p-4">
        <h4 className="font-semibold text-black text-base mb-1 truncate">{name}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="font-medium bg-gray-100 px-2 py-0.5 rounded">{position}</span>
          <span className="text-gray-400">•</span>
          <span className="truncate">{team}</span>
        </div>
      </div>
    </div>
  );
};
