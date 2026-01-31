import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md animate-pulse">
      {/* Imagen falsa */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
      
      {/* Título falso */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      
      {/* Precio falso */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      
      {/* Botón falso */}
      <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
    </div>
  );
}