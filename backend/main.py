from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm_processing.generate_cfo_report import router as cfo_router

app = FastAPI(
    title="AI-Powered CFO Report Generator",
    description="Generates JSON and PDF reports for 50+ public companies",
    version="1.0.0"
)

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your React domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all report generation routes
app.include_router(cfo_router)

@app.get("/")
def root():
    return {"message": "Financial Reporting API is running 🎯"}
