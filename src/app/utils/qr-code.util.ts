import QRCode from 'qrcode';

export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text.trim() || ' ', {
    width: 240,
    margin: 1,
    errorCorrectionLevel: 'M',
  });
}
