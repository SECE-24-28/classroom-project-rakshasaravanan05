import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { issueAPI } from '../utils/api';

const ReportIssue: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Power', icon: '⚡', color: '#f39c12', desc: 'Electrical issues' },
    { name: 'Water', icon: '💧', color: '#3498db', desc: 'Plumbing problems' },
    { name: 'WiFi', icon: '📶', color: '#9b59b6', desc: 'Internet connectivity' },
    { name: 'Infrastructure', icon: '🏗️', color: '#e74c3c', desc: 'Building maintenance' },
    { name: 'Cleanliness', icon: '🧹', color: '#27ae60', desc: 'Hygiene concerns' },
    { name: 'Other', icon: '📋', color: '#95a5a6', desc: 'General issues' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('location', formData.location);
      
      if (image) {
        formDataToSend.append('image', image);
      }

      await issueAPI.createIssue(formDataToSend);
      setSuccess('🎉 Issue reported successfully!');
      
      setFormData({ title: '', description: '', category: '', location: '' });
      setImage(null);
      setImagePreview(null);
      
      setTimeout(() => {
        navigate('/my-issues');
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      {/* Header */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '0 1rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '800', 
          marginBottom: '0.5rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          🚨 Report Campus Issue
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          opacity: 0.9, 
          margin: 0 
        }}>
          Help us make campus better by reporting issues quickly and easily
        </p>
      </div>

      {/* Main Form Card */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '0 1rem' 
      }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }}>
          {/* Alerts */}
          {error && (
            <div style={{ 
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)', 
              color: 'white', 
              padding: '1rem 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}>
              ❌ {error}
            </div>
          )}
          {success && (
            <div style={{ 
              background: 'linear-gradient(135deg, #51cf66, #40c057)', 
              color: 'white', 
              padding: '1rem 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}>
              ✅ {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            {/* Issue Details Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ 
                color: '#2c3e50', 
                fontSize: '1.4rem', 
                fontWeight: '700', 
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '3px solid #f1f3f4',
                position: 'relative'
              }}>
                📝 Issue Details
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '2px'
                }} />
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📋</span>
                  Issue Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '1rem 1.25rem', 
                    border: '2px solid #e9ecef', 
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: '#f8f9fa'
                  }}
                  placeholder="Brief description of the issue"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.background = '#f8f9fa';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🏷️</span>
                  Category *
                </label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: '1rem',
                  marginTop: '0.5rem'
                }}>
                  {categories.map(cat => (
                    <div 
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      style={{ 
                        padding: '1.5rem 1rem',
                        border: `2px solid ${formData.category === cat.name ? cat.color : '#e9ecef'}`,
                        borderRadius: '16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: formData.category === cat.name ? 'white' : '#f8f9fa',
                        position: 'relative',
                        overflow: 'hidden',
                        transform: formData.category === cat.name ? 'translateY(-4px)' : 'translateY(0)',
                        boxShadow: formData.category === cat.name ? '0 8px 25px rgba(0,0,0,0.15)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.category !== cat.name) {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                          e.currentTarget.style.borderColor = cat.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.category !== cat.name) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = '#e9ecef';
                        }
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: cat.color,
                        transform: formData.category === cat.name ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform 0.3s ease'
                      }} />
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        {cat.icon}
                      </div>
                      <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        {cat.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#7f8c8d' }}>
                        {cat.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '1rem 1.25rem', 
                    border: '2px solid #e9ecef', 
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: '#f8f9fa'
                  }}
                  placeholder="Building, room number, or specific location"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.background = '#f8f9fa';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📄</span>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  style={{ 
                    width: '100%', 
                    padding: '1rem 1.25rem', 
                    border: '2px solid #e9ecef', 
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: '#f8f9fa',
                    resize: 'vertical',
                    minHeight: '120px',
                    lineHeight: '1.6'
                  }}
                  placeholder="Detailed description of the issue"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.background = '#f8f9fa';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ 
                color: '#2c3e50', 
                fontSize: '1.4rem', 
                fontWeight: '700', 
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '3px solid #f1f3f4',
                position: 'relative'
              }}>
                📸 Add Photo (Optional)
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '2px'
                }} />
              </h3>
              
              <div style={{ marginTop: '0.5rem' }}>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                
                {!imagePreview ? (
                  <label 
                    htmlFor="image" 
                    style={{ 
                      display: 'block',
                      width: '100%',
                      minHeight: '200px',
                      border: '3px dashed #bdc3c7',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: '#f8f9fa',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.background = '#f0f3ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#bdc3c7';
                      e.currentTarget.style.background = '#f8f9fa';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '200px',
                      gap: '0.5rem'
                    }}>
                      <div style={{ fontSize: '3rem', color: '#7f8c8d' }}>📷</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                        Click to upload image
                      </div>
                      <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                        PNG, JPG up to 5MB
                      </div>
                    </div>
                  </label>
                ) : (
                  <div style={{ 
                    position: 'relative', 
                    display: 'inline-block',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '300px', 
                        maxHeight: '200px', 
                        borderRadius: '12px',
                        objectFit: 'cover'
                      }}
                    />
                    <button 
                      type="button" 
                      onClick={removeImage}
                      style={{ 
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div style={{ 
              textAlign: 'center', 
              paddingTop: '2rem', 
              borderTop: '2px solid #f1f3f4' 
            }}>
              <button 
                type="submit" 
                disabled={loading || !formData.category}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.25rem 3rem',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: loading || !formData.category ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  opacity: loading || !formData.category ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading && formData.category) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && formData.category) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid rgba(255,255,255,0.3)', 
                      borderTop: '2px solid white', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.3rem' }}>🚀</span>
                    Submit Issue Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ReportIssue;