import React, { useState, useEffect } from 'react';
import '../styles/site.css';

const JoinWaitListButton = ({ variant = 'default' }) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    // Close modal when clicking outside
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [showModal]);

    const handleJoinWaitlist = (e) => {
        e.preventDefault();
        
        if (!message.trim() || !schoolName.trim() || !contactPerson.trim() || !email.trim()) {
            alert('Please fill in all fields');
            return;
        }

        const phoneNumber = '254705417355';
        const fullMessage = `WAZI Waitlist Inquiry%0A%0ASchool: ${schoolName}%0AContact Person: ${contactPerson}%0AEmail: ${email}%0A%0AMessage: ${message}`;
        
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${fullMessage}`;
        
        window.open(whatsappURL, '_blank');
        
        // Reset form
        setMessage('');
        setSchoolName('');
        setContactPerson('');
        setEmail('');
        setShowModal(false);
        
        alert('Thank you for your interest! You are being redirected to WhatsApp.');
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    const buttonClass = variant === 'primary' ? 'btn-primary' : 
                       variant === 'large' ? 'btn-large' : 'btn-default';

    return (
        <>
            <button 
                className={`join-waitlist-btn ${buttonClass}`}
                onClick={() => setShowModal(true)}
                type="button"
            >
                Join Waitlist
            </button>

            {showModal && (
                <div 
                    className="modal-overlay" 
                    onClick={handleOverlayClick}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Join Wazi Waitlist</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                                type="button"
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <p>Send us a message via WhatsApp to join our waitlist. We'll contact you when Wazi is available for your school.</p>
                            
                            <form onSubmit={handleJoinWaitlist}>
                                <div className="form-group">
                                    <label htmlFor="schoolName">School Name *</label>
                                    <input
                                        type="text"
                                        id="schoolName"
                                        value={schoolName}
                                        onChange={(e) => setSchoolName(e.target.value)}
                                        placeholder="Enter your school name"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="contactPerson">Contact Person *</label>
                                    <input
                                        type="text"
                                        id="contactPerson"
                                        value={contactPerson}
                                        onChange={(e) => setContactPerson(e.target.value)}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@school.edu"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="message">Your Message *</label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Tell us about your school's needs and why you're interested in Wazi..."
                                        rows="4"
                                        required
                                    />
                                </div>
                                
                                <div className="modal-footer">
                                    <button 
                                        className="btn-secondary"
                                        onClick={() => setShowModal(false)}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="btn-primary"
                                        type="submit"
                                    >
                                        Send via WhatsApp
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default JoinWaitListButton;