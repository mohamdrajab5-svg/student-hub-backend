const admin = require('firebase-admin');

// --- 1. Initialize Firebase Admin ---
// This code reads the JSON string you just pasted into Render
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// --- 2. The new Authentication Middleware ---
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // This is where Firebase verifies the token from the frontend
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // We add the user's info to the request object
    // This lets our other routes know who the user is
    req.user = decodedToken; 

    next(); // Token is valid, proceed to the next function (e.g., createPost)

  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
