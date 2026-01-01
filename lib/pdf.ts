import puppeteer from 'puppeteer';
import QRCode from 'qrcode';

export async function generateSecurePDF(html: string, isPaid: boolean, agreementId: string) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Add watermark if not paid
  const watermarkHtml = !isPaid 
    ? `<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; color: rgba(200, 200, 200, 0.3); z-index: 1000; pointer-events: none; white-space: nowrap;">DRAFT - NOT VALID</div>`
    : '';

  // Generate QR Code for footer
  const qrCodeDataUrl = await QRCode.toDataURL(`https://legalmaster.com/verify/${agreementId}`);

  const fullHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          .footer { position: fixed; bottom: 20px; left: 40px; right: 40px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #666; border-top: 1px solid #eee; padding-top: 10px; }
          .qr-code { width: 60px; height: 60px; }
          /* Flattening: prevent text selection */
          body { user-select: none; -webkit-user-select: none; }
        </style>
      </head>
      <body>
        ${watermarkHtml}
        ${html}
        <div class="footer">
          <div>
            <p>Agreement ID: ${agreementId}</p>
            <p>Generated on: ${new Date().toLocaleDateString('en-GB')}</p>
          </div>
          <img src="${qrCodeDataUrl}" class="qr-code" />
        </div>
      </body>
    </html>
  `;

  await page.setContent(fullHtml);
  
  // Flattening: Take a screenshot of the page and put it back as an image to prevent text selection
  const screenshot = await page.screenshot({ fullPage: true, type: 'jpeg', quality: 90 });
  const base64Image = screenshot.toString('base64');
  
  const imageHtml = `
    <html>
      <body style="margin: 0; padding: 0;">
        <img src="data:image/jpeg;base64,${base64Image}" style="width: 100%; height: auto;" />
      </body>
    </html>
  `;
  
  await page.setContent(imageHtml);

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  return pdf;
}
