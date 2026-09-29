import { Link } from "react-router-dom";

type CardProps = {
  image?: string;
  title: string;
  description: string;
  sndDesc?: string;
  to: string;
  className?: string;
}

const Card = ({ image, title, description, sndDesc, to, className }: CardProps) => {
  return (
    <Link
      to={to}
      className={`relative w-[240px] max-w-full flex flex-col rounded-sm bg-white shadow-card-shadow overflow-hidden transition duration-150 ease-out hover:shadow-md active:shadow-sm active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary-accent focus:outline-none ${className ?? ""}`}
    >
      {image && (
        <img
          src={image}
          alt={title}
          width="240"
          height="168"
          loading="lazy"
          className="w-[240px] h-[168px] object-cover object-center"
        />
      )}
      <div className="px-4 py-3">
        <h3 className="text-black-high font-roboto font-medium text-xl leading-6 tracking-[0.15px]">{title}</h3>
        <p className="text-black-medium font-roboto font-normal text-sm leading-6 tracking-[0.25px]">{description}</p>
        {sndDesc && <p className="text-black-medium font-roboto font-normal text-sm leading-6 tracking-[0.25px]">{sndDesc}</p>}
      </div>
    </Link>
  )
}

export default Card
