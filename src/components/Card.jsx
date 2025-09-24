import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = true,
  padding = 'default',
  ...props 
}, ref) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg transition-shadow duration-300';
  const hoverClasses = hover ? 'hover:shadow-xl' : '';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };
  
  const classes = `${baseClasses} ${hoverClasses} ${paddings[padding]} ${className}`;
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;