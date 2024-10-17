import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      gap: '20px'
    }}>
      <h1 style={{ marginBottom: '10px' }}>Hello Welcome!</h1>
      <h1 style={{ marginBottom: '10px' }}>Medical Image Captioning</h1>
      <h2 style={{ marginBottom: '10px' }}>Choose a Prediction Model</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}>
        <button style={{
          backgroundColor: 'lightblue',
          color: 'black',
          padding: '15px 30px',
          fontSize: '20px',
          border: '1px solid black',
          borderRadius: '5px',
          cursor: 'pointer',
        }}>
          <Link to="/dl" style={{ color: 'black', textDecoration: 'none' }}>Predict using DL Model</Link>
        </button>
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <div>
              <button style={{
                marginTop: '3px',
                backgroundColor: 'lightblue',
                color: 'black',
                padding: '15px 30px',
                fontSize: '20px',
                border: '1px solid black',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '20px',
              }}>
                <Link to="/llm-predict/method1" style={{ color: 'black', textDecoration: 'none' }}>Predict using LLM Model</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
