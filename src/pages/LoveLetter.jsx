import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/default.css';
import '../styles/letter.css';

const LoveLetter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [petals, setPetals] = useState([]);

    const handleEnvelopeClick = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => {
                setShowLetter(true);
                createPetals();
            }, 800);
        }
    };

    const createPetals = () => {
        const newPetals = [];
        for (let i = 0; i < 20; i++) {
            newPetals.push({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 3,
                duration: 4 + Math.random() * 4
            });
        }
        setPetals(newPetals);
    };

    return (
        <div className="letter-container">
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '10%', animationDelay: '0s' }}></div>
                <div className="heart-float" style={{ left: '30%', animationDelay: '3s' }}></div>
                <div className="heart-float" style={{ left: '70%', animationDelay: '6s' }}></div>
                <div className="heart-float" style={{ left: '90%', animationDelay: '9s' }}></div>
            </div>

            {petals.map(petal => (
                <div
                    key={petal.id}
                    className="petal"
                    style={{
                        left: `${petal.left}%`,
                        animationDelay: `${petal.delay}s`,
                        animationDuration: `${petal.duration}s`
                    }}
                />
            ))}

            <Link to="/" className="back-btn">← Home</Link>

            <h1 className="letter-title">A Letter For You 💌</h1>
            <p className="letter-subtitle">Written with all my heart</p>

            {!showLetter && (
                <div className="envelope-wrapper" onClick={handleEnvelopeClick}>
                    <div className={`envelope ${isOpen ? 'open' : ''}`}>
                        <div className="envelope-flap"></div>
                    </div>
                    <p className="envelope-hint">Tap to open ✨</p>
                </div>
            )}

            <div className={`letter-content ${showLetter ? 'visible' : ''}`}>
                <div className="letter-paper">
                    <div className="letter-greeting">My Dearest Love,</div>
                    <div className="letter-body">
                        <p>
                            I've been trying to find the right words to tell you how much you mean to me,
                            but words seem to fall short when it comes to describing the depth of my feelings for you.
                        </p>
                        <p>
                            From the moment you came into my life, everything changed. The colors became brighter,
                            the days became more meaningful, and my heart found its home.
                        </p>
                        <p>
                            You are my first thought in the morning and my last thought at night.
                            Your smile is my favorite sight, your laugh is my favorite sound,
                            and being with you is my favorite place to be.
                        </p>
                        <p>
                            Thank you for loving me, for understanding me, for being patient with me,
                            and for making every single day worth living. You are not just my partner;
                            you are my best friend, my confidant, and my forever person.
                        </p>
                        <p>
                            I promise to love you more with each passing day, to be there for you in
                            every moment, and to cherish every second we spend together.
                        </p>
                        <p>
                            I love you to the moon and back, infinitely and eternally. 💕
                        </p>
                    </div>
                    <div className="letter-signature">
                        Forever Yours,<br />
                        ❤️ Your Love ❤️
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoveLetter;
