# 🚀 SkillSlack – Developer-first Collaboration Platform

SkillSlack is a real-time, full-stack workspace for developers to **code, collaborate, and connect** — all in one place.

<p align="center">
  <img src="https://github.com/user-attachments/assets/e28306c0-95df-4fac-9161-6537d0973d1f" alt="Dashboard Screenshot" width="800" />
  <img src="https://github.com/user-attachments/assets/c89c4a6e-1d08-4d35-bec0-412a268206aa" alt="GitHub PR Feed" width="800" />
  <img src="https://github.com/user-attachments/assets/cbe49bd6-2b96-4370-800d-3f886f42a527" alt="Workspace Invite" width="800" />
</p>

From **interactive coding channels** to **GitHub PR sync**, **terminal collab**, and **voice rooms**, SkillSlack empowers dev teams with tools they actually need.

---

## 🌟 Features

### 🧑‍💻 Workspaces
- Create or join developer-focused workspaces
- Share invite links with collaborators

### 💬 Real-time Collaboration
- Group & private messaging (DMs + Channels)
- Live code editing using **Monaco Editor**
- Terminal pairing sessions with **Xterm.js**

### 🔗 GitHub PR Sync
- Fetch PRs in real-time from GitHub
- View title, number, status, author & date
- Animated PR feed powered by **Lottie**

### 🧠 AI Assistant
- Chatbot powered by **OpenAI** or **Gemini**
- Stores and retrieves user chat history

### 🔊 Voice Rooms
- Audio chat powered by **LiveKit** / **Daily**
- For pair programming or stand-ups

### 🧭 Developer Dashboard
- Clean, responsive layout
- Sidebar with routing: Home, Channels, DMs, Settings
- Invite flow + workspace creation with Redux

---

## 🛠 Tech Stack

| Layer        | Technologies                                     |
|--------------|--------------------------------------------------|
| **Frontend** | Next.js (App Router), Tailwind CSS, TypeScript   |
| **UI**       | ShadCN UI, Lucide Icons, Framer Motion           |
| **Auth**     | Clerk Authentication                             |
| **Backend**  | Node.js (Next.js API Routes)                     |
| **Realtime** | Socket.IO, LiveKit / Daily                       |
| **AI Engine**| OpenAI / Google Gemini API                       |
| **GitHub**   | GitHub REST API v3, Webhooks (soon)              |
| **Database** | MongoDB + Mongoose                               |
| **State Mgmt**| Redux Toolkit                                   |

---

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/skillslack.git

# 2. Navigate into the project
cd skillslack

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev




## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

If you have suggestions for improvement, ideas for new features, or found a bug:

- Open an issue
- Create a pull request
- Fork the repo and make it your own

All contributions are welcome and appreciated 💜
