const sanitizeHtml = require('sanitize-html');

const sanitize = (html) => {
    return sanitizeHtml(html, {
        allowedTags: ['*'],
        allowedAttributes: {
            '*': ['*']
        },
        allowedSchemes: ['*']
    });
};

const sanitizeUnsafe = (html) => {
    return sanitizeHtml(html);
};

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