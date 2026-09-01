import QRCode from 'qrcode';
import { IdCardValues } from '../models/id-card.model';

export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text.trim() || ' ', {
    width: 240,
    margin: 1,
    errorCorrectionLevel: 'M',
  });
}

/** Human-readable summary of what's printed on the card, so scanning the QR
 *  code surfaces the same identity data rather than just a bare ID. */
export function buildQrPayload(values: IdCardValues): string {
  const lines = [
    `Name: ${values.studentName}`,
    `School: ${values.schoolName}`,
    `ID: ${values.studentId}`,
    `Grade: ${values.grade}`,
  ];
  if (values.department) lines.push(`Department: ${values.department}`);
  lines.push(`Year: ${values.studentYear}`);
  if (values.schoolAddress) lines.push(`School Address: ${values.schoolAddress}`);
  return lines.join('\n');
}
