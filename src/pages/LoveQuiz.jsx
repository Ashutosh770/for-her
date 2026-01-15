import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import '../styles/default.css';
import '../styles/quiz.css';

const LoveQuiz = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, results
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showNext, setShowNext] = useState(false);

    // ⚠️ CUSTOMIZE THESE: Add your own questions about your relationship!
    const questions = [
        {
            question: "What's my favorite thing about you?",
            options: [
                "Your beautiful smile",
                "Your kindness",
                "Your sense of humor",
                "Everything! (All of the above)"
            ],
            correct: 3, // Index of correct answer
            explanation: "Obviously, I love everything about you! 💕"
        },
        {
            question: "Where did we first meet?",
            options: [
                "At a coffee shop",
                "Through mutual friends",
                "At work/school",
                "Online"
            ],
            correct: 1, // ⚠️ Change this to match your story!
            explanation: "That was the luckiest day of my life!"
        },
        {
            question: "What do I call you when we're being cute?",
            options: [
                "Baby",
                "Honey",
                "My Love",
                "All of these and more!"
            ],
            correct: 3,
            explanation: "I have so many names for you because you're so special! 🥰"
        },
        {
            question: "What's our favorite thing to do together?",
            options: [
                "Watch movies and cuddle",
                "Go on adventures",
                "Cook together",
                "Just being together, anything counts!"
            ],
            correct: 3,
            explanation: "Every moment with you is perfect!"
        },
        {
            question: "What's the one thing I always say to you?",
            options: [
                "You're beautiful",
                "I love you",
                "You make me happy",
                "All of the above, on repeat!"
            ],
            correct: 3,
            explanation: "I can never say it enough! ❤️"
        },
        {
            question: "How much do I love you?",
            options: [
                "A lot",
                "To infinity",
                "More than words can say",
                "Beyond anything measurable 💕"
            ],
            correct: 3,
            explanation: "There's no limit to my love for you!"
        }
    ];

    const startQuiz = () => {
        setGameState('playing');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
        setShowNext(false);
    };

    const selectOption = (index) => {
        if (selectedOption !== null) return; // Already answered

        setSelectedOption(index);
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
        setShowNext(true);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setShowNext(false);
        } else {
            // Quiz finished!
            setGameState('results');
            triggerConfetti();
        }
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff69b4', '#ff8da1', '#ffc0cb']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff69b4', '#ff8da1', '#ffc0cb']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    };

    const getResultMessage = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) {
            return {
                icon: "💯",
                title: "Perfect Score!",
                message: "You know our love story by heart! You're my forever person and I couldn't be more in love with you! 💕"
            };
        } else if (percentage >= 80) {
            return {
                icon: "🥰",
                title: "Amazing!",
                message: "You know me so well! Our connection is truly special. I love you endlessly! ❤️"
            };
        } else if (percentage >= 60) {
            return {
                icon: "💕",
                title: "So Sweet!",
                message: "We're still learning about each other, and that's beautiful! Every day is a new adventure with you!"
            };
        } else {
            return {
                icon: "💋",
                title: "More Quality Time!",
                message: "Looks like we need more date nights! But that's just another excuse to spend time with you 💕"
            };
        }
    };

    const result = getResultMessage();

    return (
        <div className="quiz-container">
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '10%', animationDelay: '0s' }}></div>
                <div className="heart-float" style={{ left: '40%', animationDelay: '3s' }}></div>
                <div className="heart-float" style={{ left: '70%', animationDelay: '6s' }}></div>
                <div className="heart-float" style={{ left: '90%', animationDelay: '9s' }}></div>
            </div>

            <Link to="/" className="back-btn">← Home</Link>

            <div className="quiz-header">
                <h1 className="quiz-title">Love Quiz 💕</h1>
                <p className="quiz-subtitle">How well do you know our love story?</p>
            </div>

            <div className="quiz-card glass">
                {/* Start Screen */}
                {gameState === 'start' && (
                    <div className="quiz-start">
                        <div className="start-icon">💕</div>
                        <p style={{ marginBottom: '30px', fontSize: '1.1em', opacity: 0.9 }}>
                            Test your knowledge about our relationship!<br />
                            Let's see how well you know us 😊
                        </p>
                        <button className="start-btn" onClick={startQuiz}>
                            Start Quiz 💌
                        </button>
                    </div>
                )}

                {/* Playing */}
                {gameState === 'playing' && (
                    <>
                        <div className="quiz-progress">
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                            <div className="progress-text">
                                Question {currentQuestion + 1} of {questions.length}
                            </div>
                        </div>

                        <div className="quiz-question">
                            <span className="question-number">Question {currentQuestion + 1}</span>
                            <h2 className="question-text">{questions[currentQuestion].question}</h2>
                        </div>

                        <div className="quiz-options">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`quiz-option 
                                        ${selectedOption === index ? 'selected' : ''} 
                                        ${selectedOption !== null && index === questions[currentQuestion].correct ? 'correct' : ''}
                                        ${selectedOption === index && index !== questions[currentQuestion].correct ? 'wrong' : ''}`}
                                    onClick={() => selectOption(index)}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                    <span>{option}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            className={`quiz-next ${showNext ? 'visible' : ''}`}
                            onClick={nextQuestion}
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 💕'}
                        </button>
                    </>
                )}

                {/* Results */}
                {gameState === 'results' && (
                    <div className="quiz-results">
                        <div className="results-icon">{result.icon}</div>
                        <div className="results-score">{score}/{questions.length}</div>
                        <h2 className="results-title">{result.title}</h2>
                        <p className="results-message">{result.message}</p>
                        <button className="retry-btn" onClick={startQuiz}>
                            Try Again 🔄
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoveQuiz;
