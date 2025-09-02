import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import libre from "libreoffice-convert";
import { List, Template } from "../models/index-models.js";
import puppeteer from "puppeteer";

// export const generateSurat = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // 1.ambil file template docx
//     const list = await List.findByPk(id, {
//       include: [
//         {
//           model: Template,
//           as: "template",
//         },
//       ],
//     });

//     if (!list) {
//       return res.status(404).json({
//         msg: "Data tidak ditemukan",
//       });
//     }

//     if (!list.template) {
//       return res.status(400).json({
//         msg: "Data ini belum memiliki template surat",
//       });
//     }

//     // const templatePath = path.join("public", "templates", "");
//     // 2.filepath
//     const templatePath = path.join(list.template.file_path);
//     const content = fs.readFileSync(templatePath, "binary");

//     // 3.load

//     const zip = new PizZip(content);
//     const doc = new Docxtemplater(zip, {
//       paragraphLoop: true,
//       linebreaks: true,
//       delimiters: { start: "[[", end: "]]" },
//       nullGetter: () => "",
//     });

//     // 4.data yang dimasukkan
//     const dataList = {
//       title: list.title,
//       desciption: list.desciption,
//       status: list.status,
//       user: list.id,
//     };

//     doc.render(dataList);

//     // 5.generate buffer
//     const buff = doc.getZip().generate({
//       type: "nodebuffer",
//     });

//     // 6.convert pdf
//     libre.convert(buff, ".pdf", undefined, (err, done) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ msg: "Gagal Membuat Surat" });
//       }

//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=surat-${id}.pdf`
//       );
//       res.send(done); // ✅ kirim hasil PDF setelah konversi selesai
//     });
//   } catch (error) {
//     console.info(error);
//     return res.status(500).json({
//       msg: "Terjadi kesalahan pada server pada saat mengenerate surat",
//     });
//   }
// };

// import fs from "fs";
// import path from "path";
// import PizZip from "pizzip";
// import Docxtemplater from "docxtemplater";
// import puppeteer from "puppeteer";
// import List from "../models/List.js";
// import Template from "../models/Template.js";
import mammoth from "mammoth"; // buat convert docx → HTML

export const generateSurat = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Cari data list + template
    const list = await List.findByPk(id, {
      include: [{ model: Template, as: "template" }],
    });

    if (!list) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (!list.template) {
      return res
        .status(400)
        .json({ msg: "Data ini belum memiliki template surat" });
    }

    // 2. Ambil template DOCX
    const templatePath = path.join(list.template.file_path);
    const content = fs.readFileSync(templatePath, "binary");

    // 3. Load docx dengan Docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "[[", end: "]]" },
      nullGetter: () => "",
    });

    // 4. Isi data
    const dataList = {
      title: list.title,
      description: list.description,
      status: list.status,
      user: list.id,
    };

    doc.render(dataList);

    // 5. Generate buffer DOCX
    const buff = doc.getZip().generate({ type: "nodebuffer" });
    const tempDocx = path.join("public/tmp", `surat-${id}.docx`);
    fs.writeFileSync(tempDocx, buff);

    // 6. Convert DOCX → HTML (pakai mammoth)
    const htmlResult = await mammoth.convertToHtml({ path: tempDocx });
    const htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8"/>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.5; font-size: 12pt; }
          </style>
        </head>
        <body>${htmlResult.value}</body>
      </html>
    `;

    // 7. Puppeteer → PDF
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // 8. Kirim hasil PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=surat-${id}.pdf`
    );
    res.send(pdfBuffer);

    // Opsional: hapus file temp DOCX
    fs.unlinkSync(tempDocx);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Terjadi kesalahan pada server saat generate surat",
    });
  }
};
