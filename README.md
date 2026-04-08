# Interactive Wall Calendar

## About the Project
This project is an interactive, fully responsive 3D Wall Calendar built in React. Designed to mirror the physical satisfaction of interacting with a paper calendar, it allows users to navigate completely dynamic months, select dates and date ranges, and seamlessly jot down personal memories, events, or memos onto a beautifully lined notebook section. With a physically-inspired 3D page curl animation rotating around a stylized metallic spiral binding, it bridges the gap between digital utility and aesthetic novelty. Every month cycles through bespoke, seasonal custom imagery to give an incredibly tactile, authentic feel completely localized to the user.

### Visual Features In Action

**The Current Month View:**
![Current Month Calendar](./public/currnet_month.png)

**Date Range Selection:**
![Date Selection Highlights](./public/date_select.png)

**Creating & Saving Notes:**
![Notes Saved Pop Up](./public/notes_saved.png)

**Active Note Notification Dot:**
![Yellow Highlight Dot on Specific Date](./public/notes_highlight.png)

## Key Features & Highlights
* **3D Page Flipping:** Uses Framer Motion's advanced spring physics to simulate realistic flipping of completely unified pages around a static top metallic binding.
* **Persistent Local Storage:** Integrated with `localStorage` so notes tied to individual dates or entire months persist safely on refresh without needing a heavier database or backend framework.
* **Smart Highlight Dots:** Any date possessing saved notes intrinsically displays a bright amber notification dot mirroring physical sticky-note behavior beautifully. 
* **Seamless Date Selection:** Effortlessly handles standalone clicks and click-and-drag-style interval selections for picking multiday spans across the core grid structure cleanly mapping variables provided by `date-fns`.
* **Dynamic Header Themes:** Includes completely dynamic hero images corresponding smoothly with the seasonal month.

## Tech Stack
- **Framework**: React.js / Vite
- **Styling**: Tailwind CSS v4 styling structures and component layers for absolute responsive UI bounds.
- **Animations**: `framer-motion` for complex keyframe page flipping and 3D space tracking.
- **Date Component Management**: `date-fns` for lightweight, immutable locale logic, date math, and interval overlap functionality.
- **Icons & Toasting**: `lucide-react` for SVG UI components and `react-toastify` for clean, aesthetically pleasing save-confirmation popups.

## Setup & Installation

Follow these incredibly simple steps to run the calendar on your local machine:

1. **Navigate into the project directory:**
   ```bash
   cd calendar
   ```

2. **Install the node dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and instantly navigate to the localhost port provided in the terminal (usually `http://localhost:5173`).

---

### Developer Note
Designed and developed by **Rohan Jha**.
