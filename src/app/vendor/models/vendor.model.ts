export interface Vendor {
    id?: number;
    companyName?: string;
    phone?: string;
    email?: string;
    gstTreatment?: string;
    gstin?: string;
    pan?: string;
    vat?: string;
    website?: string;
    vendorCode?: string;
    useAsClient?: boolean;
    useForDispatch?: boolean;
  }
  

// export class Vendor {
//     id: number;
//     companyName: string;
//     phone: string;
//     email: string;
//     gstTreatment: string;
//     gstin: string;
//     pan: string;
//     vat: string;
//     website: string;
//     vendorCode: string;
//     useAsClient: boolean;
//     useForDispatch: boolean;

//     constructor() {
//         this.id = 0; // Default value
//         this.companyName = ''; // Default value
//         this.phone = ''; // Default value
//         this.email = ''; // Default value
//         this.gstTreatment = ''; // Default value
//         this.gstin = ''; // Default value
//         this.pan = ''; // Default value
//         this.vat = ''; // Default value
//         this.website = ''; // Default value
//         this.vendorCode = ''; // Default value
//         this.useAsClient = false; // Default value
//         this.useForDispatch = false; // Default value
//     }
// }
