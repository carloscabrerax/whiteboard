# 🧠 Whiteboard

Interactive whiteboard app built with React to support real-time drawing, collaboration, and note-taking.

## 🚀 Features
Real-time drawing using Canvas (or SVG)

User-friendly tools: pen, eraser, color picker, clear canvas

Data persistence (localStorage or backend storage)

(Optional) Live collaboration using WebSockets

## 🛠️ Tech Stack
Frontend: React, TypeScript (or JavaScript)

State Management: useState / useReducer / Zustand (adjust based on actual)

UI: CSS-in-JS / Tailwind / plain CSS (adjust)

Collaboration/Realtime (if implemented): WebSockets library

## 🧩 Installation & Setup
Clone the repo

bash
Copy
Edit
git clone https://github.com/carloscabrerax/whiteboard.git
cd whiteboard
Install dependencies

bash
Copy
Edit
npm install
### or
yarn install
Start development server

bash
Copy
Edit
npm start
### or
yarn start
The app should open in your browser at http://localhost:3000.

(Optional) For real-time features, start backend

bash
Copy
Edit
cd server
npm install && npm run start
Update src/config.js to configure WebSocket endpoint.

## 💻 Usage
Draw/Erase: Select the tool and draw on the board.

Change Color/Thickness: Use the UI controls to switch styles.

Clear Board: Use the clear button to reset.

(If implemented) Collaborate with others in real-time via WebSockets.

## 🧪 Tests
Run unit and component tests using:

bash
Copy
Edit
npm test
Ensure interactive features work correctly (Canvas rendering, undo/redo, collaboration sync).

## 📚 Learnings & Challenges
Working with Canvas in React and handling its lifecycle hooks

Managing state for drawing tools and undo/redo functionality

Implementing real-time features and synchronization across clients

Ensuring performance and preventing unnecessary re-renders

## 📬 Feedback & Contributions
Feel free to leave feedback or suggestions via Issues or Pull Requests! I'm always looking to improve it.

## 📜 License
This project is open-source under the MIT License — see the LICENSE file.
