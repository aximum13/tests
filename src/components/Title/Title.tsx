import Title from 'antd/es/typography/Title';

interface TitleProps {
  title: string;
}

const TitleCmp: React.FC<TitleProps> = ({ title }) => {
  return <Title>{title}</Title>;
};

export default TitleCmp;
