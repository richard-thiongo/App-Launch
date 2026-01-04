import React, { useState, useEffect } from 'react';
import './../styles/landing.css';

// Import only the icons we need
import { 
  Shield,
  AlertCircle,
  Target,
  ClipboardCheck,
  LineChart,
  UserCog,
  Building,
  UserCheck,
  GraduationCap,
  CheckSquare,
  School,
  User,
  Mail,
  Phone,
  MessageCircle,
  Menu,
  X,
  Clock,
  ChevronRight,
  Zap,
  Sparkles,
  Camera,
  XCircle,
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

const Landing = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isLaunched, setIsLaunched] = useState(false);
    const [expandedProblems, setExpandedProblems] = useState({});

    // FIXED LAUNCH DATE - Same for all users
    // Set this to your actual launch date (1.5 months from now would be approximately 2/15/2026)
    const LAUNCH_DATE = new Date('2026-02-15T00:00:00');

    // Calculate time until launch - FIXED DATE
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = LAUNCH_DATE.getTime() - now.getTime();
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                setTimeLeft({ days, hours, minutes, seconds });
                setIsLaunched(false);
            } else {
                // Launch has arrived!
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsLaunched(true);
            }
        };
        
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        
        return () => clearInterval(timer);
    }, []);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    const toggleProblemExpand = (problemId) => {
        setExpandedProblems(prev => ({
            ...prev,
            [problemId]: !prev[problemId]
        }));
    };

    const JoinWaitListButton = ({ variant = 'default' }) => {
        const buttonClass = variant === 'primary' ? 'btn-primary' : 
                           variant === 'large' ? 'btn-large' : 'btn-default';
        
        return (
            <button 
                className={`join-waitlist-btn ${buttonClass}`}
                onClick={() => setShowModal(true)}
                type="button"
            >
                {isLaunched ? 'Get Started Now' : 'Join Waitlist'}
                <ChevronRight size={18} className="btn-icon" />
            </button>
        );
    };

    return (
        <div className="landing-container">
            {/* Animated Background Elements */}
            <div className="animated-bg">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>

            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-content">
                    <div className="logo">
                        WAZI
                    </div>
                    
                    {/* Desktop Navigation - NO ICONS */}
                    <div className="nav-links desktop-nav">
                        <button 
                            className={activeSection === 'overview' ? 'active' : ''}
                            onClick={() => scrollToSection('overview')}
                        >
                            Overview
                        </button>
                        <button 
                            className={activeSection === 'problems' ? 'active' : ''}
                            onClick={() => scrollToSection('problems')}
                        >
                            Problems We Solve
                        </button>
                        <button 
                            className={activeSection === 'workflows' ? 'active' : ''}
                            onClick={() => scrollToSection('workflows')}
                        >
                            Workflows
                        </button>
                        <button 
                            className={activeSection === 'details' ? 'active' : ''}
                            onClick={() => scrollToSection('details')}
                        >
                            Platform Details
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Waitlist Button */}
                    <div className="desktop-waitlist-btn">
                        <JoinWaitListButton />
                    </div>
                </div>

                {/* Mobile Navigation Menu - NO ICONS */}
                {isMobileMenuOpen && (
                    <div className="mobile-nav-menu">
                        <div className="mobile-timer">
                            <Clock size={16} />
                            <span>
                                {isLaunched ? 'Launched!' : `Launching in ${timeLeft.days} days`}
                            </span>
                        </div>
                        <button 
                            className={activeSection === 'overview' ? 'active' : ''}
                            onClick={() => scrollToSection('overview')}
                        >
                            Overview
                        </button>
                        <button 
                            className={activeSection === 'problems' ? 'active' : ''}
                            onClick={() => scrollToSection('problems')}
                        >
                            Problems We Solve
                        </button>
                        <button 
                            className={activeSection === 'workflows' ? 'active' : ''}
                            onClick={() => scrollToSection('workflows')}
                        >
                            Workflows
                        </button>
                        <button 
                            className={activeSection === 'details' ? 'active' : ''}
                            onClick={() => scrollToSection('details')}
                        >
                            Platform Details
                        </button>
                        <div className="mobile-waitlist-btn">
                            <JoinWaitListButton />
                        </div>
                    </div>
                )}
            </nav>

            {/* Join Waitlist Modal */}
            {showModal && (
                <div 
                    className="modal-overlay" 
                    onClick={handleOverlayClick}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{isLaunched ? 'Get Started with Wazi' : 'Join Wazi Waitlist'}</h2>
                            <div className="modal-timer">
                                <Clock size={20} />
                                <span>
                                    {isLaunched ? 'Now Available!' : `Launching in ${timeLeft.days} days`}
                                </span>
                            </div>
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
                            <p>
                                {isLaunched 
                                    ? 'Wazi is now available! Send us a message via WhatsApp to get started with implementing Wazi in your school.'
                                    : 'Send us a message via WhatsApp to join our waitlist. We\'ll contact you when Wazi is available for your school.'
                                }
                            </p>
                            
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
                                        placeholder={
                                            isLaunched 
                                                ? "Tell us about your school and when you'd like to start with Wazi..."
                                                : "Tell us about your school's needs and why you're interested in Wazi..."
                                        }
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
                                        {isLaunched ? 'Get Started via WhatsApp' : 'Join via WhatsApp'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section with Timer */}
            <section className="hero" id="overview">
                <div className="hero-content">
                    {/* Hero Timer */}
                    {!isLaunched ? (
                        <div className="hero-timer">
                            <div className="timer-card">
                                <Clock size={24} className="hero-timer-icon" />
                                <div className="timer-content">
                                    <span className="timer-label">Launching In</span>
                                    <div className="timer-numbers">
                                        <div className="time-block">
                                            <span className="time-value">{timeLeft.days}</span>
                                            <span className="time-unit">Days</span>
                                        </div>
                                        <div className="time-separator">:</div>
                                        <div className="time-block">
                                            <span className="time-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                                            <span className="time-unit">Hours</span>
                                        </div>
                                        <div className="time-separator">:</div>
                                        <div className="time-block">
                                            <span className="time-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                            <span className="time-unit">Minutes</span>
                                        </div>
                                        <div className="time-separator">:</div>
                                        <div className="time-block">
                                            <span className="time-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                                            <span className="time-unit">Seconds</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="launched-banner">
                            <div className="launched-icon">
                                <Zap size={28} />
                            </div>
                            <div className="launched-text">
                                <h3>Wazi is Now Live!</h3>
                                <p>Start transforming your school's discipline management today</p>
                            </div>
                        </div>
                    )}

                    <h1 className="hero-title">
                        Wazi Smart Discipline Management System
                    </h1>
                    
                    <p className="subtitle">Digital platform for managing student behavior and discipline in schools</p>
                    
                    <p className="description">
                        Move away from paper records to a single, centralized system for tracking 
                        and handling discipline matters efficiently.
                    </p>
                    
                    <div className="cta-buttons">
                        <JoinWaitListButton variant="primary" />
                        <button 
                            className="secondary-btn"
                            onClick={() => scrollToSection('problems')}
                        >
                            View Problems We Solve
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Problems We Solve Section - REPLACING Features Section */}
            <section className="problems-section" id="problems">
                <h2>Problems We Solve</h2>
                <p className="section-subtitle">Addressing real challenges in school discipline management</p>
                
                <div className="problems-grid">
                    {/* Problem 1 - The main scenario */}
                    <div className="problem-card main-problem">
                        <div className="problem-header">
                            <div className="problem-tag ">
                              
                                <span>Common Scenario</span>
                            </div>
                            <h3>Accountability Gaps in He-Said-She-Said Situations</h3>
                        </div>
                        
                        <div className="problem-content">
                            <p className="problem-description">
                                <strong>Think of this scenario:</strong> A teacher punishes a student harshly, 
                                and it creates a whole drama where everyone has their own perspective. 
                                Some side with the teacher, others with the student, and administrators 
                                are stuck in the middle trying to piece together what really happened.
                            </p>
                            
                            {!expandedProblems['main'] && (
                                <div className="problem-preview">
                                    <p>Without proper documentation, accountability is lost, trust is damaged, and conflicts remain unresolved...</p>
                                    <button 
                                        className="learn-more-btn"
                                        onClick={() => toggleProblemExpand('main')}
                                    >
                                        Learn More
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            )}
                            
                            {expandedProblems['main'] && (
                                <div className="problem-details">
                                    <div className="scenario-issues">
                                        <div className="issue">
                                            <div className="issue-icon">
                                                <XCircle size={20} />
                                            </div>
                                            <div className="issue-content">
                                                <h4>Lost Accountability</h4>
                                                <p>No clear record of whether the incident was properly reported</p>
                                            </div>
                                        </div>
                                        
                                        <div className="issue">
                                            <div className="issue-icon">
                                                <XCircle size={20} />
                                            </div>
                                            <div className="issue-content">
                                                <h4>Missing Evidence</h4>
                                                <p>No documentation or proof of what actually occurred</p>
                                            </div>
                                        </div>
                                        
                                        <div className="issue">
                                            <div className="issue-icon">
                                                <XCircle size={20} />
                                            </div>
                                            <div className="issue-content">
                                                <h4>Action Discrepancy</h4>
                                                <p>Disciplinary actions don't match what was initially recorded</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="wazi-solution">
                                        <div className="solution-badge">
                                            <Shield size={16} />
                                            <span>Wazi Solution</span>
                                        </div>
                                        <h4>Restoring Accountability Through Documentation</h4>
                                        <p>
                                            Wazi ensures transparency by requiring teachers to document whether incidents 
                                            were reported, whether evidence was provided, and verifying that disciplinary 
                                            actions match what was recorded during incident reporting.
                                        </p>
                                        
                                        {/* Fun Fact */}
                                        <div className="fun-fact">
                                            <div className="fun-fact-icon">
                                                <Sparkles size={18} />
                                            </div>
                                            <div className="fun-fact-content">
                                                <p>
                                                    <strong>Fun Fact:</strong> Our mobile app lets teachers take photos or upload images 
                                                    directly during incident reporting for immediate evidence capture!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="show-less-btn"
                                        onClick={() => toggleProblemExpand('main')}
                                    >
                                        Show Less
                                        <ChevronRight size={14} className="rotated" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Other Problems */}
                    {[
                        {
                            id: 'paper',
                            icon: <FileText size={24} />,
                            title: 'Paper-Based Chaos & Lost Records',
                            short: 'Discipline forms get lost, incomplete, or buried in filing cabinets...',
                            full: 'Discipline forms get lost, incomplete, or buried in filing cabinets, making historical tracking impossible and creating administrative nightmares when records are needed for parent meetings or policy reviews.',
                            solution: 'Centralized digital system with complete incident history, easy search functionality, and automated backup to ensure no record is ever lost.'
                        },
                        {
                            id: 'data',
                            icon: <TrendingUp size={24} />,
                            title: 'No Data for Decision Making',
                            short: 'Administrators lack insights into behavior patterns...',
                            full: 'Administrators lack insights into behavior patterns, repeat offenders, or effective interventions. Without data, it\'s impossible to identify trends, measure intervention effectiveness, or make informed decisions about school-wide discipline policies.',
                            solution: 'Comprehensive analytics dashboard showing trends, patterns, and intervention effectiveness with customizable reports and real-time data visualization.'
                        },
                        {
                            id: 'inconsistent',
                            icon: <Users size={24} />,
                            title: 'Inconsistent Discipline Application',
                            short: 'Different teachers apply different standards...',
                            full: 'Different teachers apply different standards, leading to perceptions of unfair treatment among students and parents. This inconsistency undermines trust in the school\'s disciplinary system and can lead to complaints and conflicts.',
                            solution: 'Standardized workflows and tier-based consequence guidelines that ensure consistency across all teachers and administrators, with automated escalation paths.'
                        },
                        {
                            id: 'admin',
                            icon: <BookOpen size={24} />,
                            title: 'Administrative Overload',
                            short: 'School admins spend excessive time on discipline paperwork...',
                            full: 'School admins spend excessive time on discipline paperwork instead of strategic leadership. Manual tracking, follow-ups, and report generation consume hours that could be better spent on educational leadership and student support.',
                            solution: 'Automated workflows and reporting that reduce administrative burden by up to 70%, freeing administrators for more meaningful educational leadership.'
                        }
                    ].map(problem => (
                        <div key={problem.id} className="problem-card">
                            <div className="problem-icon">
                                {problem.icon}
                            </div>
                            <h3>{problem.title}</h3>
                            
                            <div className="problem-content">
                                <p className="problem-description">
                                    {expandedProblems[problem.id] ? problem.full : problem.short}
                                </p>
                                
                                {!expandedProblems[problem.id] && (
                                    <button 
                                        className="learn-more-btn"
                                        onClick={() => toggleProblemExpand(problem.id)}
                                    >
                                        Learn More
                                        <ChevronRight size={14} />
                                    </button>
                                )}
                                
                                {expandedProblems[problem.id] && (
                                    <div className="problem-details">
                                        <div className="wazi-solution">
                                            <div className="solution-badge">
                                                <Shield size={16} />
                                                <span>Wazi Solution</span>
                                            </div>
                                            <p>{problem.solution}</p>
                                        </div>
                                        
                                        <button 
                                            className="show-less-btn"
                                            onClick={() => toggleProblemExpand(problem.id)}
                                        >
                                            Show Less
                                            <ChevronRight size={14} className="rotated" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Multi-platform access note */}
                <div className="platform-access-note">
                    <div className="access-content">
                        <div className="access-icon">
                            <Camera size={24} />
                        </div>
                        <div>
                            <h4>Accessible Anywhere, Anytime</h4>
                            <p>
                                Wazi is available as both a web app and mobile app, making it easy to manage discipline 
                                on-the-go and ensure documentation happens in real-time, not after the fact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflows Section */}
            <section className="workflows" id="workflows">
                <h2>Core Workflows</h2>
                <div className="workflow-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <div className="step-icon">
                                <AlertCircle size={20} />
                            </div>
                            <h3>Incident Reporting</h3>
                            <p>Teachers report student incidents via mobile app or web portal</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <div className="step-icon">
                                <Target size={20} />
                            </div>
                            <h3>Tier Classification</h3>
                            <p>Incidents categorized as A/B-tier (teacher managed) or S-tier (admin reviewed)</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <div className="step-icon">
                                <ClipboardCheck size={20} />
                            </div>
                            <h3>Consequence Management</h3>
                            <p>Appropriate consequences assigned based on severity and school policy</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <div className="step-icon">
                                <LineChart size={20} />
                            </div>
                            <h3>Tracking & Analysis</h3>
                            <p>Complete tracking of incidents with data analysis for pattern recognition</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Details Section */}
            <section className="details" id="details">
                <h2>Platform Details</h2>
                
                <div className="doc-section">
                    <h3>User Roles</h3>
                    <div className="roles-grid">
                        <div className="role-card">
                            <div className="role-icon">
                                <UserCog size={24} />
                            </div>
                            <h4>Super Admin</h4>
                            <ul>
                                <li>✓ Manages overall platform</li>
                                <li>✓ Oversees all system operations</li>
                                <li>✓ Handles school registrations</li>
                                <li>✓ Monitors platform performance</li>
                            </ul>
                        </div>
                        <div className="role-card">
                            <div className="role-icon">
                                <Building size={24} />
                            </div>
                            <h4>School Admin</h4>
                            <ul>
                                <li>✓ Manages all school activities</li>
                                <li>✓ Full access via Web Portal</li>
                                <li>✓ Reviews S-tier cases</li>
                                <li>✓ Generates reports and exports data</li>
                            </ul>
                        </div>
                        <div className="role-card">
                            <div className="role-icon">
                                <UserCheck size={24} />
                            </div>
                            <h4>Teacher</h4>
                            <ul>
                                <li>✓ Handles daily discipline tasks</li>
                                <li>✓ Reports student incidents</li>
                                <li>✓ Manages student profiles</li>
                                <li>✓ Assigns consequences for A/B-tier</li>
                            </ul>
                        </div>
                        <div className="role-card">
                            <div className="role-icon">
                                <GraduationCap size={24} />
                            </div>
                            <h4>Student</h4>
                            <ul>
                                <li>✓ Views personal incident history</li>
                                <li>✓ Tracks assigned consequences</li>
                                <li>✓ Access via Student Web Portal</li>
                                <li>✓ Future: Appeal submission</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="doc-section">
                    <h3>How Users Access the System</h3>
                    <div className="access-grid">
                        <div className="access-item">
                            <div className="access-icon">
                                <UserCheck size={20} />
                            </div>
                            <div>
                                <strong>Teachers:</strong> Full access via Mobile App & Web Portal
                            </div>
                        </div>
                        <div className="access-item">
                            <div className="access-icon">
                                <Building size={20} />
                            </div>
                            <div>
                                <strong>School Admins:</strong> Full management via Web Portal, view-only via Mobile App
                            </div>
                        </div>
                        <div className="access-item">
                            <div className="access-icon">
                                <UserCog size={20} />
                            </div>
                            <div>
                                <strong>Super Admin:</strong> Platform-wide oversight via Web Portal
                            </div>
                        </div>
                        <div className="access-item">
                            <div className="access-icon">
                                <GraduationCap size={20} />
                            </div>
                            <div>
                                <strong>Students:</strong> View-only access via Student Web Portal
                            </div>
                        </div>
                    </div>
                </div>

                <div className="doc-section">
                    <h3>Value Delivered</h3>
                    <div className="value-cards">
                        <div className="value-card">
                            <div className="value-icon">
                                <School size={24} />
                            </div>
                            <h4>For Schools</h4>
                            <p>Lowers administrative work, supports data-driven decision-making, improves communication, provides clear history for policy review.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <User size={24} />
                            </div>
                            <h4>For Teachers</h4>
                            <p>Simplifies reporting, gives quick access to student history, provides classroom insights.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <GraduationCap size={24} />
                            </div>
                            <h4>For Students</h4>
                            <p>Creates transparent process, helps track personal accountability, promotes fair treatment.</p>
                        </div>
                    </div>
                </div>

                {/* Waitlist CTA in Details Section */}
                <div className="waitlist-cta">
                    {!isLaunched ? (
                        <div className="waitlist-timer">
                            <Clock size={28} />
                            <div className="timer-info">
                                <h4>Launch Countdown</h4>
                                <div className="timer-display">
                                    <span className="timer-item">
                                        <span className="timer-digit">{timeLeft.days}</span>
                                        <span className="timer-text">Days</span>
                                    </span>
                                    <span className="timer-colon">:</span>
                                    <span className="timer-item">
                                        <span className="timer-digit">{timeLeft.hours.toString().padStart(2, '0')}</span>
                                        <span className="timer-text">Hours</span>
                                    </span>
                                    <span className="timer-colon">:</span>
                                    <span className="timer-item">
                                        <span className="timer-digit">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                        <span className="timer-text">Minutes</span>
                                    </span>
                                    <span className="timer-colon">:</span>
                                    <span className="timer-item">
                                        <span className="timer-digit">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                                        <span className="timer-text">Seconds</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="launched-celebration">
                            <div className="celebration-icon">
                                <Zap size={24} />
                            </div>
                            <div className="celebration-text">
                                <h4>Wazi is Now Live!</h4>
                                <p>Join schools already transforming their discipline management</p>
                            </div>
                        </div>
                    )}
                    
                    <h3>
                        {isLaunched 
                            ? 'Ready to Transform Your School\'s Discipline Management?'
                            : 'Ready to Transform Your School\'s Discipline Management?'
                        }
                    </h3>
                    <p>
                        {isLaunched
                            ? 'Join schools already implementing Wazi Smart Discipline Management System. Get started today!'
                            : 'Join our waitlist to be among the first schools to implement Wazi Smart Discipline Management System.'
                        }
                    </p>
                    <JoinWaitListButton variant="large" />
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>
                            Wazi
                        </h3>
                        <p>Smart Discipline Management System</p>
                        <p>Transforming school discipline management through technology</p>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p><Mail size={16} /> Email: support@wazi-system.com</p>
                        <p><Phone size={16} /> Phone: +254 705 417 355</p>
                        <p><MessageCircle size={16} /> WhatsApp: +254 705 417 355</p>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <button onClick={() => scrollToSection('overview')}>
                            Overview
                        </button>
                        <button onClick={() => scrollToSection('problems')}>
                            Problems We Solve
                        </button>
                        <button onClick={() => scrollToSection('workflows')}>
                            Workflows
                        </button>
                        <button onClick={() => scrollToSection('details')}>
                            Platform Details
                        </button>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Wazi Smart Discipline Management System. All rights reserved.</p>
                    <div className="footer-timer">
                        <Clock size={14} />
                        <span>
                            {isLaunched 
                                ? 'Now Available!'
                                : `Launching on `
                            }
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;