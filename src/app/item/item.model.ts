export interface Item {
    id?: number;                  // Optional ID for the item, provided by the backend
    name: string;                // Name of the item
    description: string;         // Description of the item
    salesUnitPrice: number;      // Sales unit price
    currency: string;            // Currency used for pricing
    salesCess: number;           // Sales cess (additional tax or fee)
    purchaseUnitPrice: number;   // Purchase unit price
    purchaseCess: number;        // Purchase cess (additional tax or fee)
    quantity: number;            // Quantity of the item
    unit: string;                // Unit of measurement (e.g., kg, liters)
    tax: string;                 // Tax type or rate
    hsn: string;                 // Harmonized System Nomenclature code
    sku: string;                 // Stock Keeping Unit
  }
  