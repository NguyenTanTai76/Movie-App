import { useEffect, useState } from "react";

const ImageComponent = ({
  src,
  width,
  height,
  className = "",
  alt = "Image",
}) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    if (!src) {
      setCurrentSrc(`https://placehold.co/${width}x${height}?text=No Image`);
      return;
    }

    const img = new Image();
    img.src = src;

    const handleLoad = () => setCurrentSrc(src);
    const handleError = () =>
      setCurrentSrc(`https://placehold.co/${width}x${height}?text=No Image`);

    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      // Clean up các sự kiện khi component bị unmount
      img.onload = null;
      img.onerror = null;
    };
  }, [src, width, height]);

  return (
    <img
      src={currentSrc}
      className={`${className} ${currentSrc === src || !src ? "" : "blur-md"}`}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default ImageComponent;
