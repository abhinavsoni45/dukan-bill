
export interface InventoryItem {
  _id: string;
  id: string;
  group?: string;
  category?: string;
  itemName?: string;
  name?: string;
  barcode?: string;
  totalWeight?: string;
  netWeight?: string;
  purity?: string;
  wastage?: string;
  labourRate?: string;
  extraRs?: string;
  fineWt?: string;
  size?: string;
  huid?: string;
  huidCharge?: string;
  mrp?: string;
  createdAt: Date;
  updatedAt: Date;
}
