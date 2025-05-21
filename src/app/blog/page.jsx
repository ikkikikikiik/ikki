import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Function to get all posts
async function getPosts() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames
        .filter(filename => filename.endsWith('.md'))
        .map(filename => {
            const slug = filename.replace(/\.md$/, '');
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents); // Only frontmatter needed for listing

            return {
                slug,
                frontmatter: data,
            };
        });

    // Sort posts by date in descending order (optional)
    posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

    return posts;
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
            <div className="grid gap-6">
                {posts.map(post => (
                    <div key={post.slug} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                                {post.frontmatter.title}
                            </Link>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                            By {post.frontmatter.author || 'Unknown Author'}
                        </p>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">
                            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
