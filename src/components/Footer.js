import React from 'react';
import '../stylesheets/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p />
                <p>© {currentYear} Kota Mizuno. All rights reserved.</p>
                <p>
                    <div className="links-container">
                        <div className="link-container">
                            <a href="https://github.com/kotta-27/qpizza-game" target="_blank" rel="noopener noreferrer">[GitHub Repository]</a>
                        </div>
                        <div className="link-container">
                            <a href="https://www.kotap.dev" target="_blank" rel="noopener noreferrer">[My Portfolio]</a>
                        </div>
                    </div>
                </p>
            </div>
        </footer>
    );
};

export default Footer;