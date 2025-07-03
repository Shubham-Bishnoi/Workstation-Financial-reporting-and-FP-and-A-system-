# from pymongo import MongoClient
# import pandas as pd
# import os

# # 🔹 Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["financial_data_2"]
# collection = db["alpha_vantage_2"]

# # 🔹 Output folder for CSVs
# output_folder = "financial_csv_exports"
# os.makedirs(output_folder, exist_ok=True)

# def fetch_financial_data(symbol, statement_type):
#     """
#     Fetches annual financial data for a given symbol and statement type (Balance Sheet, Income, Cash Flow)
#     """
#     document = collection.find_one(
#         {"symbol": symbol, "statement_type": statement_type},
#         {"_id": 0, "data.annualReports": 1}
#     )

#     if not document:
#         print(f"⚠️ No data found for {symbol} - {statement_type}")
#         return None

#     annual_reports = document.get("data", {}).get("annualReports", [])
#     df = pd.DataFrame(annual_reports)

#     if df.empty:
#         print(f"⚠️ Empty report for {symbol} - {statement_type}")
#         return None

#     df["symbol"] = symbol
#     df.rename(columns={"fiscalDateEnding": "Year"}, inplace=True)
#     df["Year"] = pd.to_datetime(df["Year"])

#     return df

# # 🔹 List of 50 company symbols
# company_symbols = [
#     "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "JPM", "V", "JNJ",
#     "WMT", "PG", "MA", "UNH", "HD", "DIS", "KO", "PEP", "BAC", "XOM",
#     "INTC", "T", "CSCO", "CMCSA", "NFLX", "ORCL", "PFE", "MRK", "NKE", "ADBE",
#     "ABT", "CRM", "AVGO", "COST", "QCOM", "MCD", "LLY", "TXN", "NEE", "DHR",
#     "WFC", "AMGN", "UPS", "IBM", "BA", "GE", "HON", "MDT", "CVX", "TMO"
# ]

# # 🔹 Process and save financials for each company
# for symbol in company_symbols:
#     print(f"\n🔄 Processing: {symbol}")

#     balance_sheet_df = fetch_financial_data(symbol, "BALANCE_SHEET")
#     income_statement_df = fetch_financial_data(symbol, "INCOME_STATEMENT")
#     cash_flow_df = fetch_financial_data(symbol, "CASH_FLOW")

#     if balance_sheet_df is not None:
#         balance_sheet_df.to_csv(os.path.join(output_folder, f"{symbol}_balance_sheet.csv"), index=False)

#     if income_statement_df is not None:
#         income_statement_df.to_csv(os.path.join(output_folder, f"{symbol}_income_statement.csv"), index=False)

#     if cash_flow_df is not None:
#         cash_flow_df.to_csv(os.path.join(output_folder, f"{symbol}_cash_flow.csv"), index=False)

#     print(f"✅ CSVs saved for {symbol}")

# print("\n🎉 All companies processed successfully! Check the 'financial_csv_exports' folder.")


import requests
import json
from pymongo import MongoClient

# MongoDB setup
MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "financial_data_2"
COLLECTION_NAME = "alpha_vantage_3"

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

ALPHA_VANTAGE_API_KEY = "7I86ULXIXTCSQ4TI"

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
    # Fetch and save balance sheet
    balance_sheet = fetch_alpha_vantage_data(symbol, "BALANCE_SHEET")
    save_to_mongodb(balance_sheet, symbol, "BALANCE_SHEET")

    # Fetch and save income statement
    income_statement = fetch_alpha_vantage_data(symbol, "INCOME_STATEMENT")
    save_to_mongodb(income_statement, symbol, "INCOME_STATEMENT")

    # Fetch and save cash flow statement
    cash_flow = fetch_alpha_vantage_data(symbol, "CASH_FLOW")
    save_to_mongodb(cash_flow, symbol, "CASH_FLOW")

# Example: dynamically fetching for a symbol (e.g., AAPL)
if __name__ == "__main__":
    symbol_input = input("Enter the symbol (e.g., AAPL): ").strip()
    fetch_and_save(symbol_input)
    print(f"Financial data for {symbol_input} saved to MongoDB.")


# company_symbols = [
#     "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "JPM", "V", "JNJ",
#     "WMT", "PG", "MA", "UNH", "HD", "DIS", "KO", "PEP", "BAC", "XOM",
#     "INTC", "T", "CSCO", "CMCSA", "NFLX", "ORCL", "PFE", "MRK", "NKE", "ADBE",
#     "ABT", "CRM", "AVGO", "COST", "QCOM", "MCD", "LLY", "TXN", "NEE", "DHR",
#     "WFC", "AMGN", "UPS", "IBM", "BA", "GE", "HON", "MDT", "CVX", "TMO"
# ]