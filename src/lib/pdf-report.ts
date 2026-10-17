import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import type { ToolReportData } from "./types";
import { BRAND } from "./brand";

const REPORT_TITLE = `${BRAND.product} - Confidential Report`;

export async function downloadStrategyReport(
  data: ToolReportData,
  captureElement?: HTMLElement | null
): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  const addLine = (text: string, size = 11, bold = false) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
    if (y + lines.length * 6 > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, margin, y);
    y += lines.length * 6 + 2;
  };

  doc.setFillColor(5, 150, 105);
  doc.rect(0, 0, pageWidth, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(REPORT_TITLE, margin, 18);

  doc.setTextColor(30, 41, 59);
  y = 40;
  addLine(data.toolName, 16, true);
  addLine(
    `Prepared by ${BRAND.name} · Generated on ${new Date().toLocaleDateString("en-US", { dateStyle: "long" })}. For professional use only.`,
    9
  );

  if (captureElement) {
    try {
      const canvas = await html2canvas(captureElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      if (y + imgHeight > 270) {
        doc.addPage();
        y = 20;
      }
      doc.addImage(imgData, "PNG", margin, y, imgWidth, Math.min(imgHeight, 120));
      y += Math.min(imgHeight, 120) + 8;
    } catch {
      /* text-only fallback */
    }
  }

  y += 4;
  addLine("Audit Results", 13, true);
  Object.entries(data.results).forEach(([key, value]) => {
    addLine(`${formatKey(key)}: ${String(value)}`, 10);
  });

  y += 4;
  addLine("Health Score", 13, true);
  const barWidth = pageWidth - margin * 2;
  const barHeight = 8;
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(margin, y, barWidth, barHeight, 2, 2, "F");
  const fillWidth = (data.healthScore / 100) * barWidth;
  doc.setFillColor(5, 150, 105);
  doc.roundedRect(margin, y, fillWidth, barHeight, 2, 2, "F");
  y += barHeight + 8;
  addLine(`Score: ${data.healthScore}/100`, 12, true);

  y += 4;
  addLine("Next Steps — Personal Recommendations", 13, true);
  data.nextSteps.forEach((step, i) => {
    addLine(`${i + 1}. ${step}`, 10);
  });

  y += 8;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`© ${BRAND.year} ${BRAND.product}.`, margin, y);

  const filename = `${data.toolName.replace(/\s+/g, "-").toLowerCase()}-strategy-report.pdf`;
  doc.save(filename);
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
