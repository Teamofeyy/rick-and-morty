type InfoProps = {
  title: string | undefined;
  desc: string | undefined;
  sndDesc?: string | undefined;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

const InfoPlank = ({ title, desc, sndDesc, icon, onClick, className }: InfoProps) => {
  return (
    <div
      className={`flex justify-between items-center w-[413px] border-b border-[#21212114] transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div>
        <h3 className="dl-heading pt-2 pl-4">{title}</h3>
        <p className={`dl-desc pl-4 ${sndDesc ? '' : 'pb-3'}`}>{desc}</p>
        {sndDesc && (
          <p className="dl-desc pl-4 pb-3">
            {sndDesc}
          </p>
        )}
      </div>
      {icon && (
        <img src={icon} alt="" aria-hidden="true" className="pr-4" />
      )}
    </div>
  )
}

export default InfoPlank