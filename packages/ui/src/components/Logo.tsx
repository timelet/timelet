import { useInterval } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as LogoSVG } from "../assets/logo.svg";

export type LogoProps = {
  className?: string;
  /**
   * Sets the clocks time
   */
  displayTime?: string;
};

export function Logo({ className, displayTime }: LogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const [handsOrigin, setHandsOrigin] = useState<DOMPoint | undefined>(undefined);
  const [hoursHand, setHoursHand] = useState<SVGPathElement | undefined>(undefined);
  const [minutesHand, setMinutesHand] = useState<SVGPathElement | undefined>(undefined);
  const interval = useInterval(() => updateHandRotation(), 60000);

  const updateHandRotation = () => {
    if (hoursHand && minutesHand && handsOrigin) {
      const currentDate = displayTime ? new Date(parseInt(displayTime)) : new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      hoursHand.setAttribute("transform", `rotate(${(360 / 12) * hours + (360 / 12 / 60) * minutes} ${handsOrigin.x} ${handsOrigin.y})`);
      minutesHand.setAttribute("transform", `rotate(${(360 / 60) * minutes} ${handsOrigin.x} ${handsOrigin.y})`);
    }
  };

  // initialize the clocks hands origin
  useEffect(() => {
    if (logoRef.current && !handsOrigin) {
      const originalHoursHand = logoRef.current.getElementById("hours-hand") as SVGPathElement;
      const handsOrigin = originalHoursHand.getPointAtLength(0);
      setHandsOrigin(handsOrigin);
    }
  }, [logoRef]);

  // update hands position
  useEffect(() => {
    if (logoRef.current && handsOrigin) {
      const hands = logoRef.current.getElementById("hands");
      hands.innerHTML = "";
      const hoursHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hoursHand.setAttribute("d", `m${handsOrigin.x} ${handsOrigin.y} v-15`);
      setHoursHand(hoursHand);
      hands.appendChild(hoursHand);

      const minutesHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
      minutesHand.setAttribute("d", `m${handsOrigin.x} ${handsOrigin.y} v-23`);
      setMinutesHand(minutesHand);
      hands.appendChild(minutesHand);
    }
  }, [handsOrigin]);

  // if the hands are appended, start running
  useEffect(() => {
    if (hoursHand && minutesHand && handsOrigin && !displayTime) {
      interval.start();
      updateHandRotation();
    }
  }, [hoursHand, minutesHand, handsOrigin]);

  // update hands when display time is changed
  useEffect(() => {
    interval.stop();
    updateHandRotation();
  }, [displayTime]);

  return <LogoSVG className={className} ref={logoRef} />;
}
