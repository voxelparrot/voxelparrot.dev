import { useEffect, useState } from "react";

export default function useImagePreloader(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        setLoaded(true);
      }
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = handleLoad;
      img.onerror = handleLoad;
    });
  }, [imageUrls]);

  return loaded;
}
