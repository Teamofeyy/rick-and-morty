
type CardProps = {
  image?: string;
  title: string;
  description: string;
  onClick: () => void;
}

const Card = ({ image, title, description, onClick }: CardProps) => {
  return (
    <article onClick={onClick} className=" relative max-w-[240px] flex flex-col rounded-sm bg-white shadow-card-shadow overflow-hidden cursor-pointer">
      <img src={image} alt={title} className="w-[240px] max-h-[168px] object-cover object-center" />
      <div className="px-4 py-3">
        <h3 className="text-black-high font-roboto font-medium text-xl leading-6 tracking-[0.15px]">{title}</h3>
        <p className="text-black-medium font-roboto font-normal text-sm leading-6 tracking-[0.25px]">{description}</p>
      </div>
    </article>
  )
}

export default Card