import { Injectable } from '@angular/core';
import { Canvas, FabricImage, Textbox } from 'fabric';
import { CanvasSide, FieldKey, IdCardTemplate, IdCardValues } from '../models/id-card.model';
import { generateQrDataUrl } from '../utils/qr-code.util';
import { generateRandomIdCardValues } from '../utils/random-data.util';

const CARD_WIDTH = 518;
const CARD_HEIGHT = 331;

const BLANK_VALUES: IdCardValues = {
  schoolLogo: 'assets/school-logo.jpg',
  studentName: 'Student Name',
  schoolName: 'School Name',
  studentYear: String(new Date().getFullYear()),
  studentId: '000000',
  grade: 'Grade',
  schoolAddress: 'School Address',
  studentPhoto: 'assets/avatar.svg',
  signature: 'assets/signature.png',
  schoolWaterMark: 'assets/schoolwatermark.jpg',
  bgColor: '#ffffff',
  returnMessage: 'If found, return to school authorities.',
};

function buildBuiltIns(): IdCardTemplate[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'builtin-1',
      name: 'ID Template 1',
      createdAt: now,
      updatedAt: now,
      isBuiltIn: true,
      front: null,
      back: null,
      values: {
        schoolLogo: 'assets/school-logo.jpg',
        studentName: 'Abraham John',
        schoolName: 'Springfield High',
        studentYear: '2025',
        studentId: '12345',
        grade: '10th Grade',
        schoolAddress: '123 School St, City',
        studentPhoto: 'assets/serious-young-african-man-standing-isolated.jpg',
        signature: 'assets/signature.png',
        schoolWaterMark: 'assets/schoolwatermark.jpg',
        bgColor: '#ffffff',
        returnMessage: 'If found, return to school authorities.',
      },
    },
    {
      id: 'builtin-2',
      name: 'ID Template 2',
      createdAt: now,
      updatedAt: now,
      isBuiltIn: true,
      front: null,
      back: null,
      values: {
        schoolLogo: 'assets/school-logo.jpg',
        studentName: 'Harry Maguire',
        schoolName: 'Federal University of Benin',
        studentYear: '2025',
        studentId: '12345',
        grade: '200 Level',
        department: 'Pharmacy',
        schoolAddress: '123 School St, City',
        studentPhoto: 'assets/closeup-young-female-professional-making-eye-contact-against-colored-background.jpg',
        signature: 'assets/signature.png',
        schoolWaterMark: 'assets/schoolwatermark.jpg',
        bgColor: '#ffffff',
        returnMessage: 'If found, return to school authorities.',
      },
    },
  ];
}

/** Fields rendered in ALL CAPS on the card, matching the original design. */
const UPPERCASE_FIELDS: ReadonlySet<FieldKey> = new Set(['schoolName', 'schoolAddress', 'grade', 'studentName']);

/** Values-backed fields that Randomize iterates over (qrCode is derived, not stored). */
const VALUE_FIELDS: FieldKey[] = [
  'schoolLogo', 'studentName', 'schoolName', 'studentYear', 'studentId',
  'grade', 'department', 'schoolAddress', 'studentPhoto', 'signature',
  'schoolWaterMark', 'returnMessage',
];

@Injectable({ providedIn: 'root' })
export class IdCardService {
  private readonly storageKey = 'id-editor:templates';
  private readonly builtIns = buildBuiltIns();

  readonly cardWidth = CARD_WIDTH;
  readonly cardHeight = CARD_HEIGHT;

  listTemplates(): IdCardTemplate[] {
    return [...this.builtIns, ...this.loadUserTemplates()];
  }

  getTemplate(id: string): IdCardTemplate | undefined {
    return this.listTemplates().find((t) => t.id === id);
  }

  createBlankTemplate(): IdCardTemplate {
    const now = new Date().toISOString();
    return {
      id: crypto.randomUUID(),
      name: 'Untitled Card',
      createdAt: now,
      updatedAt: now,
      values: { ...BLANK_VALUES },
      front: null,
      back: null,
    };
  }

