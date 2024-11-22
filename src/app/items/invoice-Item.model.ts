// invoice.model.ts

export interface InvoiceItem {
    itemName: string;
    description: string;
    hsnSac: string;
    itemQuantity: number;
    itemPrice: number;
    itemDiscount: number;
    itemGst: number;
    total: number;
    
  }
  
  export interface InvoiceModel {
    clientId:number;
    invoiceNo: string;
    invoiceDate: Date;
    dueDate: Date;
    poNo: string;
    poDate: Date;
    paymentTerms: string;
    termsAndConditions: string;
    privateNotes: string;
    items: InvoiceItem[];
  }
  