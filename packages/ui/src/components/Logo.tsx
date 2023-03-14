import { useEffect, useRef } from 'react';
import { ReactComponent as LogoSVG } from '../assets/logo.svg';

export function Logo() {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if(logoRef.current) {
      logoRef.current.getElementById("hands").remove();
    }

  }, [logoRef]);

  return <LogoSVG ref={logoRef} />;
}
