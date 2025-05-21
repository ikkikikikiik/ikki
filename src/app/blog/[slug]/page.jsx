import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link'; // For a "Back to Blog" link

// Function to get all post slugs for generateStaticParams
export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);

    return filenames
        .filter(filename => filename.endsWith('.md'))
        .map(filename => ({
            slug: filename.replace(/\.md$/, ''),
        }));
}

// Function to get post data including rendered HTML
async function getPostData(slug) {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        frontmatter: matterResult.data,
    };
}

export default async function PostPage({ params }) {
    const postData = await getPostData(params.slug);

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <article className="prose dark:prose-invert lg:prose-xl">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{postData.frontmatter.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        By {postData.frontmatter.author || 'Unknown Author'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">
                        {new Date(postData.frontmatter.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </header>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
            <div className="mt-12">
                <Link href="/blog" className="text-blue-600 hover:underline">
                    &larr; Back to Blog
                </Link>
            </div>
        </div>
    );
}

// Optional: Add metadata generation
export async function generateMetadata({ params }) {
  const postData = await getPostData(params.slug);
  return {
    title: postData.frontmatter.title,
    description: postData.frontmatter.excerpt || 'A blog post.', // Add excerpt to frontmatter for better SEO
  };
}
