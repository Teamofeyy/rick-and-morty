type CardSkeletonProps = {
  variant?: "character";
};

const CardSkeleton = ({ variant }: CardSkeletonProps) => {
  return (
    <div className="relative w-[240px] max-w-full flex flex-col rounded-sm bg-white shadow-card-shadow overflow-hidden">
      {variant === "character" ? (
        <>
          <div className="w-[240px] h-[168px] bg-gray-200 animate-pulse" />
          <div className="px-4 py-3">
            <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-[240px] h-[128px] px-4 py-3">
          <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;
