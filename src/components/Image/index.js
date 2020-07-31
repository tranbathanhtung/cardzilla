import * as React from "react";
import { useEffect, useState, forwardRef, useRef } from "react";

export function useHasImageLoaded(props) {
  const { src, onLoad, onError, enabled = true } = props;
  const isMounted = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!src || !enabled) {
      return;
    }

    const image = new window.Image();
    image.src = src;

    image.onload = (event) => {
      if (isMounted.current) {
        setHasLoaded(true);
        onLoad && onLoad(event);
      }
    };

    image.onerror = (event) => {
      if (isMounted.current) {
        setHasLoaded(false);
        onError && onError(event);
      }
    };
  }, [src, onLoad, onError, enabled]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return hasLoaded;
}

const NativeImage = forwardRef(
  ({ htmlWidth, htmlHeight, alt, ...props }, ref) => (
    <img width={htmlWidth} height={htmlHeight} ref={ref} alt={alt} {...props} />
  ),
);

const Image = forwardRef((props, ref) => {
  const { src, fallbackSrc, onError, onLoad, ignoreFallback, as: Comp = NativeImage, ...rest } = props;

  const hasLoaded = useHasImageLoaded({
    src,
    onLoad,
    onError,
    enabled: !Boolean(ignoreFallback),
  });

  const imageProps = ignoreFallback
    ? { src, onLoad, onError }
    : { src: hasLoaded ? src : fallbackSrc };

  return <Comp ref={ref} {...imageProps} {...rest} />;
});

Image.displayName = "Image";

export default Image;
