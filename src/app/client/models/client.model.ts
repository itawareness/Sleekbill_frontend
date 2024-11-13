

export interface Client {
    id: number;
    companyName: string;
    phone: string;
    email: string;
    gstTreatment: string;
    gstin: string;
    pan: string;
    tin: string;
    vat: string;
    website: string;
    useAsVendor: boolean;

    selected?: boolean; // Default value is false

  }
  