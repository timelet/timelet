import { useEffect, useRef } from 'react';
import { ReactComponent as LogoSVG } from '../assets/logo.svg';

export function Logo() {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if(logoRef.current) {
      const hoursHand = logoRef.current.getElementById("hours-hand");
      const minutesHand = logoRef.current.getElementById("minutes-hand");
    }

  }, [logoRef]);

  return <LogoSVG ref={logoRef} />;
}
