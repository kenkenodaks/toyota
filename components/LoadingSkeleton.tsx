export function CarCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/5" />
        </div>
        <div className="flex gap-4">
          <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
      <div className="space-y-3">
        <div className="aspect-[16/10] bg-gray-200 rounded-2xl animate-pulse" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-20 h-14 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="space-y-2 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
