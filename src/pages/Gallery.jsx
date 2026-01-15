import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/default.css';
import '../styles/gallery.css';

const Gallery = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(0);

    // Sample photos - Replace with your own photos!
    // Add your photos to /public/photos/ folder and update the paths
    const photos = [
        {
            id: 1,
            src: '/photos/photo1.jpg', // Replace with your photo
            caption: 'Our First Photo Together',
            date: 'The day it all began',
            placeholder: true // Remove this when you add real photos
        },
        {
            id: 2,
            src: '/photos/photo2.jpg',
            caption: 'That Special Smile',
            date: 'When you made me laugh so hard',
            placeholder: true
        },
        {
            id: 3,
            src: '/photos/photo3.jpg',
            caption: 'Our Adventure',
            date: 'Exploring the world together',
            placeholder: true
        },
        {
            id: 4,
            src: '/photos/photo4.jpg',
            caption: 'Sunset Moments',
            date: 'When time stood still',
            placeholder: true
        },
        {
            id: 5,
            src: '/photos/photo5.jpg',
            caption: 'Silly Times',
            date: 'Being goofy together',
            placeholder: true
        },
        {
            id: 6,
            src: '/photos/photo6.jpg',
            caption: 'My Favorite View',
            date: 'Looking at you',
            placeholder: true
        },
        {
            id: 7,
            src: '/photos/photo7.jpg',
            caption: 'Cozy Nights',
            date: 'Just the two of us',
            placeholder: true
        },
        {
            id: 8,
            src: '/photos/photo8.jpg',
            caption: 'Forever Grateful',
            date: 'For every moment with you',
            placeholder: true
        }
    ];

    const openLightbox = (index) => {
        setCurrentPhoto(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextPhoto = () => {
        setCurrentPhoto((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <div className="gallery-container">
            <div className="hearts-container">
                <div className="heart-float" style={{ left: '8%', animationDelay: '0s' }}></div>
                <div className="heart-float" style={{ left: '28%', animationDelay: '3s' }}></div>
                <div className="heart-float" style={{ left: '68%', animationDelay: '6s' }}></div>
                <div className="heart-float" style={{ left: '88%', animationDelay: '9s' }}></div>
            </div>

            <Link to="/" className="back-btn">← Home</Link>

            <div className="gallery-header">
                <h1 className="gallery-title">Our Photo Album 📸</h1>
                <p className="gallery-subtitle">Every picture tells our story</p>
            </div>

            <div className="gallery-grid">
                {photos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className="gallery-item"
                        onClick={() => openLightbox(index)}
                    >
                        {photo.placeholder ? (
                            <div className="photo-placeholder">
                                <span className="photo-placeholder-icon">📷</span>
                                <span className="photo-placeholder-text">Add your photo here</span>
                            </div>
                        ) : (
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                className="gallery-image"
                            />
                        )}
                        <div className="gallery-heart">💕</div>
                        <div className="gallery-overlay">
                            <h3 className="gallery-caption">{photo.caption}</h3>
                            <p className="gallery-date">{photo.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="upload-hint glass">
                <div className="upload-hint-icon">💡</div>
                <p>
                    <strong>Tip:</strong> Add your real photos to the <code>/public/photos/</code> folder
                    and update the paths in <code>Gallery.jsx</code> to replace these placeholders
                    with your cherished memories together!
                </p>
            </div>

            {/* Lightbox Modal */}
            <div className={`lightbox ${lightboxOpen ? 'active' : ''}`} onClick={closeLightbox}>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                    <button className="lightbox-close" onClick={closeLightbox}>×</button>
                    <button className="lightbox-nav lightbox-prev" onClick={prevPhoto}>‹</button>
                    <button className="lightbox-nav lightbox-next" onClick={nextPhoto}>›</button>

                    {photos[currentPhoto].placeholder ? (
                        <div className="photo-placeholder" style={{ width: '500px', height: '400px', borderRadius: '16px' }}>
                            <span className="photo-placeholder-icon">📷</span>
                            <span className="photo-placeholder-text">Your beautiful memory here</span>
                        </div>
                    ) : (
                        <img
                            src={photos[currentPhoto].src}
                            alt={photos[currentPhoto].caption}
                            className="lightbox-image"
                        />
                    )}

                    <div className="lightbox-caption">
                        <h3>{photos[currentPhoto].caption}</h3>
                        <p>{photos[currentPhoto].date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
