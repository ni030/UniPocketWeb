interface ImagePreviewProps {
  src: string;
  alt: string;
}

export const ImagePreview = ({ src, alt }: ImagePreviewProps) => {
  return (
    <div className="size-full">
      <img src={src} alt={alt} width={800} height={800} />
    </div>
  );
};
