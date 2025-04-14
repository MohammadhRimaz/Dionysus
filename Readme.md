# Dionysus

Dionysus is a full-stack SaaS platform that uses AI to summarize GitHub repositories, answer questions about commit histories, and manage repositories through a dynamic credit-based system.

Built with Next.js 15, Google Gemini AI, Stripe, and TypeScript.

## ✨ Features

- **🔍 Repository Summaries**: Get AI-generated summaries for the latest 10 commits of uploaded GitHub repositories.

- **🧠 AI Q&A**: Ask questions about your repositories and save the answers for later on the QA page.

- **👥 Team Collaboration**: Invite others to your workspace by sharing a join link.

- **🔒 Authentication**: Secure login via Google and GitHub OAuth.

- **💳 Credit System**:

  -- Each file = 1 Dionysus Credit.

  -- Users can purchase additional credits through Stripe if they run out in the billing page.

- **📦 Project Management**:

  -- Each uploaded repository is treated as a "Project."

  -- Archive projects to keep your workspace clean.

- **🖥️ Modern UI/UX**: A sleek, intuitive design for easy navigation and interaction.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS

- **Backend**: Next.js API Routes, and GitHub API for check repo files.

- **AI Integration**: Google Gemini API

- **Authentication**: Google OAuth, GitHub OAuth (NextAuth.js)

- **Database**: PostgreSQL (or your DB choice)

- **ORM**: Prisma (optional - if used)

- **Payments**: Stripe

- **Deployment**: Vercel / AWS / Your choice

## 🚀 Getting Started

1. Clone the Repository

```bash
git clone https://github.com/yourusername/dionysus.git
cd dionysus
```

2. Install Dependencies

```bash
npm install
# or
yarn install
```

3. Setup Environment Variables
   Create a .env.local file in the root:

.env

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
DATABASE_URL=your_database_url
```

4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 to see the app.

## 🧩 How It Works

| Feature            | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Create Project     | Add a GitHub repository link and name. Costs credits based on the number of files.         |
| Summarize Dionysus | fetches the latest 10 commits and summarizes them using Gemini AI.                         |
| Ask Questions      | Users can ask AI questions related to their project and save answers for future reference. |
| Invite Team        | Share join links to collaborate with others.                                               |
| Manage Credits     | Purchase more credits via Stripe if running low.                                           |
| Archive Projects   | Clean up by archiving projects no longer needed.                                           |

## 💳 Credit System

**1 Repository File = 1 Credit**

When adding a repository:

- Dionysus checks if you have enough credits.

- Credits deducted based on file count.

- Purchase More: Visit the Billing page to buy additional credits via Stripe.

## 🔗 Connect

Feel free to Connect with me!

- **Portfolio**: https://rimazportfolio.framer.website

- **LinkedIn**: https://www.linkedin.com/in/mohammadh-rimaz-28673327b
