// import React from "react";
// import "./bill.css";

// export const PrintableInvoice = React.forwardRef(
//   ({ bill }: { bill: any }, ref: React.Ref<HTMLDivElement>) => (
//     <div
//       ref={ref}
//       style={{ padding: 24, backgroundColor: "#fff", color: "#000" }}
//     >
//       {/* <div className="header-container">
//         <table className="header-table">
//           <tbody>
//             <tr>
//               <td className="header-logo">
//                 <img src={bill?.company?.logo} alt="Company Logo" />
//               </td>
//               <td className="header-details">
//                 <h2>{bill?.company?.name}</h2>
//                 <p>{bill?.company?.address}</p>
//                 <p>{bill?.company?.phone}</p>
//                 <p>{bill?.company?.email}</p>
//               </td>
//             </tr>
//             <tr>
//               <td colSpan={3}>
//                 <b>Name: </b> {bill?.customer?.name || "N/A"}
//                 <br />
//                 <b>Phone: </b> {bill?.customer?.phone || "N/A"}
//                 <br />
//                 <b>Address: </b> {bill?.customer?.address || "N/A"}
//                 <br />
//                 <b>Bill No: </b> {bill?.billNo || "N/A"}
//                 <br />
//                 <b>PAN No: </b> {bill?.customer?.panNo || "N/A"}
//                 <br />
//               </td>
//               <td colSpan={2}>
//                 <div className="bold center">Original</div>
//                 <br />
//                 <b>Invoice No:</b> {bill?.number}
//                 <br />
//                 <b>Invoice Date:</b> {bill?.date}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Sr. No.</th>
//             <th>
//               Description
//               <br />
//               HUID:
//             </th>
//             <th>HSN Code</th>
//             <th>PCS</th>
//             <th>Gross Wt.</th>
//             <th>Net Wt.</th>
//             <th>Rate</th>
//             <th>Labour</th>
//             <th>Total Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bill?.AllItems?.map((item: any, idx: number) => (
//             <tr key={idx}>
//               <td>{idx + 1}</td>
//               <td>{item?.products}</td>
//               <td>{item?.hsnCode}</td>
//               <td>1</td>
//               <td>{item?.grossWt}</td>
//               <td>{item?.netWt}</td>
//               <td>{item?.ratePerUnit}</td>
//               <td>-</td>
//               <td>{item?.amountRs}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <table>
//         <tbody>
//           <tr>
//             <td className="bold">Total Amount:</td>
//             <td>{bill?.invoiceTotal}</td>
//           </tr>
//         </tbody>
//       </table> */}
//       <div className="invoice-container">
//         <div className="invoice-header">
//           <div className="gstin-section">
//             <div className="gstin-info">
//               <div className="gstin-number">GSTIN No. 29AVAPS2559M1ZX</div>
//               <div className="proprietor">Prop: NARESH KUMAR SONI</div>
//             </div>
//             <div className="sale-invoice">SALE INVOICE</div>
//           </div>
//         </div>
//       </div>

//       <div className="company-header">
//         <div className="logo-section">
//           <div className="logo-circle">
//             <span className="logo-text">SRKJ</span>
//           </div>
//         </div>
//         <div className="company-in fo">
//           <div className="kannada-text">
//             ಶ್ರೀ ರಾಧಾಕೃಷ್ಣ ಜ್ಯುವೆಲರ್ಸ್, ಹೊಸಪೇಟೆ.
//           </div>
//           <div className="company-name">SRI RADHAKRISHNA JEWELLERS</div>
//           <div className="address">Main Bazar, HOSAPETE-583 201.</div>
//           <div className="state-code">State : Karnataka Code: 29</div>
//         </div>
//       </div>
//       <div className="invoice-details">
//         <div className="invoice-number">
//           <span className="label">{bill?.number}</span>
//         </div>
//         <div className="invoice-data">
//           <span className="label">{bill?.date}</span>
//         </div>
//       </div>
//       <div className="customer-name">
//         <span className="label">{bill?.customerName}</span>
//       </div>
//       <div className="invoice-table">
//         <div className="table-header">
//           {/* <div className="col-hsn">{bill?.AllItems[0]?.hsnCode}</div> */}
//           <div className="col-product">{bill?.AllItems[0]?.products}</div>
//           <div className="col-gross">{bill?.AllItems[0]?.grossWt}</div>
//           <div className="col-net">{bill?.AllItems[0]?.Wt}</div>
//           <div className="col-rate">{bill?.AllItems[0]?.ratePerUnit}</div>
//           <div className="col-amount">{bill?.AllItems[0]?.AmountRs}</div>
//         </div>
//       </div>
//       <div className="invoice-footer">
//         <div className="payment-section">
//           <div className="cheque-info">
//             <div className="cheque-no">
//               <span className="label">Cheque No.</span>
//               <span>{bill?.cheque}</span>
//             </div>
//             <div className="bank-name">
//               <span className="label">Bank Name</span>
//               <span>{bill?.bankName}</span>
//             </div>
//             <div className="jurisdiction">Subject to Hosapete Jurisdiction</div>
//           </div>
//         </div>
//       </div>
//       <div className="totals-section">
//         <div className="total-row">
//           <span className="total-label">Total</span>
//           <span className="total">{bill?.AmountRs}</span>
//         </div>
//       </div>
//       <div className="total-row">
//         <span className="total-label">Taxable Value</span>
//         <span>{bill?.taxableValue}</span>
//       </div>
//       <div className="total-row">
//         <span className="total-label">CGST. @ 1.5%</span>
//         <span>{bill?.cgst}</span>
//       </div>
//       <div className="total-row">
//         <span className="total-label">SGST. @ 1.5%</span>
//         <span>{bill?.sgst}</span>
//       </div>
//       <div className="total-row final-total">
//         <span className="total-label">Invoice Total</span>
//         <span>{bill?.invoiceTotal}</span>
//       </div>
//     </div>
//   )
// );

