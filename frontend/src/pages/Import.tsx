
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FileInput, Upload, Check, AlertTriangle, X, Database } from 'lucide-react';

const Import = () => {
  const [fileStage, setFileStage] = useState<'select' | 'processing' | 'complete' | 'error'>('select');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [importHistory, setImportHistory] = useState([
    { id: 1, filename: 'Q2_Financial_Data.xlsx', date: '2023-10-12', status: 'Success', records: 1250 },
    { id: 2, filename: 'Bank_Statements_Sep.csv', date: '2023-09-28', status: 'Success', records: 532 },
    { id: 3, filename: 'Revenue_Detail_Aug.csv', date: '2023-08-15', status: 'Failed', records: 0 }
  ]);

  const containerStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };
  
  const uploadAreaStyle = {
    border: '2px dashed #ccc',
    padding: '2rem',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };
  
  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#00338D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '1rem'
  };
  
  const thStyle = {
    textAlign: 'left' as const,
    padding: '0.75rem',
    borderBottom: '1px solid #e0e0e0'
  };
  
  const tdStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #e0e0e0'
  };
  
  const statusStyle = (status: string) => ({
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    backgroundColor: status === 'Success' ? '#e6f4ea' : '#fce8e6',
    color: status === 'Success' ? '#137333' : '#c5221f'
  });
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f5f5f5';
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(files);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setUploadedFiles(files);
    }
  };
  
  const startProcessing = () => {
    setFileStage('processing');
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success
      if (success) {
        setFileStage('complete');
        
        // Add to import history
        const newImport = {
          id: importHistory.length + 1,
          filename: uploadedFiles[0].name,
          date: new Date().toISOString().split('T')[0],
          status: 'Success',
          records: Math.floor(Math.random() * 2000) + 500
        };
        
        setImportHistory([newImport, ...importHistory]);
      } else {
        setFileStage('error');
      }
    }, 3000);
  };
  
  const resetUpload = () => {
    setUploadedFiles([]);
    setFileStage('select');
  };
  
  const renderUploadArea = () => {
    switch (fileStage) {
      case 'select':
        return (
          <div 
            style={uploadAreaStyle}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload size={48} color="#00338D" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Drop files here or click to browse</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Supported formats: CSV, XLS, XLSX, JSON</p>
            <input 
              id="file-input" 
              type="file" 
              accept=".csv,.xls,.xlsx,.json" 
              style={{ display: 'none' }} 
              onChange={handleFileSelect}
              multiple
            />
            {uploadedFiles.length > 0 && (
              <div style={{ marginTop: '1rem', width: '100%' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Selected Files:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {uploadedFiles.map((file, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: '#f9f9f9', borderRadius: '4px', marginBottom: '0.5rem' }}>
                      <span>{file.name}</span>
                      <span>({(file.size / 1024).toFixed(1)} KB)</span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <button style={buttonStyle} onClick={startProcessing}>
                    <FileInput size={18} /> Start Import
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'processing':
        return (
          <div style={{ ...uploadAreaStyle, border: 'none' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  border: '5px solid #f3f3f3',
                  borderTop: '5px solid #00338D',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Processing Files</h3>
              <p style={{ color: '#666' }}>This may take a few moments...</p>
            </div>
          </div>
        );
      case 'complete':
        return (
          <div style={{ ...uploadAreaStyle, border: 'none' }}>
            <Check size={48} color="#137333" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem', color: '#137333' }}>Import Successful!</h3>
            <p style={{ marginBottom: '1rem' }}>All files have been processed and data is available for analysis.</p>
            <button style={{ ...buttonStyle, backgroundColor: '#137333' }} onClick={resetUpload}>
              Import More Files
            </button>
          </div>
        );
      case 'error':
        return (
          <div style={{ ...uploadAreaStyle, border: 'none' }}>
            <AlertTriangle size={48} color="#c5221f" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem', color: '#c5221f' }}>Import Failed</h3>
            <p style={{ marginBottom: '0.5rem' }}>There was a problem processing your files.</p>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Please check the format and try again.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ ...buttonStyle, backgroundColor: '#c5221f' }} onClick={resetUpload}>
                <X size={18} /> Cancel
              </button>
              <button style={buttonStyle} onClick={() => startProcessing()}>
                <Upload size={18} /> Try Again
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Data Import</h1>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Upload Financial Data</h2>
          {renderUploadArea()}
        </div>
        
        <div style={containerStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Import History</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>File Name</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Records</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {importHistory.map(item => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.filename}</td>
                  <td style={tdStyle}>{item.date}</td>
                  <td style={tdStyle}>
                    <span style={statusStyle(item.status)}>{item.status}</span>
                  </td>
                  <td style={tdStyle}>{item.records}</td>
                  <td style={tdStyle}>
                    <button 
                      style={{ ...buttonStyle, padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} 
                      disabled={item.status === 'Failed'}
                    >
                      <Database size={14} /> View Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Import;
