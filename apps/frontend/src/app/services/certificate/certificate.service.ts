import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import SpaceGrotesk from '../../../assets/fonts/SpaceGrotesk';
import NotoSans from '../../../assets/fonts/NotoSans';
import * as PDFJS from 'pdfjs-dist';
import { IpfsService } from '../ipfs';
import { concatMap } from 'rxjs';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;
import { v4 as uuidv4 } from 'uuid';
import { PostService } from '../post';
import { LensService } from '../lens';
import { EthersService } from '../ethers';
import { TokenService } from '../token';
import { ACCOUNT_TYPE } from '../../interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(
    private ipfsService: IpfsService,
    private postService: PostService,
    private lensService: LensService,
    private ethersService: EthersService,
    private tokenService: TokenService
  ) {}

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
        doc.setTextColor(34, 38, 52);
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

  async postCertificate(
    participantName: string,
    courseName: string,
    conductor: string,
    participantHandle: string,
    conductorLensId: string
  ) {
    const blob = await this.generatePNGBlobCertificate(
      participantName,
      courseName,
      conductor
    );
    return this.ipfsService.uploadImage(blob).pipe(
      concatMap(({ cid }) => {
        return this.ipfsService.createPost({
          version: '2.0.0',
          mainContentFocus: 'IMAGE',
          description: 'Wagademy Certificate',
          metadata_id: uuidv4(),
          locale: 'en-US',
          image: `ipfs://${cid}`,
          imageMimeType: 'image/png',
          media: [
            {
              item: `ipfs://${cid}`,
              type: 'image/png',
            },
          ],
          name: `@${participantHandle} Certificate`,
          attributes: [
            {
              value: {
                participant: participantName,
                courseName,
                conductor,
              },
            },
          ],
          tags: [ACCOUNT_TYPE.company],
          appId: 'Wagademy',
        });
      }),
      concatMap(({ cid }) =>
        this.postService.createPost(conductorLensId, cid, true)
      )
    );
  }

  async claimCertificate(publicationId: string) {
    const result = await this.lensService.client.mutate({
      mutation: this.lensService.collect,
      variables: {
        request: {
          publicationId,
        },
      },
    });
    const { domain, types, value } =
      result.data!.createCollectTypedData.typedData;
    const signature = await this.ethersService.signedTypeData(
      domain,
      types,
      value
    );
    const { v, r, s } = this.ethersService.splitSignature(signature!);
    return this.lensService.lensHub['collectWithSig'](
      {
        collector: this.tokenService.getWalletAddress(),
        profileId: value.profileId,
        pubId: value.pubId,
        data: value.data,
        sig: {
          v,
          r,
          s,
          deadline: value.deadline,
        },
      },
      { gasLimit: 1000000 }
    );
  }
}
