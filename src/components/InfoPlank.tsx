type InfoProps = {
  title: string | undefined;
  desc: string | undefined;
  sndDesc?: string | undefined;
}

const InfoPlank = ({ title, desc, sndDesc }: InfoProps) => {
  return (
    <div className="w-[413px] border-b border-[#21212114]">
      <h3 className="dl-heading pt-2 pl-4">{title}</h3>
      <p className={`dl-desc pl-4 ${sndDesc ? '' : 'pb-3'}`}>{desc}</p>
      {sndDesc && (
        <p className="dl-desc pl-4 pb-3">
          {sndDesc}
        </p>
      )}
    </div>
  )
}

export default InfoPlank