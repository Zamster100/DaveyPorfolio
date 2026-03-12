# Davey Keuvelaar Portfolio

This project is a high-performance Web3 marketing portfolio built with React, Vite, and Tailwind CSS.

## Vercel Deployment

This project is configured for easy deployment on Vercel.

### Steps to Deploy:

1. **Push to GitHub**: Push this code to a GitHub repository.
2. **Import to Vercel**: Go to [vercel.com](https://vercel.com) and import your repository.
3. **Configure Environment Variables**:
   - Add `GEMINI_API_KEY`: Your Google Gemini API key.
   - Add `VITE_APP_URL`: The URL where your app will be hosted (optional, for self-referencing).
4. **Deploy**: Vercel will automatically detect the Vite configuration and deploy your app.

### Configuration:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Routing**: `vercel.json` is included to handle Single Page Application (SPA) routing.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
