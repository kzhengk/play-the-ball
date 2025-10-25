# Play the Ball - Tennis Game

A browser-based tennis game built with HTML5 Canvas and Express.js, ready to deploy on Replit.

## Play Online

1. Visit the Replit deployment: [play-the-ball on Replit](https://replit.com/@kzhengk/play-the-ball)
2. Click the "Run" button if the server isn't running
3. Play in the preview window or click "Open in new tab"

## Game Controls

- **Up Arrow** or **W**: Move paddle up
- **Down Arrow** or **S**: Move paddle down
- Click "Start Game" to begin
- Score points when the AI misses the ball
- First to 11 points wins!

## Stack

- Frontend: HTML5 Canvas, CSS3, Vanilla JavaScript
- Backend: Node.js + Express
- Hosting: Replit

## Development

The game structure:
```
public/
  ├── index.html    # Game canvas and UI
  ├── style.css     # Game styling
  └── game.js       # Game logic and controls
server.js           # Express static file server
package.json        # Dependencies and scripts
```

Quick next steps (recommended)

1. Sign up on Replit
   - Visit https://replit.com and sign up with Email, Google, GitHub, or Apple.
   - Verify your email and optionally enable 2FA in Account → Security.

2. (Optional) Add an SSH key to Replit
   - On macOS (bash):
     ```bash
     ssh-keygen -t ed25519 -C "your_email@example.com"
     cat ~/.ssh/id_ed25519.pub
     ```
   - Copy the public key and add it in Replit → Account Settings → SSH Keys.

3. Connect GitHub (recommended)
   - In Replit: Account Settings → Connected Accounts → connect GitHub.
   - This lets you import a repo as a GitHub-backed Repl.

4. Import this repo into Replit
   - Create → Import from GitHub → choose this repository.
   - Or create a new Node Repl and push this repo from your local machine.

5. Install dependencies in the Repl shell
   ```bash
   npm install
   # To install dev tools locally in the Repl
   npm install --save-dev eslint prettier vitest
   npx eslint --init  # optional interactive setup
   ```

6. Run
   - Start: `npm start`
   - Lint: `npm run lint`
   - Format: `npm run format`
   - Test: `npm test`

Notes
- This repository only contains configs and a tiny example. Replit will run `npm start` using the `.replit` file.
- If you prefer TypeScript or a specific framework (React/Vue/Svelte), tell me and I can add a tailored sample.

If you want, I can also:
- Walk you through signing up interactively (I will provide exact click/text instructions).
- Show how to push this repo to GitHub and import it into Replit (commands included).
- Generate and paste an SSH key guide for your machine.

---
Updated: October 24, 2025
