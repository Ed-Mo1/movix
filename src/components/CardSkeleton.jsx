const CardSkeleton = () => {
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl">
        <div className="bg-blackLight before:absolute rounded-3xl before:inset-0 before:bg-gradient-to-r before:w-full before:h-full before:from-transparent before:z-30 before:rounded-3xl before:via-blackLighter/50 before:to-transparent aspect-[1/1.5] before:animate-[cardSkeleton_1.5s_ease-in-out_infinite]"></div>
      </div>
      <div className="flex flex-col gap-2 mt-4 overflow-hidden">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="bg-blackLight w-full h-4 before:absolute before:inset-0 before:bg-gradient-to-r before:w-full before:h-full before:from-transparent before:z-30 before:rounded-3xl before:via-blackLighter/50 before:to-transparent aspect-[1/1.5] rounded-3xl before:animate-[cardSkeleton_1.5s_ease-in-out_infinite] "></div>
        </div>
        <div className="relative w-[70%] overflow-hidden rounded-3xl">
          <div className="bg-blackLight w-full h-4 before:absolute before:inset-0 before:bg-gradient-to-r  before:w-full before:h-full before:from-transparent before:z-30 before:rounded-3xl before:via-blackLighter/50 before:to-transparent aspect-[1/1.5] rounded-3xl before:animate-[cardSkeleton_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
