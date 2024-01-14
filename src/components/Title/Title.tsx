interface TitleProps {
  className?: string;
  title: string;
}

const TitleCmp: React.FC<TitleProps> = ({ className, title }) => {
  return <h1 className={className}>{title}</h1>;
};

export default TitleCmp;
