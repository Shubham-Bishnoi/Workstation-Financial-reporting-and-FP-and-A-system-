import matplotlib.pyplot as plt
import os

def generate_bar_chart(symbol="IBM"):
    labels = ['2020', '2021', '2022', '2023', '2024']
    revenue = [45, 52, 60, 62.75, 66]  # Mock data (in billions)
    expenses = [30, 34, 38, 41, 45]

    x = range(len(labels))
    plt.figure(figsize=(6, 3.5))
    plt.bar(x, revenue, width=0.4, label='Revenue')
    plt.bar([i + 0.4 for i in x], expenses, width=0.4, label='Expenses')
    plt.xticks([i + 0.2 for i in x], labels)
    plt.title(f'{symbol}: 5-Year Revenue vs Expenses')
    plt.ylabel('USD (in Billions)')
    plt.legend()
    plt.tight_layout()

    chart_path = f"data/reports/{symbol}_bar_chart.png"
    os.makedirs("data/reports", exist_ok=True)
    plt.savefig(chart_path)
    plt.close()
    return chart_path

def generate_line_chart(symbol="IBM"):
    years = ['2020', '2021', '2022', '2023', '2024']
    net_income = [5.1, 6.2, 6.9, 7.5, 8.1]  # Mock data

    plt.figure(figsize=(6, 3.5))
    plt.plot(years, net_income, marker='o', linestyle='-', color='green')
    plt.title(f'{symbol}: Net Income Over 5 Years')
    plt.ylabel('Net Income (in Billions)')
    plt.grid(True)
    plt.tight_layout()

    chart_path = f"data/reports/{symbol}_line_chart.png"
    plt.savefig(chart_path)
    plt.close()
    return chart_path

def generate_pie_chart(symbol="IBM"):
    segments = ['R&D', 'SG&A', 'Marketing', 'Operations']
    values = [25, 35, 20, 20]  # Mock data in percentage

    plt.figure(figsize=(5, 5))
    plt.pie(values, labels=segments, autopct='%1.1f%%', startangle=140)
    plt.title(f'{symbol}: Expense Distribution FY 2024')
    plt.tight_layout()

    chart_path = f"data/reports/{symbol}_pie_chart.png"
    plt.savefig(chart_path)
    plt.close()
    return chart_path

def generate_all_charts(symbol="IBM"):
    paths = []
    paths.append(generate_bar_chart(symbol))
    paths.append(generate_line_chart(symbol))
    paths.append(generate_pie_chart(symbol))
    return paths