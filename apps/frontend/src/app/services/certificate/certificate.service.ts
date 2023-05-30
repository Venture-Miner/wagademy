import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import SpaceGrotesk from '../../../assets/fonts/SpaceGrotesk';
import NotoSans from '../../../assets/fonts/NotoSans';
import * as PDFJS from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private generateCertificate(
    participant: string,
    courseName: string,
    conductor: string
  ) {
    return new Promise<jsPDF>((resolve, reject) => {
      const img = new Image();
      const doc = new jsPDF();
      doc.internal.pageSize.width = 696;
      doc.internal.pageSize.height = 491;
      doc.addFileToVFS('SpaceGrotesk.ttf', SpaceGrotesk);
      doc.addFont('SpaceGrotesk.ttf', 'SpaceGrotesk', 'bold');
      doc.addFileToVFS('NotoSans.ttf', NotoSans);
      doc.addFont('NotoSans.ttf', 'NotoSans', 'regular');
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      const dateOfConclusion = mm + '/' + dd + '/' + yyyy;
      img.onload = () => {
        doc.addImage(img, 0, 0, 696, 491);
        doc.setFontSize(70);
        doc.setTextColor(0, 80, 30);
        doc.setFont('SpaceGrotesk', 'bold');
        doc.text(participant, doc.internal.pageSize.width / 2, 235, {
          align: 'center',
        });
        doc.setFont('NotoSans', 'regular');
        doc.setFontSize(35);
        doc.setTextColor(99, 100, 97);
        doc.text(
          doc.splitTextToSize(
            `This certifies that ${participant} has successfully completed the ${courseName} course conducted by ${conductor} on ${dateOfConclusion}. This achievement is a testament to their dedication, commitment, and passion for personal and professional growth.`,
            500
          ),
          doc.internal.pageSize.width / 2,
          270,
          {
            lineHeightFactor: 1.5,
            align: 'center',
          }
        );
        doc.setFontSize(30);
        doc.setTextColor(16, 24, 2);
        doc.text(conductor, 168, 440, {
          align: 'center',
        });
        resolve(doc);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = '../../assets/img/certificate.png';
    });
  }

  generatePDFCertificate(
    participant: string,
    courseName: string,
    conductor: string
  ) {
    this.generateCertificate(participant, courseName, conductor).then((doc) => {
      doc.save('Certificate');
    });
  }

  async generatePNGBlobCertificate(
    participant: string,
    courseName: string,
    conductor: string
  ) {
    const doc = await this.generateCertificate(
      participant,
      courseName,
      conductor
    );
    const pdfBlob = doc.output('arraybuffer');
    const loadingTask = PDFJS.getDocument({ data: pdfBlob }).promise;
    const pdf = await loadingTask;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
  }

  postCertificate() {}
}
