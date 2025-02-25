# SecureQuest - Interactive Compliance Training Game

SecureQuest is an interactive web application designed to teach data privacy and security concepts through gamified scenarios. Built with Next.js and featuring a modern tech stack, it offers an engaging way to learn about compliance and security best practices.

## 🚀 Features

### 1. Interactive Learning Components
- **Chat Interface with AI Assistant (Cypher)**
  - Real-time conversations about security concepts
  - Powered by OpenAI's GPT model with Langchain integration
  - Context-aware responses using Pinecone vector database for training data
  - Privacy-focused conversation handling

### 2. Game Elements
- **Mystery Room Experience**
  - 3D interactive environment using React Three Fiber
  - Dynamic lighting system with toggle functionality
  - Interactive game objects:
    - Computer for security challenges
    - Cupboard for storing sensitive data
    - Safe for encryption puzzles
    - Clock for time-based challenges
    - Coffee Machine and other ambient objects

### 3. Security Challenges
- **Sorting Puzzles**
  - Data classification exercises
  - Sensitive vs non-sensitive data categorization
  - Real-time feedback and scoring
  - Progressive difficulty levels

- **Phishing Detection**
  - 20 unique email analysis scenarios
  - Three difficulty levels: Rookie Agent, Security Specialist, Chief Privacy Officer
  - Adaptive question selection based on user performance
  - Detailed feedback and learning opportunities

### 4. User Management
- **Authentication System**
  - Firebase-based authentication
  - User profile management with first/last name
  - Secure session handling
  - Protected routes with AuthGuard

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15.1.7
- **UI Libraries**:
  - React 19.0.0
  - Framer Motion 12.4.7
  - Tailwind CSS with custom theme configuration
  - shadcn/ui components for consistent design
  - Three.js/React Three Fiber for 3D rendering
  - Konva for 2D graphics

### Backend & Services
- **Authentication**: Firebase Auth & Firestore
- **AI/ML**:
  - OpenAI API integration
  - Langchain for AI context management
  - Pinecone Vector Database for training data

### State Management
- **Redux Toolkit**
  - User authentication state
  - Security puzzle progress
  - Game state management
  - Persistent state with localStorage

## 📦 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── login/             # Authentication pages
│   ├── mysteryroom/       # 3D game environment
│   └── signup/            # User registration
├── components/
│   ├── game/             # Game-specific components
│   ├── game-objects/     # 3D object components
│   └── ui/               # Reusable UI components
├── firebase/             # Firebase configuration
├── lib/                  # Utility functions
├── redux/               # State management
└── hooks/               # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- npm/yarn/pnpm
- Firebase account
- OpenAI API key
- Pinecone API key

### Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
OPENAI_API_KEY=
PINECONE_API_KEY=
PINECONE_INDEX_NAME=
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Game Features

### Mystery Room
- Interactive 3D environment
- Dynamic lighting system
- Clickable objects with puzzle interactions

### Security Puzzles
- Data classification challenges
- Phishing email detection
- Adaptive difficulty system
- Progress tracking

### AI Chat Assistant
- Context-aware responses
- Real-time interaction
- Educational feedback
- Privacy-focused conversation

## 🔒 Security Features

- Firebase Authentication
- Protected routes with AuthGuard
- Secure API endpoints
- Environment variable protection
- Vector store for secure data handling

## 🎨 UI/UX Features

- Responsive design
- Dark/light mode support
- Animated transitions
- Toast notifications
- Custom UI components
- Accessible components

## 📚 State Management

- Redux for global state
- User authentication state
- Game progress tracking
- Puzzle completion status

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the framework
- Vercel for hosting capabilities
- OpenAI for AI capabilities
- Firebase for authentication
- Three.js community for 3D rendering support
