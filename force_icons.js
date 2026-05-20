const fs = require('fs');
const path = require('path');

const PORTFOLIO_DIR = '/Users/paolopirruccio/.gemini/antigravity/scratch/portfolio';

function forceIcon(filePath, iconRelPath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove all existing icon and apple-touch-icon links
    content = content.replace(/<link\s+rel="(?:shortcut\s+)?icon"[^>]*>\s*/gi, '');
    content = content.replace(/<link\s+rel="apple-touch-icon"[^>]*>\s*/gi, '');

    // Inject the new icon tags into the head
    const newTags = `\n    <link rel="icon" type="image/webp" href="${iconRelPath}">\n    <link rel="apple-touch-icon" href="${iconRelPath}">\n`;
    content = content.replace('</head>', `${newTags}</head>`);

    // Clean up purely empty lines caused by removal
    content = content.replace(/^\s*[\r\n]/gm, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Forced icons in ${path.relative(PORTFOLIO_DIR, filePath)} -> ${iconRelPath}`);
}

// 1. Root portfolio
forceIcon(path.join(PORTFOLIO_DIR, 'index.html'), 'icon.webp');
forceIcon(path.join(PORTFOLIO_DIR, 'gallery.html'), 'icon.webp');

// 2. AI
forceIcon(path.join(PORTFOLIO_DIR, 'ai/index.html'), 'icon.webp');

// 3. Desktop
forceIcon(path.join(PORTFOLIO_DIR, 'desktop/index.html'), 'icon.webp');

// 4. Library
forceIcon(path.join(PORTFOLIO_DIR, 'library/index.html'), 'icon.webp');

// 5. Blog
forceIcon(path.join(PORTFOLIO_DIR, 'blog/index.html'), 'icon.webp');
// And all BDD files since they are the actual blog app?
const bddDir = path.join(PORTFOLIO_DIR, 'bdd');
if (fs.existsSync(bddDir)) {
    const files = fs.readdirSync(bddDir).filter(f => f.endsWith('.html') && f !== 'components');
    files.forEach(f => {
        // bdd pages need to go one dir up to portfolio, then into blog/icon.webp, OR use their own?
        // Let's use `../blog/icon.webp`
        forceIcon(path.join(bddDir, f), '../blog/icon.webp');
    });
}