import React from "react";
import "./bill.css";

export const PrintableInvoice = React.forwardRef(
  ({ bill }: { bill: any }, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="invoice-wrapper">
      <div className="top-bar">
        <div>
          <div className="gst">GSTIN No. 29AVAPS2559M1ZX</div>
          <div className="prop">Prop: NARESH KUMAR SONI</div>
        </div>
        <div className="invoice-title">SALE INVOICE</div>
      </div>

      <div className="company-block">
        <div className="logo-circle">SRKJ</div>
        <div className="company-info">
          <div className="kannada">ಶ್ರೀ ರಾಧಾಕ್ಷ್ಣ ಜ್ಯುವೆಲರ್ಸ್, ಹೋಸಪೇಟೆ.</div>
          <div className="name">SRI RADHAKRISHNA JEWELLERS</div>
          <div className="addr">Main Bazar, HOSAPETE-583 201.</div>
          <div className="state">State : Karnataka Code: 29</div>
        </div>
      </div>

      <div className="meta-info">
        <div>
          No. <span className="red">{bill?.number || "__"}</span>
        </div>
        <div>
          Date: <span>{bill?.date || "__________"}</span>
        </div>
      </div>

      <div className="name-line">
        Name: {bill?.customerName || "___________________________"}
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>HSN Code</th>
            <th>Name of Product / Service</th>
            <th>Gross Wt.</th>
            <th>Net Wt.</th>
            <th>RATE Per Unit</th>
            <th>AMOUNT Rs.</th>
          </tr>
        </thead>
        <tbody>
          {bill?.AllItems?.map((item: any, idx: number) => (
            <tr key={idx}>
              <td>{item?.hsnCode || ""}</td>
              <td>{item?.products || ""}</td>
              <td>{item?.grossWt || ""}</td>
              <td>{item?.netWt || ""}</td>
              <td>{item?.ratePerUnit || ""}</td>
              <td>{Math.floor(item?.amountRs || 0)}</td>
            </tr>
          ))}
          {Array.from({ length: 8 - (bill?.AllItems?.length || 0) }).map(
            (_, i) => (
              <tr className="empty-row" key={`empty-${i}`}>
                <td>&nbsp;</td>
                <td></td>
                <td className="description-cell"></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="bottom-section">
        <div className="payment-info">
          <div>Cheque No. ____________________</div>
          <div>Bank Name ______________________</div>
          <div className="jurisdiction">Subject to Hosapete Jurisdiction</div>
        </div>
        <div className="totals">
          <div>
            <span>Total</span>
            <span>{bill?.total || ""}</span>
          </div>
          <div>
            <span>Taxable Value</span>
            <span>{bill?.taxableValue || ""}</span>
          </div>
          <div>
            <span>CGST. @ 1.5%</span>
            <span>{bill?.cgst || ""}</span>
          </div>
          <div>
            <span>SGST. @ 1.5%</span>
            <span>{bill?.sgst || ""}</span>
          </div>
          <div className="bold">
            <span>Invoice Total</span>
            <span>{bill?.invoiceTotal || ""}</span>
          </div>
        </div>
      </div>

      <div className="footer">
        <div></div>
        <div>
          FOR SRI RADHAKRISHNA JEWELLERS
          <div className="signature-line">Signature</div>
        </div>
      </div>
    </div>
  )
);
