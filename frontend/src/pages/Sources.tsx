
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Database, RefreshCw, Plus, Trash2 } from 'lucide-react';

const Sources = () => {
  const [sources, setSources] = useState([
    { id: 1, name: 'Financial Modeling Prep API', status: 'Connected', lastSync: '2025-04-02 09:30 AM', type: 'External API' },
    { id: 2, name: 'Alpha Vantage', status: 'Connected', lastSync: '2025-03-29 02:45 PM', type: 'External API' },
    { id: 3, name: 'MongoDB Financial Data', status: 'Connected', lastSync: '2025-04-10 11:15 AM', type: 'Database' },
    { id: 4, name: 'Yahoo Finance', status: 'Disconnected', lastSync: '2025-04-07 10:00 AM', type: 'External API' },
    { id: 5, name: 'Intuit QuickBooks', status: 'Connected', lastSync: '2025-04-09 09:00 AM', type: 'Accounting Software' }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  
  const containerStyle = {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const
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
  
  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#00338D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };
  
  const statusStyle = (status: string) => ({
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    backgroundColor: status === 'Connected' ? '#e6f4ea' : '#fce8e6',
    color: status === 'Connected' ? '#137333' : '#c5221f'
  });
  
  const modalOverlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };
  
  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '500px',
    maxWidth: '90%'
  };
  
  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  };
  
  const inputGroupStyle = {
    marginBottom: '1rem'
  };
  
  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  };
  
  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '4px'
  };
  
  const selectStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '4px'
  };
  
  const modalFooterStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '2rem',
    gap: '1rem'
  };
  
  const syncSource = (id: number) => {
    console.log(`Syncing source with ID: ${id}`);
    
    // Update the lastSync timestamp for the source
    const updatedSources = sources.map(source => {
      if (source.id === id) {
        const now = new Date();
        const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        return { ...source, lastSync: formattedDate };
      }
      return source;
    });
    
    setSources(updatedSources);
  };
  
  const deleteSource = (id: number) => {
    if (confirm('Are you sure you want to remove this data source?')) {
      setSources(sources.filter(source => source.id !== id));
    }
  };
  
  const addSource = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const type = (form.elements.namedItem('type') as HTMLSelectElement).value;
    
    const newSource = {
      id: sources.length + 1,
      name,
      type,
      status: 'Connected',
      lastSync: 'Just now'
    };
    
    setSources([...sources, newSource]);
    setShowAddModal(false);
  };
  
  return (
    <Layout>
      <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Data Sources</h1>
          <button style={buttonStyle} onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> Add Data Source
          </button>
        </div>
        
        <div style={containerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Last Synced</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sources.map(source => (
                <tr key={source.id}>
                  <td style={tdStyle}>{source.name}</td>
                  <td style={tdStyle}>{source.type}</td>
                  <td style={tdStyle}>
                    <span style={statusStyle(source.status)}>{source.status}</span>
                  </td>
                  <td style={tdStyle}>{source.lastSync}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        style={{ ...buttonStyle, padding: '0.25rem', backgroundColor: '#00338D' }} 
                        title="Sync Now"
                        onClick={() => syncSource(source.id)}
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button 
                        style={{ ...buttonStyle, padding: '0.25rem', backgroundColor: '#c5221f' }} 
                        title="Remove"
                        onClick={() => deleteSource(source.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {showAddModal && (
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <div style={modalHeaderStyle}>
                <h2 style={{ fontWeight: 'bold' }}>Add Data Source</h2>
                <button 
                  style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }} 
                  onClick={() => setShowAddModal(false)}
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={addSource}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle} htmlFor="name">Data Source Name</label>
                  <input style={inputStyle} type="text" id="name" name="name" required />
                </div>
                
                <div style={inputGroupStyle}>
                  <label style={labelStyle} htmlFor="type">Type</label>
                  <select style={selectStyle} id="type" name="type" required>
                    <option value="">Select a type</option>
                    <option value="External API">External API</option>
                    <option value="Database">Database</option>
                    <option value="Accounting Software">Accounting Software</option>
                    <option value="File Import">File Import</option>
                  </select>
                </div>
                
                <div style={inputGroupStyle}>
                  <label style={labelStyle} htmlFor="apiKey">API Key / Connection String</label>
                  <input style={inputStyle} type="text" id="apiKey" name="apiKey" />
                </div>
                
                <div style={modalFooterStyle}>
                  <button 
                    type="button" 
                    style={{ ...buttonStyle, backgroundColor: '#f0f0f0', color: '#333' }}
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={buttonStyle}
                  >
                    <Database size={18} /> Connect
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Sources;
