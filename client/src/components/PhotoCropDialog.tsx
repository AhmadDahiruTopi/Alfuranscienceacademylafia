import { useEffect, useState } from "react";
import { Check, Move, RotateCcw, X, ZoomIn } from "lucide-react";

export type CroppedPhoto = { dataBase64: string; fileName: string; contentType: "image/jpeg" };

type PhotoCropDialogProps = {
  file: File;
  title: string;
  onCancel: () => void;
  onComplete: (photo: CroppedPhoto) => void;
};

export function PhotoCropDialog({ file, title, onCancel, onComplete }: PhotoCropDialogProps) {
  const [source, setSource] = useState("");
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSource(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const reset = () => { setZoom(1); setOffsetX(0); setOffsetY(0); };
  const save = () => {
    if (!source) return;
    const image = new Image();
    image.onload = () => {
      const output = document.createElement("canvas");
      output.width = 640;
      output.height = 800;
      const context = output.getContext("2d");
      if (!context) return;
      const cropSize = Math.min(image.naturalWidth, image.naturalHeight);
      const scaledCrop = cropSize / zoom;
      const centerX = image.naturalWidth / 2 - (offsetX / 100) * scaledCrop;
      const centerY = image.naturalHeight / 2 - (offsetY / 100) * scaledCrop;
      const sx = Math.max(0, Math.min(image.naturalWidth - scaledCrop, centerX - scaledCrop / 2));
      const sy = Math.max(0, Math.min(image.naturalHeight - scaledCrop, centerY - scaledCrop / 2));
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, output.width, output.height);
      context.drawImage(image, sx, sy, scaledCrop, scaledCrop, 0, 0, output.width, output.height);
      onComplete({ dataBase64: output.toDataURL("image/jpeg", 0.88).split(",")[1] ?? "", fileName: file.name.replace(/\.[^/.]+$/, "") + "-portrait.jpg", contentType: "image/jpeg" });
    };
    image.src = source;
  };

  return <div className="photo-crop-overlay" role="dialog" aria-modal="true" aria-labelledby="photo-crop-title">
    <section className="photo-crop-dialog">
      <div className="photo-crop-head"><div><p className="eyebrow">Portrait preparation</p><h3 id="photo-crop-title">Crop {title} photo</h3><p className="muted">Center the face inside the portrait frame before saving it to the ID card.</p></div><button className="ghost-icon" onClick={onCancel} aria-label="Close photo crop dialog"><X size={18} /></button></div>
      <div className="photo-crop-stage"><div className="photo-crop-frame"><img src={source} alt="Photo crop preview" style={{ transform: `translate(${offsetX}%, ${offsetY}%) scale(${zoom})` }} /></div><span className="photo-crop-guide">4:5 ID portrait</span></div>
      <div className="photo-crop-controls"><label><ZoomIn size={15} /> Zoom<input aria-label="Photo zoom" type="range" min="1" max="2.5" step="0.05" value={zoom} onChange={event => setZoom(Number(event.target.value))} /></label><label><Move size={15} /> Horizontal<input aria-label="Photo horizontal position" type="range" min="-35" max="35" step="1" value={offsetX} onChange={event => setOffsetX(Number(event.target.value))} /></label><label><Move size={15} /> Vertical<input aria-label="Photo vertical position" type="range" min="-35" max="35" step="1" value={offsetY} onChange={event => setOffsetY(Number(event.target.value))} /></label></div>
      <div className="photo-crop-actions"><button className="filter-button" onClick={reset}><RotateCcw size={15} /> Reset</button><button className="filter-button" onClick={onCancel}>Cancel</button><button className="primary-button" onClick={save} disabled={!source}><Check size={15} /> Save cropped portrait</button></div>
    </section>
  </div>;
}
