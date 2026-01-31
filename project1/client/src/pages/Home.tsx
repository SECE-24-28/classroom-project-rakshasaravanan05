import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{ 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          🏫 Campus Issues
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            padding: '0.5rem 1rem',
            border: '2px solid white',
            borderRadius: '25px',
            transition: 'all 0.3s'
          }}>
            Login
          </Link>
          <Link to="/register" style={{ 
            background: 'white', 
            color: '#667eea', 
            textDecoration: 'none', 
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            fontWeight: 'bold'
          }}>
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        minHeight: '80vh', 
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ flex: 1, color: 'white' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Smart Campus
            <br />
            <span style={{ 
              background: 'linear-gradient(45deg, #fff, #f0f3ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Issue Reporting
            </span>
          </h1>
          
          <p style={{ 
            fontSize: '1.3rem', 
            marginBottom: '1rem', 
            opacity: 0.9 
          }}>
            Transform your campus experience with our intelligent issue reporting system
          </p>
          
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem', 
            opacity: 0.8,
            lineHeight: '1.6'
          }}>
            Report, track, and resolve campus infrastructure issues seamlessly with real-time updates and efficient management.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <Link to="/register" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'white', 
              color: '#667eea', 
              textDecoration: 'none', 
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s'
            }}>
              <span>🚀</span>
              Get Started Free
            </Link>
            <Link to="/login" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent', 
              color: 'white', 
              textDecoration: 'none', 
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: '2px solid white',
              fontWeight: '600'
            }}>
              <span>👤</span>
              Login
            </Link>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>500+</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Issues Resolved</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>1000+</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Active Users</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>95%</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Success Rate</div>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '280px', 
            height: '560px', 
            background: '#2c3e50', 
            borderRadius: '30px', 
            padding: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'white', 
              borderRadius: '20px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white', 
                padding: '1rem', 
                textAlign: 'center', 
                fontWeight: '600' 
              }}>
                📱 Campus Issues
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  borderLeft: '4px solid #27ae60' 
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#27ae60', marginBottom: '0.5rem' }}>
                    ✅ Resolved
                  </div>
                  <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '0.25rem' }}>
                    WiFi Fixed in Library
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    📍 Main Library
                  </div>
                </div>
                
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  borderLeft: '4px solid #3498db' 
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#3498db', marginBottom: '0.5rem' }}>
                    🔄 In Progress
                  </div>
                  <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '0.25rem' }}>
                    Power Issue Block A
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    📍 Academic Block A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ background: 'white', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem', fontWeight: '700' }}>
              Why Choose Our Platform?
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>
              Powerful features designed for modern campus management
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '2.5rem 2rem', 
              borderRadius: '20px', 
              background: '#f8f9fa',
              transition: 'transform 0.3s',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                📝
              </div>
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>
                Easy Reporting
              </h3>
              <p style={{ color: '#7f8c8d', lineHeight: '1.6', marginBottom: '1rem' }}>
                Report issues with photos and detailed descriptions in just a few clicks
              </p>
              <span style={{ 
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                Instant Submission
              </span>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              padding: '2.5rem 2rem', 
              borderRadius: '20px', 
              background: '#f8f9fa'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                📊
              </div>
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>
                Real-time Tracking
              </h3>
              <p style={{ color: '#7f8c8d', lineHeight: '1.6', marginBottom: '1rem' }}>
                Track your issues from submission to resolution with live status updates
              </p>
              <span style={{ 
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                Live Updates
              </span>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              padding: '2.5rem 2rem', 
              borderRadius: '20px', 
              background: '#f8f9fa'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                ⚡
              </div>
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>
                Quick Resolution
              </h3>
              <p style={{ color: '#7f8c8d', lineHeight: '1.6', marginBottom: '1rem' }}>
                Efficient admin panel ensures faster issue management and resolution
              </p>
              <span style={{ 
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                Fast Response
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', 
        padding: '6rem 2rem', 
        textAlign: 'center', 
        color: 'white' 
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
            Ready to Transform Your Campus?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join thousands of students and staff making campus life better every day
          </p>
          <Link to="/register" style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'white', 
            color: '#2c3e50', 
            textDecoration: 'none', 
            padding: '1.25rem 3rem',
            borderRadius: '50px',
            fontWeight: '700',
            fontSize: '1.1rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
          }}>
            <span>🎯</span>
            Start Reporting Issues Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        background: '#2c3e50', 
        color: 'white', 
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.2rem' }}>
            <span>🏫</span>
            Campus Issues
          </div>
          <p style={{ margin: 0 }}>
            © 2024 Campus Issue Reporting System. Making campus life better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;