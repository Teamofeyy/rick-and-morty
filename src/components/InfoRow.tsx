import { Link } from "react-router-dom";

type InfoRowProps = {
  label: string;
  value: string;
  secondaryValue?: string;
  to?: string;
};

const rowClassName = "flex justify-between items-center w-full max-w-[413px] border-b border-[#21212114]";

function RowContent({
  label,
  value,
  secondaryValue,
  showArrow,
}: Omit<InfoRowProps, "to"> & { showArrow: boolean }) {
  return (
    <>
      <div>
        <h3 className="dl-heading pt-2 pl-4">{label}</h3>
        <p className={`dl-desc pl-4 ${secondaryValue ? "" : "pb-3"}`}>{value}</p>
        {secondaryValue && <p className="dl-desc pl-4 pb-3">{secondaryValue}</p>}
      </div>
      {showArrow && <img src="/assets/arrow-right.svg" alt="" aria-hidden="true" className="mr-4" />}
    </>
  );
}

export default function InfoRow({ label, value, secondaryValue, to }: InfoRowProps) {
  if (to) {
    return (
      <Link
        to={to}
        className={`${rowClassName} transition-colors hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary-accent focus:outline-none`}
      >
        <RowContent label={label} value={value} secondaryValue={secondaryValue} showArrow />
      </Link>
    );
  }

  return (
    <div className={rowClassName}>
      <RowContent label={label} value={value} secondaryValue={secondaryValue} showArrow={false} />
    </div>
  );
}
