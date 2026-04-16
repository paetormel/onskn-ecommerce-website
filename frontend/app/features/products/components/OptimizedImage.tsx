import React from "react";

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  wrapperClassName?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  loading = "lazy",
  decoding = "async",
  ...imgProps
}: OptimizedImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${
        wrapperClassName ?? ""
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          className ?? ""
        }`}
        {...imgProps}
      />
    </div>
  );
}