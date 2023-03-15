import { useEffect, useRef, useState } from 'react';
import { useBoolean, useInterval } from 'react-use';
import { ReactComponent as LogoSVG } from '../assets/logo.svg';

export type LogoProps = {
  updateTime?: boolean;
  displayTime?: Date;
};

export function Logo({updateTime = true, displayTime}: LogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const [handsOrigin, setHandsOrigin] = useState<DOMPoint | undefined>(undefined);
  const [hoursHand, setHoursHand] = useState<SVGPathElement | undefined>(undefined);
  const [minutesHand, setMinutesHand] = useState<SVGPathElement | undefined>(undefined);
  const [delay] = useState(60000);
  const [isRunning, toggleIsRunning] = useBoolean(false);

  const updateHandRotation = () => {
    if(hoursHand && minutesHand && handsOrigin) {
      const currentDate = displayTime ?? new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      hoursHand.setAttribute('transform', `rotate(${(360 / 12 * hours) + (360 / 12 / 60 * minutes)} ${handsOrigin.x} ${handsOrigin.y})`);
      minutesHand.setAttribute('transform', `rotate(${360 / 60 * minutes} ${handsOrigin.x} ${handsOrigin.y})`);
    }
  }

  // initialize the clocks hands
  useEffect(() => {
    if(logoRef.current) {
      const originalHoursHand = logoRef.current.getElementById("hours-hand") as SVGPathElement;
      const handsOrigin = originalHoursHand.getPointAtLength(0);
      setHandsOrigin(handsOrigin);
      const hands = logoRef.current.getElementById("hands");
      hands.innerHTML = '';
      const hoursHand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      hoursHand.setAttribute('d', `m${handsOrigin.x} ${handsOrigin.y} v-15`);
      setHoursHand(hoursHand);
      hands.appendChild(hoursHand);

      const minutesHand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      minutesHand.setAttribute('d', `m${handsOrigin.x} ${handsOrigin.y} v-23`);
      setMinutesHand(minutesHand);
      hands.appendChild(minutesHand);
    }

  }, [logoRef]);

  // if the hands are appended, start running
  useEffect(() => {
    if(hoursHand && minutesHand && handsOrigin) {
      toggleIsRunning();
      updateHandRotation();
    }
  }, [hoursHand, minutesHand, handsOrigin]);

  // update hands position
  if(updateTime && !displayTime){
    useInterval(updateHandRotation, isRunning ? delay : null);
  }
  return <LogoSVG ref={logoRef} />;
}
