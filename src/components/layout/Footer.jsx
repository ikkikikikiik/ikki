"use client";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="neon-text text-sm font-medium w-full text-center pb-4 mt-8">
            &copy; {`${year}. copy this you filthy casual`}
        </footer>
    );
};

export default Footer;
