import React, { useState, useEffect, useRef } from "react";
import { Printer } from "lucide-react";
import "./MRPLabelForm.css";

const MRPLabelForm = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    group: "",
    category: "",
    itemName: "",
    name: "",
    barcode: "",
    totalWeight: "",
    netWeight: "",
    purity: "",
    wastage: "",
    labourRate: "",
    extraRs: "",
    fineWt: "",
    size: "",
    huid: "",
    huidCharge: "",
    mrp: "",
  });
  const barcodeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Label presets — add TSC TE244 / BarTender profile options here
  const labelPresets: Record<
    string,
    { name: string; widthIn: number; heightIn: number; desc?: string }
  > = {
    custom4_38x0_62: {
      name: "Custom 4.38 x 0.62 in",
      widthIn: 4.38,
      heightIn: 0.62,
    },
    tsc_te244_25x10: {
      name: "TSC TE244 - 25mm x 10mm",
      widthIn: 0.98, // ~25mm in inches
      heightIn: 0.39, // ~10mm in inches
      desc: "Small label for jewelry tags",
    },
    tsc_te244_38x25: {
      name: "TSC TE244 - 38mm x 25mm",
      widthIn: 1.50, // ~38mm in inches
      heightIn: 0.98, // ~25mm in inches
      desc: "Medium label for jewelry tags",
    },
    tsc_te244_50x30: {
      name: "TSC TE244 - 50mm x 30mm",
      widthIn: 1.97, // ~50mm in inches
      heightIn: 1.18, // ~30mm in inches
      desc: "Large label for jewelry tags",
    },
    tsc_te244_8112: {
      name: "TSC TE244 - 8112 (3.19 x 0.47 in)",
      widthIn: 3.19,
      heightIn: 0.47,
      desc: "BarTender/Seagull profile name: 8112",
    },
  };
  const [labelPreset, setLabelPreset] = useState<string>("custom4_38x0_62");

  // Generate barcode using simple pattern
  const generateBarcode = (text: any) => {
    if (!text || !barcodeCanvasRef.current) return;
    const canvas = barcodeCanvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";
    const barWidth = 2;
    const spacing = 1;
    let x = 5;
    for (let i = 0; i < text.length && x < width - 10; i++) {
      const charCode = text.charCodeAt(i);
      const pattern = charCode % 2 === 0 ? [1, 0, 1, 1, 0] : [1, 1, 0, 1, 0];
      for (let p = 0; p < pattern.length && x < width - 10; p++) {
        const bar = pattern[p];
        if (bar === 1) {
          ctx.fillRect(x, 0, barWidth, height);
        }
        x += barWidth + spacing;
      }
    }
  };

  useEffect(() => {
    if (showPreview && formData.barcode) generateBarcode(formData.barcode);
  }, [showPreview, formData.barcode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof typeof prev]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handlePrint = () => {
    const elem =
      document.getElementById("print-label") ||
      document.querySelector(".print-area");
    if (!elem) {
      console.error("No printable element found (#print-label or .print-area)");
      return;
    }

    // Clone the element so we don't modify the page
    const originalElem = elem as HTMLElement;
    const clone = originalElem.cloneNode(true) as HTMLElement;

    // If there is a canvas (barcode), convert it to an image so drawing is preserved
    try {
      const originalCanvas = originalElem.querySelector("canvas");
      if (originalCanvas) {
        const dataUrl = (originalCanvas as HTMLCanvasElement).toDataURL(
          "image/png"
        );
        const clonedCanvas = clone.querySelector("canvas");
        if (clonedCanvas && clonedCanvas.parentNode) {
          const img = document.createElement("img");
          img.src = dataUrl;
          // preserve inline sizing where possible
          const w =
            (originalCanvas as HTMLCanvasElement).style.width ||
            (originalCanvas as HTMLCanvasElement).width + "px";
          const h =
            (originalCanvas as HTMLCanvasElement).style.height ||
            (originalCanvas as HTMLCanvasElement).height + "px";
          img.style.width = w;
          img.style.height = h;
          img.style.display = "block";
          clonedCanvas.parentNode.replaceChild(img, clonedCanvas);
        }
      }
    } catch (err) {
      // non-fatal
      console.warn("Could not convert canvas to image for print:", err);
    }

    // determine page size from preset
    const preset = labelPresets[labelPreset] || labelPresets["custom4_38x0_62"];
    const pageW = preset.widthIn;
    const pageH = preset.heightIn;

    // Build print HTML with exact @page size optimized for TSC printers
    const printHtml = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Print Label</title>
        <style>
          @page {
            size: ${pageW}in ${pageH}in !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: ${pageW}in !important;
            height: ${pageH}in !important;
            overflow: hidden !important;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-family: Arial, sans-serif;
          }
          .print-area {
            width: ${pageW}in !important;
            height: ${pageH}in !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }
        </style>
      </head>
      <body>
        ${clone.outerHTML}
      </body>
      </html>
    `;

    // Open a temporary window for printing
    const w = window.open("", "_blank", "toolbar=0,scrollbars=0,status=0,width=200,height=200");
    if (!w) {
      // fallback
      window.print();
      return;
    }

    w.document.open();
    w.document.write(printHtml);
    w.document.close();
    
    // Give browser a moment to render before printing
    setTimeout(() => {
      try {
        w.focus();
        w.print();
      } catch (e) {
        console.error("Print failed:", e);
        // Fallback to default browser print if direct print fails
        window.print();
      }
      // close the print window after a short delay
      setTimeout(() => w.close(), 1000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 mrp-label-form">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Jewellery MRP Label Generator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="form-section">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Product Details
            </h2>
            <form
              onSubmit={handleSubmit}
              className="form-grid"
            >
              {/* Label preset selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label Preset
                </label>
                <select
                  value={labelPreset}
                  onChange={(e) => setLabelPreset(e.target.value)}
                  className="form-select"
                >
                  {Object.entries(labelPresets).map(([key, p]) => (
                    <option key={key} value={key}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">
                  Choose the printer/label profile (use TSC TE244 - 8112 for
                  your printer).
                </div>
              </div>
              {(Object.keys(formData) as (keyof typeof formData)[]).map(
                (key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      name={key}
                      onChange={handleChange}
                      value={formData[key]}
                      className="form-input"
                    />
                  </div>
                )
              )}

              <div className="mt-6 flex gap-4 col-span-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Generate Preview
                </button>
                {showPreview && (
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <Printer size={1} /> Print Label
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Label Preview
            </h2>
            {showPreview ? (
              <div
                className="flex justify-center items-center"
                style={{ minHeight: "300px" }}
              >
                <div
                  id="print-label"
                  className="print-area"
                  style={{
                    width: `${labelPresets[labelPreset]?.widthIn}in`,
                    height: `${labelPresets[labelPreset]?.heightIn}in`,
                    border: "1px solid #ddd",
                    backgroundColor: "white",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 2mm",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Barcode Section */}
                  <div
                    style={{
                      flex: "0 0 35mm",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: "2mm",
                    }}
                  >
                    <canvas
                      ref={barcodeCanvasRef}
                      width="260"
                      height="40"
                      style={{ width: "30mm", height: "5mm", display: "block" }}
                    />
                    <div
                      style={{
                        fontSize: "6px",
                        fontFamily: "monospace",
                        marginTop: "1px",
                        textAlign: "center",
                      }}
                    >
                      {formData.barcode}
                    </div>
                  </div>

                  {/* Product Info Section */}
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingLeft: "2mm",
                      borderLeft: "1px solid #e0e0e0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "8px",
                        fontWeight: "bold",
                        marginBottom: "1px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {formData.itemName}
                    </div>
                    <div
                      style={{
                        fontSize: "6px",
                        color: "#555",
                        marginBottom: "1px",
                      }}
                    >
                      {formData.purity && `${formData.purity} | `}
                      {formData.netWeight && `${formData.netWeight}g`}
                    </div>
                    <div
                      style={{
                        fontSize: "8px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      MRP: ₹{formData.mrp}
                    </div>
                  </div>

                  {/* Logo Section */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1mm",
                      right: "1mm",
                      width: "6mm",
                      height: "6mm",
                      backgroundColor: "#ffd700",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "5px",
                      fontWeight: "bold",
                      color: "#000",
                      border: "0.5px solid #d4af37",
                    }}
                  >
                    ✦
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex justify-center items-center text-gray-400"
                style={{ minHeight: "300px" }}
              >
                Fill in the details and click "Generate Preview" to see your
                label
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Print only the .print-area as a single page with exact label size */
        @media print {
          /* hide everything first */
          body * { visibility: hidden !important; }

          /* make the print area visible and positioned for printing */
          .print-area, .print-area * { visibility: visible !important; }
          .print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
          }

          /* Ensure fonts/colors are printed accurately */
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          /* Set the exact page size and force landscape if needed in some browsers */
          @page {
            size: ${labelPresets[labelPreset]?.widthIn}in ${labelPresets[labelPreset]?.heightIn}in !important; /* width height */
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MRPLabelForm;
