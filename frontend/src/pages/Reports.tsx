
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FileText } from 'lucide-react'; // Add this import

const Reports = () => {
  const [activeTab, setActiveTab] = useState('income');

  const tabButtonStyle = (isActive: boolean) => ({
    padding: '0.75rem 1.25rem',
    backgroundColor: isActive ? '#00338D' : '#f0f0f0',
    color: isActive ? 'white' : '#333',
    border: 'none',
    borderRadius: '4px 4px 0 0',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    marginRight: '4px'
  });

  const reportsData = {
    income: [
      { period: 'Q1 2023', revenue: '$1,250,000', expenses: '$850,000', profit: '$400,000' },
      { period: 'Q2 2023', revenue: '$1,400,000', expenses: '$920,000', profit: '$480,000' },
      { period: 'Q3 2023', revenue: '$1,350,000', expenses: '$905,000', profit: '$445,000' }
    ],
    balance: [
      { period: 'Q1 2023', assets: '$5,250,000', liabilities: '$3,150,000', equity: '$2,100,000' },
      { period: 'Q2 2023', assets: '$5,400,000', liabilities: '$3,220,000', equity: '$2,180,000' },
      { period: 'Q3 2023', assets: '$5,500,000', liabilities: '$3,200,000', equity: '$2,300,000' }
    ],
    cash: [
      { period: 'Q1 2023', operating: '$350,000', investing: '-$150,000', financing: '-$75,000', net: '$125,000' },
      { period: 'Q2 2023', operating: '$420,000', investing: '-$200,000', financing: '-$50,000', net: '$170,000' },
      { period: 'Q3 2023', operating: '$380,000', investing: '-$180,000', financing: '$50,000', net: '$250,000' }
    ]
  };

  const renderTable = () => {
    if (activeTab === 'income') {
      return (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Period</th>
              <th>Revenue</th>
              <th>Expenses</th>
              <th>Net Profit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.income.map((item, idx) => (
              <tr key={idx}>
                <td>{item.period}</td>
                <td>{item.revenue}</td>
                <td>{item.expenses}</td>
                <td>{item.profit}</td>
                <td>
                  <button style={actionButtonStyle}>View</button>
                  <button style={actionButtonStyle}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === 'balance') {
      return (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Period</th>
              <th>Assets</th>
              <th>Liabilities</th>
              <th>Equity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.balance.map((item, idx) => (
              <tr key={idx}>
                <td>{item.period}</td>
                <td>{item.assets}</td>
                <td>{item.liabilities}</td>
                <td>{item.equity}</td>
                <td>
                  <button style={actionButtonStyle}>View</button>
                  <button style={actionButtonStyle}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Period</th>
              <th>Operating Activities</th>
              <th>Investing Activities</th>
              <th>Financing Activities</th>
              <th>Net Cash Flow</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.cash.map((item, idx) => (
              <tr key={idx}>
                <td>{item.period}</td>
                <td>{item.operating}</td>
                <td>{item.investing}</td>
                <td>{item.financing}</td>
                <td>{item.net}</td>
                <td>
                  <button style={actionButtonStyle}>View</button>
                  <button style={actionButtonStyle}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  const containerStyle = {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '1rem'
  };

  const actionButtonStyle = {
    padding: '0.25rem 0.5rem',
    margin: '0 0.25rem',
    backgroundColor: '#00338D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const generateButtonStyle = {
    padding: '0.75rem 1.25rem',
    backgroundColor: '#00338D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const [selectedCompany, setSelectedCompany] = useState('TXG');
  const companies = [
    "TXG", "YI", "PIH", "PIHPP", "TURN", "FLWS", "BCOW", "ONEM", "FCCY", "SRCE",
    "VNET", "TWOU", "QFIN", "KRKR", "JOBS", "ETNB", "JFK", "JFKKR", "JFKKU", "JFKKW",
    "EGHT", "NMTR", "JFU", "AAON", "ABEO", "ABMD", "AXAS", "ACIU", "ACIA", "ACTG",
    "ACHC", "ACAD", "ACAM", "ACAMU", "ACAMW", "ACST", "AXDX", "ACCP", "XLRN", "ACCD",
    "ARAY", "ACLL", "ACRX", "ACER", "ACHV", "ACIW", "ACRS", "ACMR", "ACNB", "ACOR",
    "ATVI"
  ];

  const handleGeneratePDF = async () => {
    const response = await fetch(`http://localhost:8000/generate-cfo-report/pdf/${selectedCompany}/2024`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCompany}_2024_CFO_Report.pdf`;
    a.click();
  };



  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Financial Reports</h1>

        <div style={containerStyle}>
          <div style={{ display: 'flex', marginBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
            <button style={tabButtonStyle(activeTab === 'income')} onClick={() => setActiveTab('income')}>
              Income Statement
            </button>
            <button style={tabButtonStyle(activeTab === 'balance')} onClick={() => setActiveTab('balance')}>
              Balance Sheet
            </button>
            <button style={tabButtonStyle(activeTab === 'cash')} onClick={() => setActiveTab('cash')}>
              Cash Flow
            </button>
          </div>

          {renderTable()}

          <div style={{ margin: '1rem 0' }}>
            <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Select Company:</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            >
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <button style={generateButtonStyle} onClick={handleGeneratePDF}>
            <FileText size={20} /> Generate CFO-Ready Report
          </button>
        </div> 

        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>AI-Powered Analysis</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            Our AI has detected a 12.5% increase in operational expenses compared to the previous quarter.
            The main contributors to this increase appear to be in marketing expenses (up 18%) and
            research & development (up 15%).
          </p>
          <p style={{ lineHeight: '1.6' }}>
            Based on current trends, we project a potential improvement in profit margins by 2.3%
            in the coming quarter if expense optimization measures are implemented.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
