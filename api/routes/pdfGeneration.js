var fs= require("fs");
var pdfkit= require("pdfkit");
doc = new PDFDocument
doc.pipe fs.createWriteStream('output.pdf')
doc.font('fonts/PalatinoBold.ttf')
   .fontSize(25)
   .text('Some text with an embedded font!', 100, 100);
 
doc.image('path/to/image.png', {
   fit: [250, 300],
   align: 'center',
   valign: 'center'
});
 
doc.addPage()
   .fontSize(25)
   .text('Here is some vector graphics...', 100, 100)
 
doc.end()