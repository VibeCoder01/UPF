# UPF Analyzer

A Next.js web application that analyzes food products from the UK market using the NOVA classification system to identify Ultra-Processed Foods (UPF).

## Features

- 🔍 **3000+ UK Products** - Comprehensive database of UK food products from OpenFoodFacts
- 🏷️ **NOVA Classification** - Visual indicators for all 4 NOVA groups (Unprocessed to Ultra-Processed)
- 🔎 **Advanced Filtering** - Search by name/brand, filter by country and NOVA category
- 📊 **Multi-Select NOVA Filter** - Checkbox selection to compare multiple processing levels
- 🌍 **Country Information** - Displays country of origin for each product
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Premium UI** - Dark mode support with smooth animations
- ⚡ **Optimized Performance** - ISR caching with 1-day revalidation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Source**: OpenFoodFacts API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vibecoder01/upf.git
cd upfanalyser

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

## How It Works

The app fetches product data from the OpenFoodFacts API, specifically filtering for UK products. Each product is classified using the NOVA system:

- **NOVA 1** (Green) - Unprocessed or minimally processed foods
- **NOVA 2** (Yellow) - Processed culinary ingredients
- **NOVA 3** (Orange) - Processed foods
- **NOVA 4** (Red) - Ultra-processed foods (UPF)

## Features in Detail

### Search & Filter
- Real-time search across product names and brands
- Country filter dropdown
- Multi-select NOVA category checkboxes

### Product Cards
- Product image with fallback
- Brand and product name
- NOVA classification badge
- Country of origin indicator
- Expandable ingredient list

### Information Sidebar
- Explanation of UPF and NOVA system
- Links to authoritative sources (FAO, OpenFoodFacts)
- Educational content about food processing

## Caching Strategy

The app uses Incremental Static Regeneration (ISR) with a 1-day revalidation period to:
- Minimize API calls to OpenFoodFacts
- Ensure fast page loads
- Reduce server load

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- Data provided by [OpenFoodFacts](https://world.openfoodfacts.org/)
- NOVA classification system developed by researchers at the University of São Paulo
- Built with [Next.js](https://nextjs.org/)
