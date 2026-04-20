"use client";

import { useState, useCallback } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export type Orientation = "portrait" | "landscape";

// Portrait and landscape dimensions (US Letter at 96dpi)
export const PORTRAIT_WIDTH = 816;
export const PORTRAIT_HEIGHT = 1056;
export const LANDSCAPE_WIDTH = 1056;
export const LANDSCAPE_HEIGHT = 816;

export function getDimensions(orientation: Orientation) {
  return orientation === "portrait"
    ? { width: PORTRAIT_WIDTH, height: PORTRAIT_HEIGHT }
    : { width: LANDSCAPE_WIDTH, height: LANDSCAPE_HEIGHT };
}

interface PrintControlsProps {
  orientation: Orientation;
  onOrientationChange: (o: Orientation) => void;
  filename?: string;
}

export default function PrintControls({
  orientation,
  onOrientationChange,
  filename = "printable",
}: PrintControlsProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    const el = document.querySelector(".printable-area") as HTMLElement | null;
    if (!el) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const isLandscape = orientation === "landscape";
      const pdf = new jsPDF({
        orientation: isLandscape ? "landscape" : "portrait",
        unit: "in",
        format: "letter",
      });

      const pageWidth = isLandscape ? 11 : 8.5;
      const pageHeight = isLandscape ? 8.5 : 11;
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save(`${filename}.pdf`);
    } catch {
      // Fallback to browser print dialog
      window.print();
    } finally {
      setDownloading(false);
    }
  }, [orientation, filename]);

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
        <select
          value={orientation}
          onChange={(e) => onOrientationChange(e.target.value as Orientation)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>
      <button
        onClick={() => window.print()}
        className="w-full bg-emerald-600 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
      >
        Print
      </button>
      <button
        onClick={handleDownloadPDF}
        disabled={downloading}
        className="w-full bg-white text-emerald-700 font-medium py-2 px-4 rounded border border-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-50"
      >
        {downloading ? "Generating PDF..." : "Download PDF"}
      </button>
    </>
  );
}
