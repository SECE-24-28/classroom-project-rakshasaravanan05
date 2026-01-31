import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { issueAPI } from '../utils/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await issueAPI.getMyIssues();
        const issues = response.data;
        setPendingCount(issues.filter((issue: any) => issue.status === 'Pending').length);
        setResolvedCount(issues.filter((issue: any) => issue.status === 'Resolved').length);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <nav style={{ background: '#f8f9fa', padding: '1rem', marginBottom: '2rem', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Campus Issues</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: '#007bff' }}>Dashboard</Link>
            <Link to="/report-issue" style={{ textDecoration: 'none', color: '#007bff' }}>Report Issue</Link>
            <Link to="/my-issues" style={{ textDecoration: 'none', color: '#007bff' }}>My Issues</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" style={{ textDecoration: 'none', color: '#007bff' }}>Admin Panel</Link>
            )}
            <span>{user?.name}</span>
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Welcome, {user?.name}!</h1>
        <p>Role: {user?.role}</p>

        {!loading && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h3>Issue Summary</h3>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', color: '#f39c12' }}>⏳</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{pendingCount}</div>
                <div style={{ color: '#7f8c8d' }}>Pending Issues</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', color: '#27ae60' }}>✅</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{resolvedCount}</div>
                <div style={{ color: '#7f8c8d' }}>Resolved Issues</div>
              </div>
            </div>
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3>📝 Report Issue</h3>
            <p>Report a new campus issue</p>
            <Link to="/report-issue" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
              Report Now
            </Link>
          </div>
          
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3>📋 My Issues</h3>
            <p>View your reported issues</p>
            <Link to="/my-issues" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
              View Issues
            </Link>
          </div>
          
          {user?.role === 'admin' && (
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h3>🛠️ Admin Panel</h3>
              <p>Manage all issues</p>
              <Link to="/admin" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '4px' }}>
                Admin Panel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;