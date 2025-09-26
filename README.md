# ID Editor

A modern, responsive web application for designing and generating custom ID cards. Built with Angular, Material Design, and powerful client-side rendering tools.

![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![License](https://img.shields.io/github/license/Jart82/id-editor)

## ✨ Features

- Drag-and-drop editor for positioning text, images, barcodes, and QR codes
- Real-time preview of ID card layout
- Export as PNG or PDF
- Responsive design for desktop and tablet use
- Built with Angular standalone components and Material UI

## 🛠️ Tech Stack

- **Framework**: [Angular v19.2](https://angular.dev)
- **UI Components**: [Angular Material](https://material.angular.io) + [CDK](https://material.angular.io/cdk)
- **Libraries**:
  - `fabric.js` – Canvas-based image and object manipulation
  - `html2canvas` – Render DOM to image
  - `jsPDF` – Generate PDF documents
  - `angularx-qrcode` – QR code generation
  - `ngx-barcode6` – Barcode rendering
- **Styling**: Bootstrap 5

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v20+
- npm v10+

### Installation
```bash
git clone https://github.com/Jart82/id-editor.git
cd id-editor
npm install