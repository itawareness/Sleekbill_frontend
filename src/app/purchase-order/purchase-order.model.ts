export interface PurchaseOrderItem {
    id: number;
    itemName: string;
    description: string;
    unit: string;
    quantity: number;
    price: number;
    discount: number;
    tax: string;

   
}

export interface PurchaseOrder {
    id: number;
    vendorName: string;
    orderNumber: string;
    orderDate: Date;
    validUntil: Date;
    items: PurchaseOrderItem[];

  
}
