import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import { uploadToS3Bucket, IMulterFile } from "./s3Bucket";

export const generateCertificate = async ({
  studentName,
  courseName,
  userId,
  courseId,
}: {
  studentName: string;
  courseName: string;
  userId: string;
  courseId: string;
}): Promise<string> => {
  const buffer = await createCertificatePDF(studentName, courseName);

  const file: IMulterFile = {
    originalname: `certificate-${sanitize(studentName)}-${sanitize(courseName)}.pdf`,
    buffer,
    mimetype: "application/pdf",
  };

  const s3Key = await uploadToS3Bucket(file, `certificates/${userId}/${courseId}`);
  return s3Key;
};

const createCertificatePDF = async (studentName: string, courseName: string): Promise<Buffer> => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = new PassThrough();
  doc.pipe(stream);

  doc.fontSize(28).text("🎓 Certificate of Completion", { align: "center" });
  doc.moveDown();
  doc.fontSize(18).text("This is to certify that", { align: "center" });
  doc.moveDown();
  doc.font("Helvetica-Bold").fontSize(24).text(studentName, { align: "center" });
  doc.moveDown();
  doc.font("Helvetica").fontSize(18).text("has successfully completed the course", { align: "center" });
  doc.moveDown();
  doc.fontSize(22).text(courseName, { align: "center" });
  doc.moveDown(2);
  doc.fontSize(14).text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });



  doc.end();

  return await streamToBuffer(stream);
};


const streamToBuffer = async (stream: NodeJS.ReadableStream): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
};


const sanitize = (str: string): string => str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
