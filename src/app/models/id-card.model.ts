export type FieldKey =
  | 'schoolLogo'
  | 'studentName'
  | 'schoolName'
  | 'studentYear'
  | 'studentId'
  | 'grade'
  | 'department'
  | 'schoolAddress'
  | 'studentPhoto'
  | 'signature'
  | 'schoolWaterMark'
  | 'qrCode'
  | 'returnMessage';

export type FieldType = 'text' | 'image' | 'qrcode';

export interface FabricObjectData {
  fieldKey: FieldKey;
  fieldType: FieldType;
}

// Module augmentation: every fabric object gets a typed `data` property so we
// can find "which ID-card field is this?" after loadFromJSON, and so
// canvas.toObject(['data']) round-trips it.
declare module 'fabric' {
  interface FabricObject {
    data?: FabricObjectData;
  }
}

/** Flat, human-editable values. Single source of truth for "what does the
 *  card say" — used to seed a fresh canvas and by the Randomize feature. */
export interface IdCardValues {
  schoolLogo: string;
  studentName: string;
  schoolName: string;
  studentYear: string;
  studentId: string;
  grade: string;
  department?: string;
  schoolAddress: string;
  studentPhoto: string;
  signature: string;
  schoolWaterMark: string;
  bgColor: string;
  returnMessage: string;
}

export type CanvasSide = 'front' | 'back';

export type ShapeType = 'rect' | 'circle' | 'triangle';

export interface IdCardTemplate {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  values: IdCardValues;
  /** fabric `canvas.toObject(['data'])` snapshot, null until first built */
  front: Record<string, unknown> | null;
  back: Record<string, unknown> | null;
  isBuiltIn?: boolean;
}
