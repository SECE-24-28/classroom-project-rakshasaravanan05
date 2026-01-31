import React, { useState, useEffect } from 'react';
import { issueAPI } from '../utils/api';

const AdminPanel: React.FC = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await issueAPI.getAllIssues();
      setIssues(response.data.issues);
    } catch (error: any) {
      setError('Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const comment = prompt('Add a comment (optional):') || '';
      await issueAPI.updateIssueStatus(id, { status, adminComment: comment });
      fetchIssues();
    } catch (error: any) {
      setError('Failed to update issue status');
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

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading issues...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Panel - All Issues</h2>
      
      {error && <div style={{ background: '#fee', color: '#c33', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}
      
      {issues.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <p>No issues found.</p>
        </div>
      ) : (
        <div>
          {issues.map((issue: any) => (
            <div key={issue._id} style={{ background: 'white', padding: '1.5rem', marginBottom: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#2c3e50' }}>{issue.title}</h3>
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
                  {issue.status}
                </span>
              </div>
              
              <div style={{ backgroundColor: '#f8f9fa', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                <strong>Reported by:</strong> {issue.user.name} ({issue.user.email})
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
                <div style={{ backgroundColor: '#e8f5e8', padding: '0.75rem', borderRadius: '4px', borderLeft: '4px solid #27ae60', marginBottom: '1rem' }}>
                  <strong>Admin Comment:</strong> {issue.adminComment}
                </div>
              )}
              
              <div style={{ borderTop: '1px solid #e1e8ed', paddingTop: '1rem' }}>
                <label style={{ marginRight: '1rem' }}>Update Status:</label>
                <select 
                  value={issue.status} 
                  onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}
                  style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;