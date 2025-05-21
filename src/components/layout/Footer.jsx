"use client"; // Keep this if it's already there

import Link from 'next/link'; // Add this import

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="neon-text text-sm font-medium w-full text-center pb-4 mt-8">
            <div className="mb-2">
                <Link href="/blog" className="hover:underline">
                    Blog
                </Link>
                {/* Add other footer links here if needed, separated by | or similar */}
            </div>
            &copy; {`${year}. copy this you filthy casual`}
        </footer>
    );
};

export default Footer;
