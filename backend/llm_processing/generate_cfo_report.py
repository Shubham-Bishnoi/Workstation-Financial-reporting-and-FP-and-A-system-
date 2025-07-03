from fastapi import APIRouter
from fastapi.responses import FileResponse
from llm_processing.generate_json_report import generate_mock_cfo_summary, generate_all_companies
from llm_processing.generate_pdf_report import generate_pdf_from_json

router = APIRouter()

@router.get("/generate-cfo-report/{symbol}/{year}")
async def generate_cfo_report(symbol: str, year: str):
    report_path = generate_mock_cfo_summary(symbol, year)
    return FileResponse(report_path, media_type="application/json", filename=report_path.split("/")[-1])

@router.get("/generate-cfo-report/pdf/{symbol}/{year}")
async def generate_pdf_report(symbol: str, year: str):
    # Ensure JSON is created before generating PDF
    _ = generate_mock_cfo_summary(symbol, year)
    pdf_path = generate_pdf_from_json(symbol, year)
    return FileResponse(pdf_path, media_type="application/pdf", filename=pdf_path.split("/")[-1])


@router.get("/generate-all-json/{year}")
async def generate_all_json(year: str):
    generate_all_companies(year)
    return {"message": f"All JSON reports for {year} generated successfully."}