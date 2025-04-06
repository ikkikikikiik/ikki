"use client";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="neon-text text-sm font-medium fixed bottom-0 pb-4">
            &copy; {`${year}. copy this you filthy casual`}
        </footer>
    );
};

export default Footer;
