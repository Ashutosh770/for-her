import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/default.css';
import '../styles/messages.css';

const Messages = () => {
    const [activeConversation, setActiveConversation] = useState('sweet');

    // Sample conversations - customize these with your real messages!
    const conversations = {
        sweet: {
            title: 'Sweet Moments 💕',
            messages: [
                { type: 'received', text: "Good morning baby! 🌅", time: '8:02 AM' },
                { type: 'sent', text: "Good morning my love! Woke up thinking about you 💕", time: '8:05 AM' },
                { type: 'received', text: "You always know how to make me smile 😊", time: '8:06 AM' },
                { type: 'sent', text: "That's because your smile is my favorite thing in the world", time: '8:07 AM', special: true },
                { type: 'received', text: "Stop it, you're making me blush! 🙈", time: '8:08 AM' },
                { type: 'sent', text: "Never! I'll keep making you blush forever ❤️", time: '8:09 AM', heart: true },
            ]
        },
        funny: {
            title: 'Funny Moments 😂',
            messages: [
                { type: 'sent', text: "Remember when you tried to cook for me? 👀", time: '7:30 PM' },
                { type: 'received', text: "OMG don't remind me 😭😂", time: '7:31 PM' },
                { type: 'sent', text: "The smoke alarm became a dinner bell that day 🔔🔥", time: '7:32 PM' },
                { type: 'received', text: "HEY! It was supposed to be romantic!", time: '7:33 PM' },
                { type: 'sent', text: "It WAS romantic! We ordered pizza together 🍕💕", time: '7:34 PM', special: true },
                { type: 'received', text: "Okay fine, that was actually perfect 💕", time: '7:35 PM', heart: true },
            ]
        },
        deep: {
            title: 'Deep Talks 💭',
            messages: [
                { type: 'received', text: "Can I tell you something?", time: '11:45 PM' },
                { type: 'sent', text: "Always. You can tell me anything", time: '11:45 PM' },
                { type: 'received', text: "I've never felt this safe with anyone before", time: '11:47 PM' },
                { type: 'sent', text: "And I've never felt this lucky to have someone in my life", time: '11:48 PM' },
                { type: 'received', text: "I don't know what I did to deserve you", time: '11:49 PM' },
                { type: 'sent', text: "You were just you. And that was more than enough. You ARE enough. ❤️", time: '11:50 PM', special: true, heart: true },
                { type: 'received', text: "I love you so much 😭💕", time: '11:51 PM' },
                { type: 'sent', text: "I love you more, and I always will ❤️", time: '11:52 PM' },
            ]
        },
        latenight: {
            title: 'Late Night Calls 🌙',
            messages: [
                { type: 'sent', text: "Can't sleep. Missing you 🌙", time: '2:30 AM' },
                { type: 'received', text: "I was just about to text you the same thing!", time: '2:31 AM' },
                { type: 'sent', text: "I wish you were here right now", time: '2:32 AM' },
                { type: 'received', text: "Me too. I'd hold you so tight 🤗", time: '2:33 AM' },
                { type: 'sent', text: "Soon. We'll have all the time in the world together", time: '2:34 AM', special: true },
                { type: 'received', text: "Promise?", time: '2:35 AM' },
                { type: 'sent', text: "Promise. Now try to sleep, my love. Sweet dreams of us 💫", time: '2:36 AM', heart: true },
            ]
        }
    };

    const currentConv = conversations[activeConversation];

    return (
        <div className="messages-container">
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '5%', animationDelay: '0s' }}></div>
                <div className="heart-float" style={{ left: '25%', animationDelay: '2s' }}></div>
                <div className="heart-float" style={{ left: '75%', animationDelay: '5s' }}></div>
                <div className="heart-float" style={{ left: '95%', animationDelay: '8s' }}></div>
            </div>

            <Link to="/" className="back-btn">← Home</Link>

            <div className="messages-header">
                <h1 className="messages-title">Our Messages 💬</h1>
                <p className="messages-subtitle">Every text with you is a treasure</p>
            </div>

            <div className="conversation-tabs">
                {Object.keys(conversations).map(key => (
                    <button
                        key={key}
                        className={`conv-tab ${activeConversation === key ? 'active' : ''}`}
                        onClick={() => setActiveConversation(key)}
                    >
                        {conversations[key].title}
                    </button>
                ))}
            </div>

            <div className="phone-frame">
                <div className="phone-notch"></div>

                <div className="chat-header">
                    <div className="chat-avatar">💕</div>
                    <div className="chat-info">
                        <h3>My Love ❤️</h3>
                        <span>Always in my heart</span>
                    </div>
                </div>

                <div className="chat-body">
                    <div className="message-group">
                        <div className="message-date">{currentConv.title}</div>

                        {currentConv.messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.type} ${msg.special ? 'special' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="message-text">{msg.text}</div>
                                <div className="message-time">{msg.time}</div>
                                {msg.heart && <span className="message-heart">❤️</span>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chat-footer">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Our story continues..."
                        readOnly
                    />
                    <button className="send-btn">💕</button>
                </div>
            </div>
        </div>
    );
};

export default Messages;
