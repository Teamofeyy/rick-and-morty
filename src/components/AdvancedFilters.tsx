const AdvancedFilters = () => {
  return (
    <button className="relative flex w-80 sm:max-md:w-120 h-[56px] items-center justify-center bg-[#E3F2FD] rounded-sm md:hidden mt-4">
      <img
        src="/assets/filter.svg"
        alt=""
        className="absolute left-4"
      />
      <p className="text-primary-accent font-roboto text-sm font-medium uppercase tracking-[1.25px]">
        Advanced Filters
      </p>
    </button>
  );
};

export default AdvancedFilters;