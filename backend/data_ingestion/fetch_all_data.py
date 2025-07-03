import requests
import json
import time
from pymongo import MongoClient

# MongoDB setup
MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "financial_data_2"
COLLECTION_NAME = "alpha_vantage_2"

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

ALPHA_VANTAGE_API_KEY = "7I86ULXIXTCSQ4TI"

# Alpha Vantage free tier allows 5 requests per minute
API_REQUESTS_PER_MINUTE = 5
DELAY_BETWEEN_REQUESTS = 60 / API_REQUESTS_PER_MINUTE + 1  # Add buffer

def fetch_alpha_vantage_data(symbol, function):
    base_url = "https://www.alphavantage.co/query"
    params = {
        "function": function,
        "symbol": symbol,
        "apikey": ALPHA_VANTAGE_API_KEY
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    return data

def save_to_mongodb(data, symbol, statement_type):
    data_with_metadata = {
        "symbol": symbol,
        "statement_type": statement_type,
        "data": data
    }
    collection.insert_one(data_with_metadata)

def fetch_and_save(symbol):
    print(f"Fetching data for: {symbol}")
    
    # Fetch and save balance sheet
    balance_sheet = fetch_alpha_vantage_data(symbol, "BALANCE_SHEET")
    save_to_mongodb(balance_sheet, symbol, "BALANCE_SHEET")
    time.sleep(DELAY_BETWEEN_REQUESTS)

    # Fetch and save income statement
    income_statement = fetch_alpha_vantage_data(symbol, "INCOME_STATEMENT")
    save_to_mongodb(income_statement, symbol, "INCOME_STATEMENT")
    time.sleep(DELAY_BETWEEN_REQUESTS)

    # Fetch and save cash flow statement
    cash_flow = fetch_alpha_vantage_data(symbol, "CASH_FLOW")
    save_to_mongodb(cash_flow, symbol, "CASH_FLOW")
    time.sleep(DELAY_BETWEEN_REQUESTS)

# List of 50 company symbols (replace with your actual list)
company_symbols = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "JPM", "V", "JNJ",
    "WMT", "PG", "MA", "UNH", "HD", "DIS", "KO", "PEP", "BAC", "XOM",
    "INTC", "T", "CSCO", "CMCSA", "NFLX", "ORCL", "PFE", "MRK", "NKE", "ADBE",
    "ABT", "CRM", "AVGO", "COST", "QCOM", "MCD", "LLY", "TXN", "NEE", "DHR",
    "WFC", "AMGN", "UPS", "IBM", "BA", "GE", "HON", "MDT", "CVX", "TMO"
]

if __name__ == "__main__":
    for symbol in company_symbols:
        try:
            fetch_and_save(symbol)
            print(f"✓ Data for {symbol} saved successfully.\n")
        except Exception as e:
            print(f"❌ Error fetching data for {symbol}: {e}\n")
