import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Canvas, Circle, FabricImage, FabricObject, Rect, Textbox, Triangle } from 'fabric';
import { CanvasSide, IdCardTemplate, ShapeType } from '../../models/id-card.model';
import { IdCardService } from '../../services/id-card.service';
import { exportCanvasPng, exportCardPdf } from '../../utils/export.util';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('frontCanvas') private frontCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('backCanvas') private backCanvasRef!: ElementRef<HTMLCanvasElement>;

  template!: IdCardTemplate;
  currentView: CanvasSide = 'front';
  selectedObject: FabricObject | null = null;
  ready = false;
  statusMessage = '';
  newShapeType: ShapeType = 'rect';

  private frontCanvas!: Canvas;
  private backCanvas!: Canvas;
  private statusTimer?: ReturnType<typeof setTimeout>;

  constructor(private route: ActivatedRoute, private router: Router, private idCard: IdCardService) {}

  async ngAfterViewInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    let template: IdCardTemplate | undefined;

    if (id && id !== 'new') {
      template = this.idCard.getTemplate(id);
      if (!template) {
        this.router.navigate(['/template']);
        return;
      }
    } else {
      template = this.idCard.createBlankTemplate();
    }
    this.template = template;

    this.frontCanvas = new Canvas(this.frontCanvasRef.nativeElement, {
      width: this.idCard.cardWidth,
      height: this.idCard.cardHeight,
      backgroundColor: template.values.bgColor,
    });
    this.backCanvas = new Canvas(this.backCanvasRef.nativeElement, {
      width: this.idCard.cardWidth,
      height: this.idCard.cardHeight,
      backgroundColor: template.values.bgColor,
    });

    await this.idCard.hydrateCanvas(this.frontCanvas, this.template, 'front');
    await this.idCard.hydrateCanvas(this.backCanvas, this.template, 'back');

    this.bindSelection(this.frontCanvas, 'front');
    this.bindSelection(this.backCanvas, 'back');

    this.ready = true;
  }

  ngOnDestroy(): void {
    clearTimeout(this.statusTimer);
    this.frontCanvas?.dispose();
    this.backCanvas?.dispose();
  }

  private bindSelection(canvas: Canvas, side: CanvasSide): void {
    canvas.on('selection:created', (e) => { this.selectedObject = e.selected?.[0] ?? null; });
    canvas.on('selection:updated', (e) => { this.selectedObject = e.selected?.[0] ?? null; });
    canvas.on('selection:cleared', () => { this.selectedObject = null; });
    canvas.on('object:modified', () => this.idCard.persistCanvasSnapshot(canvas, this.template, side));
  }

  private get activeCanvas(): Canvas {
    return this.currentView === 'front' ? this.frontCanvas : this.backCanvas;
  }

  private renderAndPersist(): void {
    this.activeCanvas.requestRenderAll();
    this.idCard.persistCanvasSnapshot(this.activeCanvas, this.template, this.currentView);
  }

  private showStatus(msg: string): void {
    this.statusMessage = msg;
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { this.statusMessage = ''; }, 2000);
  }

  changeView(view: CanvasSide): void {
    this.currentView = view;
    this.frontCanvas.discardActiveObject();
    this.backCanvas.discardActiveObject();
    this.frontCanvas.requestRenderAll();
    this.backCanvas.requestRenderAll();
    this.selectedObject = null;
  }

  // --- Selected-object panel bindings -------------------------------------

  // Detection is based on the fabric object's own class rather than our
  // `data` tag, so free-form elements the user adds (which aren't tied to
  // any template field) still get the right panel controls.
  get selectedIsText(): boolean {
    return this.selectedObject instanceof Textbox;
  }

  get selectedIsImage(): boolean {
    return this.selectedObject instanceof FabricImage;
  }

  get selectedIsShape(): boolean {
    return this.selectedObject instanceof Rect || this.selectedObject instanceof Circle || this.selectedObject instanceof Triangle;
  }

  get textValue(): string {
    return (this.selectedObject as Textbox)?.text ?? '';
  }
  set textValue(value: string) {
    if (!this.selectedObject) return;
    const fieldKey = this.selectedObject.data?.fieldKey;
    if (fieldKey) {
      // Tracked template field — go through the single write path so
      // values/QR stay in sync.
      void this.idCard.updateField(this.frontCanvas, this.backCanvas, this.template, fieldKey, value);
    } else {
      // Free-form text the user added — just mutate it directly.
      (this.selectedObject as Textbox).set('text', value);
      this.renderAndPersist();
    }
  }

  get fontSize(): number {
    return (this.selectedObject as Textbox)?.fontSize ?? 16;
  }
  set fontSize(value: number) {
    if (!this.selectedObject) return;
    (this.selectedObject as Textbox).set('fontSize', Number(value));
    this.renderAndPersist();
  }

  get fontColor(): string {
    const fill = (this.selectedObject as Textbox)?.fill;
    return typeof fill === 'string' ? fill : '#000000';
  }
  set fontColor(value: string) {
    if (!this.selectedObject) return;
    this.selectedObject.set('fill', value);
    this.renderAndPersist();
  }

  get textAlign(): string {
    return (this.selectedObject as Textbox)?.textAlign ?? 'left';
  }
  set textAlign(value: string) {
    if (!this.selectedObject) return;
    (this.selectedObject as Textbox).set('textAlign', value);
    this.renderAndPersist();
  }

  get rotation(): number {
    return this.selectedObject?.angle ?? 0;
  }
  set rotation(value: number) {
    if (!this.selectedObject) return;
    this.selectedObject.set('angle', Number(value));
    this.renderAndPersist();
  }

  get shapeFill(): string {
    const fill = this.selectedObject?.fill;
    return typeof fill === 'string' ? fill : '#cccccc';
  }
  set shapeFill(value: string) {
    if (!this.selectedObject) return;
    this.selectedObject.set('fill', value);
    this.renderAndPersist();
  }

  get opacity(): number {
    return this.selectedObject?.opacity ?? 1;
  }
  set opacity(value: number) {
    if (!this.selectedObject) return;
    this.selectedObject.set('opacity', Number(value));
    this.renderAndPersist();
  }

  onImageFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.selectedObject) return;

    const fieldKey = this.selectedObject.data?.fieldKey;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (fieldKey) {
        void this.idCard.updateField(this.frontCanvas, this.backCanvas, this.template, fieldKey, dataUrl);
      } else {
        void (this.selectedObject as FabricImage).setSrc(dataUrl).then(() => this.renderAndPersist());
      }
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  bringToFront(): void {
    if (!this.selectedObject) return;
    this.activeCanvas.bringObjectToFront(this.selectedObject);
    this.renderAndPersist();
  }

  sendToBack(): void {
    if (!this.selectedObject) return;
    this.activeCanvas.sendObjectToBack(this.selectedObject);
    this.renderAndPersist();
  }

  deleteSelected(): void {
    if (!this.selectedObject) return;
    this.activeCanvas.remove(this.selectedObject);
    this.activeCanvas.discardActiveObject();
    this.selectedObject = null;
    this.renderAndPersist();
  }

  // --- Card-level bindings -------------------------------------------------

  get bgColor(): string {
    return this.template.values.bgColor;
  }
  set bgColor(value: string) {
    this.template.values.bgColor = value;
    this.frontCanvas.backgroundColor = value;
    this.backCanvas.backgroundColor = value;
    this.frontCanvas.requestRenderAll();
    this.backCanvas.requestRenderAll();
    this.idCard.persistCanvasSnapshot(this.frontCanvas, this.template, 'front');
    this.idCard.persistCanvasSnapshot(this.backCanvas, this.template, 'back');
  }

  // --- Actions ---------------------------------------------------------------

  addText(): void {
    this.selectedObject = this.idCard.addTextElement(this.activeCanvas);
    this.idCard.persistCanvasSnapshot(this.activeCanvas, this.template, this.currentView);
  }

  addShape(shape: ShapeType): void {
    this.selectedObject = this.idCard.addShapeElement(this.activeCanvas, shape);
    this.idCard.persistCanvasSnapshot(this.activeCanvas, this.template, this.currentView);
  }

  async addWatermark(): Promise<void> {
    this.selectedObject = await this.idCard.addWatermark(this.activeCanvas, this.template, this.currentView);
  }

  async randomize(): Promise<void> {
    await this.idCard.applyRandomValues(this.frontCanvas, this.backCanvas, this.template);
    this.frontCanvas.discardActiveObject();
    this.backCanvas.discardActiveObject();
    this.selectedObject = null;
    this.showStatus('Randomized!');
  }

  saveTemplate(): void {
    const currentId = this.route.snapshot.paramMap.get('id');
    const saved = this.idCard.saveTemplate(this.template);
    this.template = saved;
    if (saved.id !== currentId) {
      this.router.navigate(['/editor', saved.id], { replaceUrl: true });
    }
    this.showStatus('Saved!');
  }

  downloadPng(side: CanvasSide): void {
    const canvas = side === 'front' ? this.frontCanvas : this.backCanvas;
    exportCanvasPng(canvas, `${this.template.name || 'id-card'}-${side}.png`);
  }

  downloadPdf(): void {
    exportCardPdf(this.frontCanvas, this.backCanvas, `${this.template.name || 'id-card'}.pdf`);
  }
}
