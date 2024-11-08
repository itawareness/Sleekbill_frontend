// src/app/invoice/invoice.model.ts

import { Item } from "../item/item.model";

// export interface Invoice {
//     invoice_Id?: number; // Optional since it will be generated on the server
//     client_name: string;
//     invoice_No: number;
//     invoice_date: Date;
//     invoice_due_date: Date;
//     purchase_No?: number;
//     purchase_date?: Date;
//     payment_terms?: string;
//     tax_selection_on?: string;
//     export_type?: string;
//     export_currency?: string;
//     country_supply?: string;
//     place_supply?: string;
//     excise_duty?: number;
//     advance_payment?: string;
//     invoice_type?: string;
//     item_name: string;
//     item_description?: string;
//     hsn_sac?: string;
//     item_unit?: string;
//     item_quantity: number;
//     item_price: number;
//     item_discount?: number;
//     tax_cgst_sgst_igst?: string;
//     shipping_charges?: number;
//     total?: number; // Optional as this is calculated
//   }
  

// invoice.model.ts
export interface Invoice {
 

  invoice_Id?: string;
  client_name: string;
  invoice_No?: number;
  invoice_date: Date; // or Date type
  invoice_due_date: Date; // or Date type
  purchase_No?: number;
  purchase_date?: Date; // or Date type
  payment_terms?: string;
  tax_selection_on?: string;
  export_type?: string;
  export_currency?: string;
  country_supply?: string;
  place_supply?: string;
  excise_duty?: number;
  advance_payment?: string;
  invoice_type?: string;
  item_name: string;
  item_description?: string;
  hsn_sac?: string;
  item_unit?: string;
  item_quantity: number;
  item_price: number;
  item_discount?: number;
  tax_cgst_sgst_igst?: string;
  shipping_charges?: number;
  total?: number;
}