  saveTemplate(template: IdCardTemplate): IdCardTemplate {
    const templates = this.loadUserTemplates();
    let toSave = template;
    if (template.isBuiltIn) {
      toSave = { ...template, id: crypto.randomUUID(), isBuiltIn: false, name: `${template.name} (copy)` };
    }
    toSave.updatedAt = new Date().toISOString();

    const idx = templates.findIndex((t) => t.id === toSave.id);
    if (idx !== -1) templates[idx] = toSave;
    else templates.push(toSave);

    localStorage.setItem(this.storageKey, JSON.stringify(templates));
    return toSave;
  }

  private loadUserTemplates(): IdCardTemplate[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async hydrateCanvas(canvas: Canvas, template: IdCardTemplate, side: CanvasSide): Promise<void> {
    const json = template[side];
    if (json) {
      await canvas.loadFromJSON(json);
      canvas.requestRenderAll();
      return;
    }
    if (side === 'front') await this.buildFrontLayout(canvas, template.values);
    else await this.buildBackLayout(canvas, template.values);
    this.persistCanvasSnapshot(canvas, template, side);
  }

  persistCanvasSnapshot(canvas: Canvas, template: IdCardTemplate, side: CanvasSide): void {
    template[side] = canvas.toObject(['data']);
  }

  findFieldObject(canvas: Canvas, fieldKey: FieldKey) {
    return canvas.getObjects().find((o) => o.data?.fieldKey === fieldKey);
  }

  /** The one place that ever writes a field's content — manual edits, image
   *  replacement, and Randomize all go through this so they can't drift out
   *  of sync the way the old saveChanges()/onDragEnd() pair did. */
  async updateField(canvas: Canvas, template: IdCardTemplate, side: CanvasSide, fieldKey: FieldKey, value: string): Promise<void> {
    const obj = this.findFieldObject(canvas, fieldKey);
    if (obj) {
      if (obj.data?.fieldType === 'text') {
        (obj as Textbox).set('text', this.displayValue(fieldKey, value));
      } else if (obj instanceof FabricImage) {
        await obj.setSrc(value, { crossOrigin: 'anonymous' });
      }
      canvas.requestRenderAll();
    }
    this.setValue(template.values, fieldKey, value);

    if (fieldKey === 'studentId' || fieldKey === 'studentName') {
      const qrObj = this.findFieldObject(canvas, 'qrCode');
      if (qrObj instanceof FabricImage) {
        const qrDataUrl = await generateQrDataUrl(template.values.studentId || template.values.studentName);
        await qrObj.setSrc(qrDataUrl, { crossOrigin: 'anonymous' });
        canvas.requestRenderAll();
      }
    }

    this.persistCanvasSnapshot(canvas, template, side);
  }

  async applyRandomValues(frontCanvas: Canvas, backCanvas: Canvas, template: IdCardTemplate): Promise<void> {
    const values = generateRandomIdCardValues();
    for (const key of VALUE_FIELDS) {
      const value = this.getValue(values, key);
      await this.updateField(frontCanvas, template, 'front', key, value);
      await this.updateField(backCanvas, template, 'back', key, value);
    }
  }

  private displayValue(fieldKey: FieldKey, value: string): string {
    return UPPERCASE_FIELDS.has(fieldKey) ? value.toUpperCase() : value;
  }

  private getValue(values: IdCardValues, fieldKey: FieldKey): string {
    switch (fieldKey) {
      case 'schoolLogo': return values.schoolLogo;
      case 'studentName': return values.studentName;
      case 'schoolName': return values.schoolName;
      case 'studentYear': return values.studentYear;
      case 'studentId': return values.studentId;
      case 'grade': return values.grade;
      case 'department': return values.department ?? '';
      case 'schoolAddress': return values.schoolAddress;
      case 'studentPhoto': return values.studentPhoto;
      case 'signature': return values.signature;
      case 'schoolWaterMark': return values.schoolWaterMark;
      case 'returnMessage': return values.returnMessage;
      case 'qrCode': return values.studentId || values.studentName;
    }
  }

  private setValue(values: IdCardValues, fieldKey: FieldKey, value: string): void {
    switch (fieldKey) {
      case 'schoolLogo': values.schoolLogo = value; break;
      case 'studentName': values.studentName = value; break;
      case 'schoolName': values.schoolName = value; break;
      case 'studentYear': values.studentYear = value; break;
      case 'studentId': values.studentId = value; break;
      case 'grade': values.grade = value; break;
      case 'department': values.department = value; break;
      case 'schoolAddress': values.schoolAddress = value; break;
      case 'studentPhoto': values.studentPhoto = value; break;
      case 'signature': values.signature = value; break;
      case 'schoolWaterMark': values.schoolWaterMark = value; break;
      case 'returnMessage': values.returnMessage = value; break;
      case 'qrCode': break;
    }
  }

  private addText(canvas: Canvas, text: string, fieldKey: FieldKey, options: Record<string, any> = {}): Textbox {
    const box = new Textbox(text, { fontSize: 16, fill: '#000000', ...options });
    box.data = { fieldKey, fieldType: 'text' };
    canvas.add(box);
    return box;
  }

  private async addImage(canvas: Canvas, src: string, fieldKey: FieldKey, options: Record<string, any> = {}): Promise<FabricImage> {
    const img = await FabricImage.fromURL(src, { crossOrigin: 'anonymous' }, options);
    img.data = { fieldKey, fieldType: fieldKey === 'qrCode' ? 'qrcode' : 'image' };
    canvas.add(img);
    return img;
  }

  private async buildFrontLayout(canvas: Canvas, values: IdCardValues): Promise<void> {
    canvas.backgroundColor = values.bgColor || '#ffffff';

    this.addText(canvas, this.displayValue('schoolName', values.schoolName), 'schoolName', {
      left: this.cardWidth / 2, top: 10, originX: 'center', width: 460, textAlign: 'center', fontSize: 20, fontWeight: 'bold',
    });
    this.addText(canvas, this.displayValue('schoolAddress', values.schoolAddress), 'schoolAddress', {
      left: this.cardWidth / 2, top: 60, originX: 'center', width: 460, textAlign: 'center', fontSize: 11, fill: '#333333',
    });

    const photo = await this.addImage(canvas, values.studentPhoto, 'studentPhoto', { left: 24, top: 95 });
    photo.scaleToWidth(110);
    if (photo.getScaledHeight() > 150) photo.scaleToHeight(150);

    this.addText(canvas, this.displayValue('grade', values.grade), 'grade', {
      left: this.cardWidth / 2, top: 100, originX: 'center', width: 280, textAlign: 'center', fontSize: 14, fontWeight: 'bold',
    });

    const logo = await this.addImage(canvas, values.schoolLogo, 'schoolLogo', { left: 420, top: 95 });
    logo.scaleToWidth(70);

    this.addText(canvas, values.studentYear, 'studentYear', {
      left: 455, top: 170, originX: 'center', width: 100, textAlign: 'center', fontSize: 12,
    });

    this.addText(canvas, this.displayValue('studentName', values.studentName), 'studentName', {
      left: this.cardWidth / 2, top: 288, originX: 'center', width: 480, textAlign: 'center', fontSize: 22, fontWeight: 'bold',
    });

    canvas.requestRenderAll();
  }

  private async buildBackLayout(canvas: Canvas, values: IdCardValues): Promise<void> {
    canvas.backgroundColor = values.bgColor || '#ffffff';

    const qrDataUrl = await generateQrDataUrl(values.studentId || values.studentName);
    const qr = await this.addImage(canvas, qrDataUrl, 'qrCode', { left: this.cardWidth / 2, top: 25, originX: 'center' });
    qr.scaleToWidth(120);

    this.addText(canvas, values.returnMessage, 'returnMessage', {
      left: this.cardWidth / 2, top: 170, originX: 'center', fontSize: 13, textAlign: 'center', width: 420,
    });

    const label = new Textbox('Authorized Signature', {
      left: this.cardWidth / 2, top: 250, originX: 'center', width: 200, textAlign: 'center', fontSize: 11, fill: '#666666',
    });
    canvas.add(label);

    const sig = await this.addImage(canvas, values.signature, 'signature', { left: this.cardWidth / 2, top: 265, originX: 'center' });
    sig.scaleToHeight(40);

    canvas.requestRenderAll();
  }
}
