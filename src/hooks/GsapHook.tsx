/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const useGsapAnimation = (
  targetRef: any,
  animationConfig: object,
  dependencies: any = []
) => {
  useEffect(() => {
    if (targetRef?.current) {
      // Apply GSAP animation
      gsap.from(targetRef.current, animationConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef, animationConfig, ...dependencies]);
};

export default useGsapAnimation;
