import React from 'react';
import { useSpring, animated } from 'react-spring';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translate3d(-80px,0,0)' },
    to: { opacity: 1, transform: 'translate3d(0px,0px,0)' },
    delay: delay,
    config: { tension: 280, friction: 60, duration: 2000 }
  });

  return <animated.div style={props}>{children}</animated.div>;
};

export default AnimatedSection;