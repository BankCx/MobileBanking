const sanitizeHtml = require('sanitize-html');

// Intentionally vulnerable - using vulnerable sanitize-html version
// CVE-2017-16016: Allows XSS through improper HTML sanitization
const sanitize = (html) => {
    return sanitizeHtml(html, {
        allowedTags: ['*'], // Allow all tags
        allowedAttributes: {
            '*': ['*'] // Allow all attributes
        },
        allowedSchemes: ['*'] // Allow all schemes
    });
};

// Intentionally vulnerable - using vulnerable sanitize-html version with no restrictions
const sanitizeUnsafe = (html) => {
    return sanitizeHtml(html); // No options provided, uses default unsafe configuration
};

// Intentionally vulnerable - using vulnerable sanitize-html version with weak restrictions
const sanitizeWeak = (html) => {
    return sanitizeHtml(html, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
        allowedAttributes: {
            'a': ['href']
        }
    });
};

module.exports = {
    sanitize,
    sanitizeUnsafe,
    sanitizeWeak
}; 