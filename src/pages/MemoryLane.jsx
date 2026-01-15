import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/default.css';
import '../styles/memory.css';

const MemoryLane = () => {
    return (
        <div>
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '10%', animationDelay: '0s' }}></div>
                <div className="heart-float" style={{ left: '25%', animationDelay: '3s' }}></div>
                <div className="heart-float" style={{ left: '50%', animationDelay: '6s' }}></div>
                <div className="heart-float" style={{ left: '75%', animationDelay: '9s' }}></div>
            </div>

            <Link to="/" className="back-btn">← Home</Link>

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '3.5em', textShadow: '0 0 10px #ff69b4' }}>Our Journey</h1>
                <p style={{ fontSize: '1.2em', opacity: 0.8 }}>Every moment with you is a treasure</p>
            </div>

            <div className="timeline-container">
                <div className="timeline-item left">
                    <div className="content glass">
                        <span className="date">July 2023</span>
                        <h2>The First Meeting</h2>
                        <p>Do you remember the first time we saw each other? I knew right then that you were special. The way you smiled lit up the entire room.</p>
                    </div>
                </div>
                <div className="timeline-item right">
                    <div className="content glass">
                        <span className="date">August 2023</span>
                        <h2>First Date</h2>
                        <p>Our first official date! I was so nervous but you made everything feel so natural. We talked for hours and I didn't want the night to end.</p>
                    </div>
                </div>
                <div className="timeline-item left">
                    <div className="content glass">
                        <span className="date">December 2023</span>
                        <h2>Our First Trip</h2>
                        <p>Traveling with you was an adventure. Seeing new places with my favorite person made memories I'll cherish forever.</p>
                    </div>
                </div>
                <div className="timeline-item right">
                    <div className="content glass">
                        <span className="date">Today</span>
                        <h2>Celebrating You</h2>
                        <p>Here we are, celebrating you. Every day with you is a gift, and I can't wait for all the memories we have yet to create. I love you!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoryLane;
