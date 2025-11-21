# UPF Analyzer

A powerful Next.js web application that empowers users to make healthier food choices by analyzing products using the **NOVA classification system**. It identifies Ultra-Processed Foods (UPF) and suggests healthier alternatives.

## Features

### 🔍 Discovery & Analysis
- **3000+ UK Products**: Comprehensive database sourced from OpenFoodFacts.
- **NOVA Classification**: Clear visual indicators for all 4 NOVA groups (1: Unprocessed to 4: Ultra-Processed).
- **Barcode Search**: Instantly find products by scanning or entering their barcode.
- **Data Quality Indicators**: "Traffic light" style badges (A-D) showing the completeness of product data.

### 🛒 Interactive Basket
- **Basket Analysis**: Add items to a virtual basket to see the overall health score and UPF percentage.
- **Health Score**: Real-time calculation of your basket's nutritional quality.
- **Layout Options**: Toggle between a standard list view and an immersive full-width layout.

### 💡 Smart Suggestions
- **Better Choices**: Automatically suggests healthier alternatives (lower NOVA group, better Nutri-Score) for UPF items.
- **Swap Hover**: Interactive hover cards showing details of suggested swaps.
- **Explainability**: Detailed breakdown of *why* a product is classified as UPF (e.g., "Contains High Fructose Corn Syrup").

### 📱 Modern Experience
- **PWA Support**: Installable on mobile and desktop with offline capabilities.
- **Responsive Design**: Optimized for all devices with a dedicated mobile filter drawer.
- **Dark Mode**: Sleek, eye-friendly dark theme support.
- **Performance**: Fast page loads using Next.js ISR (Incremental Static Regeneration).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data**: OpenFoodFacts API
- **PWA**: Next.js PWA + Service Worker

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vibecoder01/upf.git
cd upf

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

### Deployment

To make the app accessible on mobile devices, you need to deploy it:

#### Option 1: Deploy to the Cloud
Deploy to a hosting platform like Vercel, Netlify, or similar:

```bash
# Example: Deploy to Vercel
npm install -g vercel
vercel
```

Once deployed, you'll get a public URL (e.g., `https://your-app.vercel.app`) that you can access from any device.

#### Option 2: Local Network Access (Development)
To test on your mobile device while developing locally:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Find your computer's local IP address:
   - **Windows**: Run `ipconfig` and look for "IPv4 Address"
   - **Mac/Linux**: Run `ifconfig` or `ip addr`

3. On your mobile device (connected to the same WiFi network):
   - Open your browser and navigate to `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

### Install as Mobile App (PWA)

Once the app is accessible via a URL (either deployed or local network):

#### iOS (Safari)
1. Open the app URL in Safari
2. Tap the **Share** button (square with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** to confirm
5. The app icon will appear on your home screen

#### Android (Chrome)
1. Open the app URL in Chrome
2. Tap the **menu** (three dots) in the top-right corner
3. Tap **"Add to Home screen"** or **"Install app"**
4. Tap **"Install"** to confirm
5. The app will be added to your home screen and app drawer

> **Note**: PWA installation requires HTTPS in production. Local development (localhost or local IP) works without HTTPS. For production deployment, platforms like Vercel automatically provide HTTPS.

Once installed, the app works offline and provides a native app-like experience!

## How It Works

The app fetches product data from the OpenFoodFacts API. Each product is analyzed and classified:

- **NOVA 1 (Green)**: Unprocessed or minimally processed foods (e.g., fruits, vegetables, milk).
- **NOVA 2 (Yellow)**: Processed culinary ingredients (e.g., oils, butter, sugar).
- **NOVA 3 (Orange)**: Processed foods (e.g., canned vegetables, fresh bread).
- **NOVA 4 (Red)**: Ultra-processed foods (e.g., soft drinks, packaged snacks).

## Acknowledgments

- Data provided by [OpenFoodFacts](https://world.openfoodfacts.org/).
- NOVA classification system developed by researchers at the University of São Paulo.
