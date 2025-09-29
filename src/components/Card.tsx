type CardProps = {
  image?: string;
  title: string;
  description: string;
  sndDesc?: string;
  onClick: () => void;
  className?: string;
}

const Card = ({ image, title, description, sndDesc, onClick, className }: CardProps) => {
  return (
    <div
      className={` relative max-w-[240px] flex flex-col rounded-sm bg-white shadow-card-shadow overflow-hidden cursor-pointer transition duration-150 ease-out hover:shadow-md active:shadow-sm active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary-accent focus:outline-none ${className || ""}`}
      onClick={onClick}
      aria-label={title}
    >
      {image && <img src={image} alt={title} className="w-[240px] max-h-[168px] object-cover object-center" />}
      <div className="px-4 py-3">
        <h3 className="text-black-high font-roboto font-medium text-xl leading-6 tracking-[0.15px]">{title}</h3>
        <p className="text-black-medium font-roboto font-normal text-sm leading-6 tracking-[0.25px]">{description}</p>
        {sndDesc && <p className="text-black-medium font-roboto font-normal text-sm leading-6 tracking-[0.25px]">{sndDesc}</p>}
      </div>
    </div >
  )
}

export default Card