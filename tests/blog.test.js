// tests/blog.test.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Re-define or adapt getPosts and getPostData for testing if they cannot be directly imported.
// For this example, we'll redefine simplified versions.
// Ideally, you would refactor your actual functions to be more easily importable and testable.

const postsDirectory = path.join(process.cwd(), 'posts');

async function getPostsForTest() {
    const filenames = fs.readdirSync(postsDirectory);
    const posts = filenames
        .filter(filename => filename.endsWith('.md'))
        .map(filename => {
            const slug = filename.replace(/\.md$/, '');
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);
            return {
                slug,
                frontmatter: data,
            };
        });
    posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
    return posts;
}

async function getPostDataForTest(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        return null; // Handle case where post doesn't exist
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
        slug,
        contentHtml,
        frontmatter: matterResult.data,
    };
}

describe('Blog Data Handling', () => {
    // Mock posts directory and files for isolated testing if needed,
    // but here we'll use the actual sample posts.
    // Ensure 'posts/my-first-post.md' and 'posts/another-post.md' exist.

    test('getPostsForTest should return all posts with correct frontmatter', async () => {
        const posts = await getPostsForTest();
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThanOrEqual(2); // Assuming at least 2 sample posts

        posts.forEach(post => {
            expect(post).toHaveProperty('slug');
            expect(post).toHaveProperty('frontmatter');
            expect(post.frontmatter).toHaveProperty('title');
            expect(post.frontmatter).toHaveProperty('date');
            expect(post.frontmatter).toHaveProperty('author');
        });

        // Check if posts are sorted by date (most recent first)
        if (posts.length >= 2) {
            const date1 = new Date(posts[0].frontmatter.date);
            const date2 = new Date(posts[1].frontmatter.date);
            expect(date1).toBeGreaterThanOrEqual(date2);
        }
    });

    test('getPostDataForTest should return correct data for a valid slug', async () => {
        const slug = 'my-first-post'; // Assuming this post exists
        const postData = await getPostDataForTest(slug);

        expect(postData).not.toBeNull();
        expect(postData).toHaveProperty('slug', slug);
        expect(postData).toHaveProperty('contentHtml');
        expect(typeof postData.contentHtml).toBe('string');
        expect(postData.contentHtml.length).toBeGreaterThan(0);
        expect(postData).toHaveProperty('frontmatter');
        expect(postData.frontmatter).toHaveProperty('title', 'My First Blog Post');
        expect(postData.frontmatter).toHaveProperty('date');
        expect(postData.frontmatter).toHaveProperty('author');
    });

    test('getPostDataForTest should return null or throw for an invalid slug', async () => {
        const slug = 'non-existent-post';
        const postData = await getPostDataForTest(slug);
        expect(postData).toBeNull(); // Or expect an error if designed to throw
    });
});

// Note: To run these tests, you'd typically use a test runner like Jest.
// You would need to add Jest to your devDependencies: `npm install --save-dev jest`
// and configure it, perhaps by adding a script to package.json:
// "test": "jest"
// This subtask only creates the test file. Setting up and running the runner is separate.
