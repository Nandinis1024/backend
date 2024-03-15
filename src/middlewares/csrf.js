const crypto = require('crypto');
const cookieParser = require('cookie-parser');


const app = require('express')();
app.use(cookieParser());

let tempToken = '';
// Generate CSRF token
const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware to attach CSRF token to responses
const attachCsrfToken = (req, res, next) => {
  const csrfToken = generateCsrfToken();
  res.cookie('csrfToken', csrfToken, { httpOnly: true });
  res.locals.csrfToken = csrfToken;
  tempToken = csrfToken;
  next();
};


// Middleware to validate CSRF token
const validateCsrfToken = (req, res, next) => {
  console.log("the tempToken is:",tempToken);
  const csrfToken = tempToken;
  console.log("headers" ,req.headers['csrf-token'])
  const csrfHeader = req.headers['csrf-token'];

  if (!csrfToken || csrfToken !== csrfHeader) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
    next();
  };

module.exports = { attachCsrfToken, validateCsrfToken };
