import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }





  validateItemName(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[a-zA-Z\s-]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }


  
  validateCurrency(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[A-Z]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }



  validateSalesUnitPrice(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[0-9]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }

  
  validateSalesCess(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[0-9]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }


  
  validatePurchasaeUnitPrice(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[0-9]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }



  validatePurchaseCess(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[0-9]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }

  
  validateQuantity(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[0-9]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }

   
  validateUnit(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[a-zA-Z\s-]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }



   
  validateTax(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[0-9]+$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }


   
  validateHSN(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[A-Z0-9]{6}$|^[A-Z0-9]{8}$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }



   
  validateSKU(control:any)
  {
    const itemName = control.value;
  if (!itemName) {
    return { required: true };
  } else if (!/^[A-Z0-9]{6,12}$/.test(itemName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
  }



  
validateCompanyName(control: any) {
  const companyName = control.value;
  if (!companyName) {
    return { required: true };
  } else if (!/^[a-zA-Z\s-]+$/.test(companyName)) {
    return { pattern: true }; // Only alphabets, spaces, and hyphens are allowed
  }
  return null;
}

validatePhone(control: any) {
  const phone = control.value;
  if (!phone) {
    return { required: true };
  } else if (!/^\d{10}$/.test(phone)) {
    return { pattern: true }; // Phone number must be exactly 10 digits
  }
  return null;
}

validateEmail(control: any) {
  const email = control.value;
  if (!email) {
    return { required: true };
  } else if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|rediffmail\.com)$/.test(email)) {
    return { pattern: true }; // Only specific email domains allowed
  }
  return null;
}

validateGSTIN(control: any) {
  const gstin = control.value;
  if (!gstin) {
    return { required: true };
  } else if (!/^[0-9A-Z]{15}$/.test(gstin)) {
    return { pattern: true }; // Invalid GSTIN format
  }
  return null;
}

validatePAN(control: any) {
  const pan = control.value;
  if (!pan) {
    return { required: true };
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
    return { pattern: true }; // Invalid PAN format
  }
  return null;
}

validateTIN(control: any) {
  const tin = control.value;
  if (!tin) {
    return { required: true };
  } else if (!/^\d{11}$/.test(tin)) {
    return { pattern: true }; // TIN must be exactly 11 digits
  }
  return null;
}

validateVAT(control: any) {
  const vat = control.value;
  if (!vat) {
    return { required: true };
  } else if (!/^\d{2}-\d{10}-VAT$/.test(vat)) {
    return { pattern: true }; // VAT must be numeric
  }
  return null;
}

validateWebsite(control: any) {
  const website = control.value;
  if (website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
.test(website)) {
    return { pattern: true }; // Invalid website format
  }
  return null;
}



}
