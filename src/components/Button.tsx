import Image from "next/image";

type ButtonProps={
    type:'button' | 'submit';
    title: string;
    icon?: string;
    variant: string;
    click?: ()=>void;
    full?: boolean;
}
const Button = ({type,title,icon,variant,click}: ButtonProps) => {
  return (
    <button 
      className={`flexCenter gap-3 rounded-full border ${variant}`}
      type={type}
      onClick={click}
      >
        {icon && <Image src={icon} alt={title} width={24} height={24} />}
        <label className="bold-16 whitespace-nowrap">{title}</label>
    </button>
  )
}

export default Button
