import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/default.css';
import '../styles/dates.css';

const SpecialDates = () => {
    // ⚠️ CUSTOMIZE THIS: Set your relationship start date!
    const relationshipStart = new Date('2023-07-15'); // Format: YYYY-MM-DD

    // ⚠️ CUSTOMIZE THIS: Set your next anniversary or special date!
    const nextAnniversary = new Date('2026-07-15');

    const [timeTogether, setTimeTogether] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            // Calculate time together
            const diff = now - relationshipStart;
            const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            const days = totalDays % 30;
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeTogether({ years, months, days, hours, minutes, seconds });

            // Calculate countdown to anniversary
            const anniversaryDiff = nextAnniversary - now;
            if (anniversaryDiff > 0) {
                setCountdown({
                    days: Math.floor(anniversaryDiff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((anniversaryDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((anniversaryDiff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((anniversaryDiff % (1000 * 60)) / 1000)
                });
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // ⚠️ CUSTOMIZE THESE: Add your special milestones!
    const milestones = [
        {
            icon: '💫',
            name: 'First Met',
            date: 'July 15, 2023',
            desc: 'The day the universe brought us together'
        },
        {
            icon: '💕',
            name: 'First Date',
            date: 'August 10, 2023',
            desc: 'Our first official date - so magical!'
        },
        {
            icon: '💋',
            name: 'First Kiss',
            date: 'August 25, 2023',
            desc: 'A moment I will never forget'
        },
        {
            icon: '❤️',
            name: 'Said I Love You',
            date: 'October 5, 2023',
            desc: 'Three words that changed everything'
        },
        {
            icon: '✈️',
            name: 'First Trip Together',
            date: 'December 20, 2023',
            desc: 'Adventures are better with you'
        },
        {
            icon: '🎂',
            name: 'First Birthday Together',
            date: 'January 15, 2024',
            desc: 'Celebrating you for the first time'
        }
    ];

    return (
        <div className="dates-container">
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '10%', animationDelay: '0s' }}></div>
                <div className="heart-float" style={{ left: '30%', animationDelay: '2s' }}></div>
                <div className="heart-float" style={{ left: '60%', animationDelay: '5s' }}></div>
                <div className="heart-float" style={{ left: '85%', animationDelay: '8s' }}></div>
            </div>

            <Link to="/" className="back-btn">← Home</Link>

            <div className="dates-header">
                <h1 className="dates-title">Our Special Dates ⏰</h1>
                <p className="dates-subtitle">Every second with you counts</p>
            </div>

            {/* Time Together Counter */}
            <div className="main-counter glass">
                <div className="counter-label">We've been together for</div>
                <div className="counter-value">
                    <div className="counter-unit">
                        <div className="counter-number">{timeTogether.years}</div>
                        <div className="counter-text">Years</div>
                    </div>
                    <div className="counter-unit">
                        <div className="counter-number">{timeTogether.months}</div>
                        <div className="counter-text">Months</div>
                    </div>
                    <div className="counter-unit">
                        <div className="counter-number">{timeTogether.days}</div>
                        <div className="counter-text">Days</div>
                    </div>
                    <div className="counter-unit">
                        <div className="counter-number">{timeTogether.hours}</div>
                        <div className="counter-text">Hours</div>
                    </div>
                    <div className="counter-unit">
                        <div className="counter-number">{timeTogether.minutes}</div>
                        <div className="counter-text">Minutes</div>
                    </div>
                    <div className="counter-unit">
                        <div className="counter-number">{timeTogether.seconds}</div>
                        <div className="counter-text">Seconds</div>
                    </div>
                </div>
                <div className="counter-heart">💕</div>
            </div>

            {/* Anniversary Countdown */}
            <div className="countdown-section">
                <h2 className="countdown-title">Next Anniversary In...</h2>
                <div className="countdown-grid">
                    <div className="countdown-box">
                        <div className="countdown-num">{countdown.days}</div>
                        <div className="countdown-label">Days</div>
                    </div>
                    <div className="countdown-box">
                        <div className="countdown-num">{countdown.hours}</div>
                        <div className="countdown-label">Hours</div>
                    </div>
                    <div className="countdown-box">
                        <div className="countdown-num">{countdown.minutes}</div>
                        <div className="countdown-label">Minutes</div>
                    </div>
                    <div className="countdown-box">
                        <div className="countdown-num">{countdown.seconds}</div>
                        <div className="countdown-label">Seconds</div>
                    </div>
                </div>
            </div>

            {/* Milestones */}
            <div className="milestones-section">
                <h2 className="milestones-title">Our Milestones 💕</h2>
                <div className="milestones-grid">
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className="milestone-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="milestone-icon">{milestone.icon}</div>
                            <h3 className="milestone-name">{milestone.name}</h3>
                            <div className="milestone-date">{milestone.date}</div>
                            <p className="milestone-desc">{milestone.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpecialDates;
