'use client'

import Image from 'next/image';

interface PlayerCardProps {
  name: string;
  position: string;
  team: string;
  price: string;
  photo?: string;
  index?: number;
}

export const PlayerCard = ({ name, position, team, price, photo, index = 0 }: PlayerCardProps) => {
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
            <span className="text-2xl">👤</span>
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute bottom-1 left-1 bg-purple-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full shadow-sm">
          {price}
        </div>
      </div>
      
      {/* Player Info Section */}
      <div className="p-1.5">
        <h4 className="font-semibold text-black text-[10px] mb-0.5 truncate">{name}</h4>
        <div className="flex items-center gap-1 text-[9px] text-gray-600">
          <span className="font-medium bg-gray-100 px-1 py-0.5 rounded">{position}</span>
          <span className="text-gray-400">•</span>
          <span className="truncate">{team}</span>
        </div>
      </div>
    </div>
  );
};
