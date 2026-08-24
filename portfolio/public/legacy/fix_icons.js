const fs = require('fs');
const path = require('path');

const PORTFOLIO_DIR = '/Users/paolopirruccio/.gemini/antigravity/scratch/portfolio';

// Mapping folder to its main webp (relative to the folder)
const MAIN_WEBPS = {
    'ai': 'icon.webp',
    'bussola': 'assets/compass.webp',
    'gym': 'illustration.webp',
    'ppw': 'favicon.webp',
    'uscite': 'logo.webp',
    'codifica': 'immagini/logo.webp',
    'blog': 'icon.webp',
    'desktop': 'icon.webp',
    'library': 'icon.webp',
    '.': 'icon.webp' // root portfolio
};

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Remove all apple-touch-startup-image links
    content = content.replace(/<link\s+rel="apple-touch-startup-image"[^>]*>\s*/gi, '');

    // Get the project folder name (relative to portfolio dir)
    const relativePath = path.relative(PORTFOLIO_DIR, filePath);
    const parts = relativePath.split(path.sep);
    const projectName = parts.length > 1 ? parts[0] : null;

    const mainWebp = projectName && MAIN_WEBPS[projectName] ? MAIN_WEBPS[projectName] : (projectName === null ? MAIN_WEBPS['.'] : null);

    // Replace or remove favicons and apple-touch-icons
    // A link tag with rel="icon" or rel="shortcut icon" or rel="apple-touch-icon"
    const iconRegex = /<link\s+(?:[^>]*\s+)?rel="(?:shortcut\s+)?icon|apple-touch-icon"[^>]*>/gi;

    content = content.replace(iconRegex, (match) => {
        const hrefMatch = match.match(/href="([^"]+)"/i);
        if (!hrefMatch) return match;
        const href = hrefMatch[1];

        // If it's already a main webp or SVG, keep it usually
        if (href.endsWith('.svg')) return match;

        // If it's a known generic/deleted favicon name (like favicon-96x96.webp, apple-touch-icon.webp, favicon.ico)
        if (href.includes('favicon') || href.includes('apple-touch-icon') || href.endsWith('.ico')) {
            if (mainWebp) {
                // Determine the correct relative path from this HTML file to the main webp
                const imgAbsPath = path.join(PORTFOLIO_DIR, projectName || '', mainWebp);
                const htmlDir = path.dirname(filePath);
                let newHref = path.relative(htmlDir, imgAbsPath);

                // Keep the rel attribute but change href and type
                let newTag = match.replace(/href="[^"]+"/, `href="${newHref}"`);
                newTag = newTag.replace(/type="image\/x-icon"/, 'type="image/webp"');
                newTag = newTag.replace(/type="image\/png"/, 'type="image/webp"');
                // Remove sizes if present because the main webp might not match the size
                newTag = newTag.replace(/\s*sizes="[^"]+"/, '');

                return newTag + '\n    ';
            } else {
                // If there's no main webp for this project, just remove the broken link
                return '';
            }
        }

        // Keep other icons
        return match + '\n    ';
    });

    // Also clean up loose empty lines left by replacements
    content = content.replace(/^\s*[\r\n]/gm, '');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${relativePath}`);
    }
}

function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === '.git') continue;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findHtmlFiles(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processHtmlFile(fullPath);
        }
    }
}

findHtmlFiles(PORTFOLIO_DIR);
console.log('Done!');
