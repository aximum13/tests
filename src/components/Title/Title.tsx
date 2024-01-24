import { memo } from 'react';

interface TitleProps {
  className?: string;
  title: string;
}

const Title = ({ className, title }: TitleProps) => {
  return <h1 className={className}>{title}</h1>;
};

export default memo(Title);
