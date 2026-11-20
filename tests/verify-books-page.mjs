import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const DIST_DIR = path.resolve('dist');

console.log('🔍 Running Antariksh Books Verification Suite...\n');

// 1. Verify dist/books/index.html exists
const booksHtmlPath = path.join(DIST_DIR, 'books', 'index.html');
assert(fs.existsSync(booksHtmlPath), 'dist/books/index.html must exist');
const booksHtml = fs.readFileSync(booksHtmlPath, 'utf8');

// 2. Check Amazon links & ASINs in books page
console.log('✓ Checking Amazon ASINs and URLs...');
assert(booksHtml.includes('B0HJP2TVSH'), 'Must contain Kindle ASIN B0HJP2TVSH');
assert(booksHtml.includes('B0HJNSGV6L'), 'Must contain Paperback ASIN B0HJNSGV6L');
assert(booksHtml.includes('https://www.amazon.com/dp/B0HJP2TVSH'), 'Must contain Amazon US Kindle URL');
assert(booksHtml.includes('https://www.amazon.com/dp/B0HJNSGV6L'), 'Must contain Amazon US Paperback URL');
assert(booksHtml.includes('https://www.amazon.in/dp/B0HJP2TVSH'), 'Must contain Amazon IN Kindle URL');
assert(booksHtml.includes('https://www.amazon.in/dp/B0HJNSGV6L'), 'Must contain Amazon IN Paperback URL');
assert(booksHtml.includes('target="_blank"'), 'Must have target="_blank" on external links');
assert(booksHtml.includes('rel="noopener noreferrer"'), 'Must have rel="noopener noreferrer" on external links');

// 2b. Check accessibility & semantic hierarchy
console.log('✓ Checking accessibility and semantic hierarchy...');
assert(booksHtml.includes('width="600"') && booksHtml.includes('height="900"'), 'img tags must specify width="600" and height="900"');
assert(booksHtml.includes('<h2 class="books-section-title">'), 'Section title must be an h2 heading for semantic hierarchy');
assert(booksHtml.includes('<blockquote class="book-quote">'), 'Book quote must use semantic blockquote');
assert(booksHtml.includes('/images/books/the-shackleton-ice-rush.jpg"'), 'Social preview image must be present in books metadata');

// 3. Check Book Titles and series mentions
console.log('✓ Checking book titles and universe details...');
assert(booksHtml.includes('The Shackleton Ice Rush'), 'Must include Book 1 title');
assert(booksHtml.includes('The Iron Monsoon'), 'Must include Book 2 title');
assert(booksHtml.includes('The Antariksha Sovereign'), 'Must include Book 3 title');
assert(booksHtml.includes('The Gravity Between Us'), 'Must include companion novella title');
assert(booksHtml.includes('ISRO-punk') || booksHtml.includes('ISRO-Punk') || booksHtml.includes('&ldquo;ISRO-punk&rdquo;'), 'Must mention ISRO-punk subgenre');

// 4. Check image assets copied to dist/ and size optimization (< 400KB each)
console.log('✓ Checking book cover image assets in dist/images/books/...');
const images = [
  'the-shackleton-ice-rush.jpg',
  'the-iron-monsoon.jpg',
  'the-antariksha-sovereign.jpg',
  'the-gravity-between-us.jpg'
];

for (const img of images) {
  const imgPath = path.join(DIST_DIR, 'images', 'books', img);
  assert(fs.existsSync(imgPath), `dist/images/books/${img} must exist`);
  const stat = fs.statSync(imgPath);
  assert(stat.size > 20000 && stat.size < 400000, `dist/images/books/${img} size (${stat.size} bytes) must be optimized (<400KB)`);
  assert(booksHtml.includes(`/images/books/${img}`), `books/index.html must reference /images/books/${img}`);
}

// 5. Check Navigation in home, about, articles, and books
console.log('✓ Checking Header Navigation across pages...');
const checkPages = ['index.html', 'about/index.html', 'articles/index.html', 'books/index.html'];
for (const p of checkPages) {
  const pagePath = path.join(DIST_DIR, p);
  assert(fs.existsSync(pagePath), `Page ${p} must exist`);
  const html = fs.readFileSync(pagePath, 'utf8');
  assert(html.includes('<a href="/books/">Books</a>'), `${p} must include Books nav link in header`);
}

// 6. Check About page bio expansion
console.log('✓ Checking About page fiction section...');
const aboutHtml = fs.readFileSync(path.join(DIST_DIR, 'about', 'index.html'), 'utf8');
assert(aboutHtml.includes('Fiction &amp; Science Fiction') || aboutHtml.includes('Fiction & Science Fiction'), 'About page must have Fiction heading');
assert(aboutHtml.includes('/books/'), 'About page must link to /books/');
assert(aboutHtml.includes('The Shackleton Ice Rush'), 'About page must mention The Shackleton Ice Rush');

// 7. Check sitemap
console.log('✓ Checking sitemaps...');
const sitemap0Path = path.join(DIST_DIR, 'sitemap-0.xml');
assert(fs.existsSync(sitemap0Path), 'dist/sitemap-0.xml must exist');
const sitemap0 = fs.readFileSync(sitemap0Path, 'utf8');
assert(sitemap0.includes('https://kidakaka.com/books/'), 'sitemap-0.xml must contain https://kidakaka.com/books/');

console.log('\n🎉 ✅ All Antariksh Books verification checks passed successfully!\n');
