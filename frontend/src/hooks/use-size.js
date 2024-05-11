import { useEffect, useState } from "react";
import { SIZES } from "@/components/size-selector/sizes";

const useSize = (sizeName = "large") => {
  const [size, setSize] = useState(undefined);
  const [lastSize, setLastSize] = useState("");

  useEffect(() => {
    const getSizeName = localStorage.getItem("size");

    if (getSizeName) {
      setLastSize(getSizeName);

      const newSize = SIZES.get(getSizeName);
      setSize(newSize);
    } else {
      updateSize(sizeName);
    }
  }, [sizeName]);

  const updateSize = (value) => {
    const newSize = SIZES.get(value);
    if (value) {
      localStorage.setItem("size", value);
      setLastSize(value);
    }
    setSize(newSize);
  };

  return [size, lastSize, updateSize];
};

export default useSize;
