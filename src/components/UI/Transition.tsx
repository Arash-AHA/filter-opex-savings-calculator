
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type TransitionProps = {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  animation?: 
    | 'fade-in' 
    | 'slide-in-left' 
    | 'slide-in-right' 
    | 'scale-in' 
    | 'none';
  delay?: number;
  duration?: number;
  unmountOnExit?: boolean;
};

const Transition: React.FC<TransitionProps> = ({
  children,
  className,
  show = true,
  animation = 'fade-in',
  delay = 0,
  duration = 300,
  unmountOnExit = false,
}) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      // Small delay to ensure DOM update before animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      if (unmountOnExit) {
        const timer = setTimeout(() => {
          setShouldRender(false);
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [show, duration, unmountOnExit]);

  if (!shouldRender) return null;

  const getAnimationClass = () => {
    if (animation === 'none') return '';
    if (animation === 'fade-in') return isVisible ? 'opacity-100' : 'opacity-0';
    if (animation === 'slide-in-left') return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0';
    if (animation === 'slide-in-right') return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0';
    if (animation === 'scale-in') return isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0';
    return '';
  };

  const styles: React.CSSProperties = {
    transition: `all ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      className={cn(getAnimationClass(), className)}
      style={styles}
    >
      {children}
    </div>
  );
};

export default Transition;
