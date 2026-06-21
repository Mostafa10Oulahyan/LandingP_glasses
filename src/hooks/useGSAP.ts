import { useGSAP as useGSAPReact } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/* Register plugins exactly once, on the client. */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAPReact);
}

export { gsap, ScrollTrigger, SplitText };
export const useGSAP = useGSAPReact;
