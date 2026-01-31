import React, { useState, useEffect } from 'react';
import { issueAPI } from '../utils/api';
import { Link } from 'react-router-dom';

const MyIssues: React.FC = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await issueAPI.getUserIssues();
      setIssues(response.data.issues);
    } catch (error: any) {
      setError('Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return '#f39c12';
      case 'In Progress': return '#3498db';
      case 'Resolved': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return '⏳';
      case 'In Progress': return '🔄';
      case 'Resolved': return '✅';
      default: return '❓';
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading your issues...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>My Reported Issues</h2>
      
      {error && <div style={{ background: '#fee', color: '#c33', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}
      
      {issues.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <p>You haven't reported any issues yet.</p>
          <Link to="/report-issue" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Report Your First Issue
          </Link>
        </div>
      ) : (
        <div>
          {issues.map((issue: any) => (
            <div key={issue._id} style={{ background: 'white', padding: '1.5rem', marginBottom: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#2c3e50' }}>{issue.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span 
                    style={{ 
                      backgroundColor: getStatusColor(issue.status), 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem', 
                      fontWeight: '500' 
                    }}
                  >
                    {getStatusIcon(issue.status)} {issue.status}
                  </span>
                  <span 
                    style={{ 
                      backgroundColor: issue.status === 'Resolved' ? '#d5f4e6' : '#fef2e6',
                      color: issue.status === 'Resolved' ? '#27ae60' : '#f39c12',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      border: `1px solid ${issue.status === 'Resolved' ? '#27ae60' : '#f39c12'}`
                    }}
                  >
                    {issue.status === 'Resolved' ? '✓ Completed' : '⏸ Not Completed'}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: '#3498db', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {issue.category}
                </span>
                <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>📍 {issue.location}</span>
                <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                  {new Date(issue.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <p style={{ color: '#34495e', lineHeight: '1.6', marginBottom: '1rem' }}>{issue.description}</p>
              
              {issue.image && (
                <div style={{ marginBottom: '1rem' }}>
                  <img 
                    src={`http://localhost:5000/uploads/${issue.image}`} 
                    alt="Issue" 
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                </div>
              )}
              
              {issue.adminComment && (
                <div style={{ backgroundColor: '#e8f5e8', padding: '0.75rem', borderRadius: '4px', borderLeft: '4px solid #27ae60' }}>
                  <strong>Admin Comment:</strong> {issue.adminComment}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;