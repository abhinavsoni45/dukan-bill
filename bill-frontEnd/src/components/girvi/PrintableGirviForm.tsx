import React from "react";
import "./card.css";

export const PrintableGirviForm = React.forwardRef<
  HTMLDivElement,
  { Girvi: any }
>(({ Girvi }, ref) => (
  <div
    ref={ref}
    style={{ padding: 24, backgroundColor: "#fff", color: "#000" }}
  >
    <div className="print-container">
      <div className="form-header">
        <div className="form-title">FORM 'F' (See Rule 12)</div>
        <div className="pawn-ticket-title">PAWN TICKET</div>
      </div>
      <div className="business-header">
        <div className="business-name">RADHA KRISHNA JEWELLERS</div>
        <div className="business-address">
          Pawn Brokers, Main Bazar, HOSPET-583 201. (Vijayanagara Dist.)
        </div>
        <div className="business-address">
          ರಾಧಾಕೃಷ್ಣ ಜ್ಯುವೆಲ್ಲರ್ಸ್, ಪಾನ್ ಬ್ರೋಕರ್ಸ್, ಮೆನ್ ಬಜಾರ್, ಹೊಸಪೇಟೆ-583 201.
          (ವಿಜಯನಗರ ಜಿಲ್ಲೆ)
        </div>
        <div className="proprietor">Prop: Soni NareshKumar Champalal</div>
      </div>

      <div className="top-row">
        <div className="number-section">
          <span>No:</span>
          <span className="underline-field" id="formNumber">
            {Girvi?.number}
          </span>
        </div>

        <div style={{ fontSize: "12px" }}>Thursday Holiday (ಗುರುವಾರ ರಜೆ)</div>

        <div className="date-section">
          <span>Date:</span>
          <span className="underline-field" id="formDate">
            {Girvi?.date}
          </span>
        </div>
      </div>

      <div className="customer-details">
        <div className="detail-row">
          <span className="detail-label">Name & Address of Pawner:</span>
          <span className="detail-value" id="customerName">
            {Girvi?.NameAddress}
          </span>
        </div>

        <div className="kannada-text">ಅಸಮಿ ಹೆಸರು ವಿಳಾಸ:</div>

        <div style={{ margin: "8px 0", fontSize: "12px" }}>
          The following article / articles are pawned with me:
        </div>

        <div className="kannada-text">
          ಕೆಳಗೆ ಕಾಣಿಸಿದ ಸಾಮಾನುಗಳನ್ನು ನಿಮ್ಮಲ್ಲಿ ಇಟ್ಟಿರುತ್ತೇನೆ
        </div>

        <div className="detail-row">
          <span className="detail-label">Amount of Principal Loan:</span>
          <span
            className="underline-field"
            id="principalAmount"
            style={{ minWidth: 80 }}
          >
            {Girvi?.GirviItems[0]?.Value}
          </span>
          <div className="kannada-text">ತೆಗೆದುಕೊಂಡ ರೂಪಾಯಿಗಳು</div>
          <span style={{ marginLeft: 20, fontSize: "12px" }}>
            Rate of Interest charged: 14% ಬಡ್ಡಿ ಧರ:
          </span>
        </div>
        <div className="kannada-text" style={{ marginBottom: 15 }}>
          Time agreed upon for redemption of the articles pledge - 3 ತಿಂಗಳು
        </div>
        <div className="kannada-text">ಒಪ್ಪಿಕೊಂಡ ವಾಯಿದಾ ಕರಾರು</div>
        <div className="kannada-text">
          (ಸಂಜೆ 8 ಗಂಟೆಯ ಮೇಲೆ ಸಾಮಾನು ಕೊಡಲಾಗುವುದಿಲ್ಲ)
        </div>
      </div>

      <table
        className="items-table"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead style={{ borderBottom: "2px solid black" }}>
          <tr>
            <th>
              Amount <br />
              Loan <br />
              <span className="kannada-text">ಸಾಲದ ಮೊತ್ತ</span>
            </th>
            <th>No.</th>
            <th>
              Full & Detailed Description of Articles <br />
              <span className="kannada-text">ಸಾಮಾನುಗಳ ವಿವರ</span>
            </th>
            <th>
              Gross <br />
              Weight <br />
              <span className="kannada-text">ಒಟ್ಟು ತೂಕ</span>
            </th>
            <th>
              Weight <br />
              <span className="kannada-text">ತೂಕ</span> <br />
              Gms. <br />
              <span className="kannada-text">ಗ್ರಾಂ</span>
            </th>
            <th>
              Value <br />
              <span className="kannada-text">ಕಿಮ್ಮತ್ತು</span> <br />
              Rs. <br />
              <span className="kannada-text">ರೂ.</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {Girvi?.GirviItems?.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.amtLoan}</td>
              <td>{index + 1}</td>
              <td className="description-cell">{item.FullDescription}</td>
              <td>{item.grossWt}</td>
              <td>{item.gms}</td>
              <td>{item.Value}</td>
            </tr>
          ))}

          {/* Add extra empty rows to make total 10 */}
          {Array.from({ length: 8 - (Girvi?.GirviItems?.length || 0) }).map(
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
        <tfoot style={{ borderTop: "2px solid black" }} />
      </table>

      <div className="notice-section">
        <div className="notice-text">
          ಸೂಚನೆ: ವಾಯಿದಕ್ಕೆ ಸರಿಯಾಗಿ ಪ್ರತಿ 3 ತಿಂಗಳಿಗೊಮ್ಮೆ ಬಡ್ಡಿ ಕೊಡಬೇಕು
        </div>
        <div className="notice-subtext">
          (ದಿನ 7 ರೊಳಗೆ ಬಡಿ ಸಾರಾಣೊ ಲೆಕ್ಕಿಸುವುದಿಲ್ಲ)
        </div>
      </div>

      <div className="signatures">
        <div className="signature-section">
          <div className="signature-line"></div>
          <div className="signature-label">
            Signature of the
            <br />
            Pawn Brokers or his Agent
          </div>
        </div>

        <div className="signature-section">
          <div className="signature-line"></div>
          <div className="signature-label">
            Signature or
            <br />
            Thumb Impression of the Pawner
          </div>
        </div>
      </div>
    </div>
  </div>
));
