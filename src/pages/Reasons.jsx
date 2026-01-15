import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/default.css';
import '../styles/reasons.css';

const Reasons = () => {
    return (
        <div>
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '15%', animationDelay: '1s' }}></div>
                <div className="heart-float" style={{ left: '35%', animationDelay: '4s' }}></div>
                <div className="heart-float" style={{ left: '55%', animationDelay: '7s' }}></div>
                <div className="heart-float" style={{ left: '85%', animationDelay: '2s' }}></div>
            </div>

            <Link to="/" className="back-btn">← Home</Link>

            <div className="reasons-container">
                <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '3.5em', textShadow: '0 0 10px #ff69b4' }}>Reasons I Love You</h1>
                <p style={{ fontSize: '1.2em', opacity: 0.8, marginBottom: '20px' }}>Just a few of the million reasons why...</p>

                <div className="grid">
                    <div className="card glass">
                        <span className="number">01</span>
                        <div className="icon">😊</div>
                        <div className="reason-text">Because your smile is the most beautiful thing I've ever seen. It brightens up my darkest days.</div>
                    </div>

                    <div className="card glass">
                        <span className="number">02</span>
                        <div className="icon">🧠</div>
                        <div className="reason-text">Because you challenge me to be a better person. You inspire me every single day.</div>
                    </div>

                    <div className="card glass">
                        <span className="number">03</span>
                        <div className="icon">🤗</div>
                        <div className="reason-text">Because of how safe I feel in your arms. You are my home, my comfort, my peace.</div>
                    </div>

                    <div className="card glass">
                        <span className="number">04</span>
                        <div className="icon">😂</div>
                        <div className="reason-text">Because you have the weirdest, cutest laugh that I absolutely adore.</div>
                    </div>

                    <div className="card glass">
                        <span className="number">05</span>
                        <div className="icon">🙏</div>
                        <div className="reason-text">Because you support my dreams, no matter how crazy they sound.</div>
                    </div>

                    <div className="card glass">
                        <span className="number">06</span>
                        <div className="icon">💖</div>
                        <div className="reason-text">Because you love me for who I am, flaws and all.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reasons;
