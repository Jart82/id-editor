import { jsPDF } from 'jspdf';
import type { Canvas } from 'fabric';

function triggerDownload(dataUrl: string, filename: string): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export function exportCanvasPng(canvas: Canvas, filename: string): void {
  const dataUrl = canvas.toDataURL({ format: 'png', multiplier: 3 });
  triggerDownload(dataUrl, filename);
}

export function exportCardPdf(front: Canvas, back: Canvas, filename: string): void {
  const width = front.width ?? 518;
  const height = front.height ?? 331;
  const frontUrl = front.toDataURL({ format: 'png', multiplier: 3 });
  const backUrl = back.toDataURL({ format: 'png', multiplier: 3 });

  const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [width, height] });
  doc.addImage(frontUrl, 'PNG', 0, 0, width, height);
  doc.addPage([width, height], 'landscape');
  doc.addImage(backUrl, 'PNG', 0, 0, width, height);
  doc.save(filename);
}
