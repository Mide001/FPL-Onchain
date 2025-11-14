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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-purple-600 hover:shadow-md transition-all duration-200 group w-full">
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
            <span className="text-3xl">👤</span>
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-1.5 right-1.5 bg-purple-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
          {price}
        </div>
      </div>
      
      {/* Player Info Section */}
      <div className="p-2">
        <h4 className="font-semibold text-black text-xs mb-0.5 truncate">{name}</h4>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
          <span className="font-medium bg-gray-100 px-1.5 py-0.5 rounded">{position}</span>
          <span className="text-gray-400">•</span>
          <span className="truncate">{team}</span>
        </div>
      </div>
    </div>
  );
};
