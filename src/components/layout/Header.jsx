import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold hover:text-gray-300">
                    My Site
                </Link>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/blog" className="hover:text-gray-300">
                            Blog
                        </Link>
                    </li>
                    {/* Add other navigation links here if needed */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
