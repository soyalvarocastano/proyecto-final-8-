// server.js
import app from './app.js';

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`✅ Listening on http://localhost:${PORT}`);
});
