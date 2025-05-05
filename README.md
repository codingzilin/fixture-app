# 🏆 Fixtures Platform 🏆

A modern web application for managing and searching sports fixtures, built with Next.js and MongoDB.

![image](https://github.com/user-attachments/assets/3d8e2db2-8200-43c3-872d-6cb6e72a88ab)


## ✨ Features

- 📊 **CSV Upload**: Upload and parse CSV files containing sports fixture data
- 🔍 **Real-time Search**: Search for fixtures by team name with instant results
- 📋 **Detailed View**: Click on fixtures to see detailed information
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Enhanced with animations and visual effects

## 🛠️ Tech Stack

- 🚀 **Frontend**: Next.js 15, React 19, Tailwind CSS
- 🔌 **Backend**: Next.js API routes
- 🗄️ **Database**: MongoDB with Mongoose
- 💅 **Styling**: Tailwind CSS, shadcn/ui components
- ✨ **Animation**: Motion.js for smooth transitions and effects
- 📊 **Data Parsing**: PapaParse for CSV handling

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18.17.0 or later
- MongoDB database (local or Atlas)

### ⚙️ Environment Setup

Create a `.env.local` file in the root of the project with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
```

### 💻 Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/fixture-app.git
cd fixture-app/frontend
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### 🏭 Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API Routes
│   │   ├── components/  # Page-specific components
│   │   ├── search/      # Search page
│   │   └── page.tsx     # Home page
│   ├── components/      # Shared components
│   │   ├── animate-ui/  # Animation components
│   │   ├── motion-primitives/ # Motion components
│   │   └── ui/          # UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and libraries
│   ├── models/          # MongoDB models
│   └── types/           # TypeScript type definitions
└── ...config files
```

## 🚢 Deployment

This project is deployed on Vercel:
https://fixture-app.vercel.app/


## 📝 CSV Format

The application expects CSV files with the following columns:
- 🆔 `fixture_mid`: Unique identifier for each fixture
- 📅 `season`: Season year 
- 🏆 `competition_name`: Name of the competition
- ⏰ `fixture_datetime`: Date and time of the fixture
- 🔄 `fixture_round`: Round number
- 🏠 `home_team`: Home team name
- 🚌 `away_team`: Away team name


## 🙏 Acknowledgements

- ⚡ [Next.js](https://nextjs.org/)
- ⚛️ [React](https://reactjs.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🍃 [MongoDB](https://www.mongodb.com/)
- 🔌 [Mongoose](https://mongoosejs.com/)
- 📊 [PapaParse](https://www.papaparse.com/)
- ✨ [Motion](https://www.motion.dev/)
