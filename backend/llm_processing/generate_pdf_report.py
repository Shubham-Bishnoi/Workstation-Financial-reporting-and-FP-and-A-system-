import json
import os
from fpdf import FPDF
from llm_processing.generate_chart import generate_bar_chart

class CFOReportPDF(FPDF):
    def header(self):
        self.set_font("Arial", "B", 14)
        self.cell(0, 10, "CFO-Ready Financial Report", ln=True, align="C")
        self.ln(5)

    def section_title(self, title):
        self.set_font("Arial", "B", 12)
        self.set_text_color(0, 0, 128)
        self.cell(0, 10, title.replace("_", " "), ln=True)
        self.set_text_color(0, 0, 0)

    def section_content(self, content):
        self.set_font("Arial", "", 11)
        self.multi_cell(0, 8, content)
        self.ln(2)

def generate_pdf_from_json(symbol: str, year: str):
    json_path = f"data/reports/{symbol}_{year}_cfo_report.json"
    pdf_path = f"data/reports/{symbol}_{year}_cfo_report.pdf"

    if not os.path.exists(json_path):
        raise FileNotFoundError("JSON report not found. Please generate it first.")

    with open(json_path, "r") as f:
        report_data = json.load(f)

    pdf = CFOReportPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Page 1: Executive Summary + Budget vs Actual
    for section in [
        "Executive_Summary", 
        "Budget_vs_Actual_Analysis"
    ]:
        if section in report_data:
            pdf.section_title(section)
            content = report_data[section]
            if isinstance(content, dict):
                for key, value in content.items():
                    pdf.section_content(f"{key}: {value}")
            elif isinstance(content, str):
                pdf.section_content(content)

    # Page 2: Chart Visualization
    chart_path = generate_bar_chart(symbol)
    pdf.add_page()
    pdf.image(chart_path, x=10, y=20, w=pdf.w - 20)
    pdf.ln(100)
    pdf.set_font("Arial", "I", 10)
    pdf.cell(0, 10, "Chart: Revenue vs Expenses (5-Year)", ln=True, align="C")

    # Remaining Sections
    for section in [
        "Income_Statement",
        "Balance_Sheet",
        "Cash_Flow_Statement",
        "Statement_of_Shareholders_Equity",
        "Notes_to_Financial_Statements",
        "Key_Performance_Indicators",
        "Management_Discussion_and_Analysis",
        "Audit_Report",
        "Financial_Ratios_and_Analysis",
        "Tax_Considerations",
        "Management_Financial_Strategy"
    ]:
        if section in report_data:
            pdf.add_page()
            pdf.section_title(section)
            content = report_data[section]
            if isinstance(content, dict):
                for key, value in content.items():
                    if isinstance(value, dict):
                        pdf.section_content(f"{key}:")
                        for sub_key, sub_val in value.items():
                            pdf.section_content(f"  {sub_key}: {sub_val}")
                    else:
                        pdf.section_content(f"{key}: {value}")
            elif isinstance(content, str):
                pdf.section_content(content)

    pdf.output(pdf_path)
    return pdf_path
