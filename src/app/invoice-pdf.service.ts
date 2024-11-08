// // pdf.service.ts
// import { Injectable } from '@angular/core';
// import { jsPDF } from 'jspdf';
// import { autoTable } from 'jspdf-autotable';
// import { Invoice } from './invoice/invoice.model'; // Ensure you import your Invoice model

// @Injectable({
//   providedIn: 'root'
// })
// export class PdfService {

//   constructor() { }

//   generatePDF(invoiceData: Invoice): void {
//     const doc = new jsPDF();
  
//     // Set Title
//     doc.setFontSize(20);
//     doc.text('Invoice', 14, 20);
  
//     // Add Invoice Details
//     doc.setFontSize(12);
//     const details = [
//       { label: 'Client Name', value: invoiceData.client_name },
//       { label: 'Invoice Number', value: invoiceData.invoice_No },
//       { label: 'Invoice Date', value: invoiceData.invoice_date },
//       { label: 'Due Date', value: invoiceData.invoice_due_date },
//       { label: 'Purchase No', value: invoiceData.purchase_No },
//       { label: 'Purchase Date', value: invoiceData.purchase_date },
//       { label: 'Payment Terms', value: invoiceData.payment_terms },
//       { label: 'Tax Selection On', value: invoiceData.tax_selection_on },
//       { label: 'Export Type', value: invoiceData.export_type },
//       { label: 'Export Currency', value: invoiceData.export_currency },
//       { label: 'Country Supply', value: invoiceData.country_supply },
//       { label: 'Place Supply', value: invoiceData.place_supply },
//       { label: 'Excise Duty', value: invoiceData.excise_duty },
//       { label: 'Advance Payment', value: invoiceData.advance_payment },
//       { label: 'Invoice Type', value: invoiceData.invoice_type },
//     ];
  
//     details.forEach((detail, index) => {
//       doc.text(`${detail.label}: ${detail.value}`, 14, 30 + (index * 10));
//     });
  
//     // Add Table for Items
//     const itemHeaders = [
//       { header: 'Item Name', dataKey: 'item_name' },
//       { header: 'Description', dataKey: 'item_description' },
//       { header: 'HSN/SAC', dataKey: 'hsn_sac' },
//       { header: 'Unit', dataKey: 'item_unit' },
//       { header: 'Quantity', dataKey: 'item_quantity' },
//       { header: 'Price', dataKey: 'item_price' },
//       { header: 'Discount', dataKey: 'item_discount' },
//       { header: 'GST Tax', dataKey: 'tax_cgst_sgst_igst' },
//       { header: 'Shipping Charges', dataKey: 'shipping_charges' },
//     ];
  
//     // Create an array of items for the table
//     const items = [{
//       item_name: invoiceData.item_name,
//       item_description: invoiceData.item_description,
//       hsn_sac: invoiceData.hsn_sac,
//       item_unit: invoiceData.item_unit,
//       item_quantity: invoiceData.item_quantity,
//       item_price: invoiceData.item_price,
//       item_discount: invoiceData.item_discount,
//       tax_cgst_sgst_igst: invoiceData.tax_cgst_sgst_igst,
//       shipping_charges: invoiceData.shipping_charges,
//     }];
  
//     // Format body data for autoTable
//     const bodyData = items.map(item => [
//       item.item_name,
//       item.item_description,
//       item.hsn_sac,
//       item.item_unit,
//       item.item_quantity,
//       item.item_price,
//       item.item_discount,
//       item.tax_cgst_sgst_igst,
//       item.shipping_charges,
//     ]);
  
//     // Call autoTable and get the last position
//     autoTable(doc, {
//       head: [itemHeaders],
//       body: bodyData,
//       startY: 90,
//       theme: 'grid',
//       headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
//       margin: { top: 10 },
//     });
  
//     // Calculate the position after the table
//     const finalY = doc.autoTable.previous.finalY;
  
//     // Add Total Amount
//     doc.text(`Total Amount: ${invoiceData.total}`, 14, finalY + 10);
  
//     // Save the PDF
//     doc.save(`Invoice_${invoiceData.invoice_No}.pdf`);
//   }

// }