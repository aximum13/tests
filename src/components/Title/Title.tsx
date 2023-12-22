import Title from 'antd/es/typography/Title';

interface TitleProps {
  className?: string;
  title: string;
}

const TitleCmp: React.FC<TitleProps> = ({ className, title }) => {
  return <Title className={className}>{title}</Title>;
};

export default TitleCmp;
