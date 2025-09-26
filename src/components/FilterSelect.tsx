type Props = {
  name: string;
}

const FilterSelect = ({ name }: Props) => {
  return (
    <div className="flex rounded-lg border border-grey w-[240px] justify-between py-4 px-3.5">
      <div className="font-roboto text-[16px] text-black-medium">{name}</div>
      <img src="../assets/arrow-down.svg" alt="arrow down" />
    </div>
  )
}

export default FilterSelect