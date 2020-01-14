var fs = require("fs");
var PDFDocument = require("pdfkit");
doc = new PDFDocument();
doc.pipe = fs.createWriteStream("output.pdf");
doc
  .font("Times-Roman")
  .fontSize(25)
  .text("Some text with an embedded font!", 100, 100);

doc.image(
  "https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F69386955_249748782612395_805351971962748928_n.jpg%3Foe%3D5E20E5B8%26oh%3D5f1790a2d8cc417bdd13c0071d777816&t=s&u=917070584769%40c.us&i=1570550130",
  {
    fit: [250, 300],
    align: "center",
    valign: "center"
  }
);

doc
  .addPage()
  .fontSize(25)
  .text("Here is some vector graphics...", 100, 100);

doc.end();
