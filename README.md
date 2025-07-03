# 🚀 Pipeline Editor (DAG Builder)

A next-generation **visual pipeline builder** for **Directed Acyclic Graphs (DAGs)**, offering live validation, stunning auto-layout, and a sleek, immersive user experience.

🌐 **Live Demo:** [https://graph-dag.netlify.app/](https://graph-dag.netlify.app/)

---

## ✨ Key Features

### 🎛️ Interactive & Intuitive Editing

* 🔧 **Drag-and-Drop Nodes:** Instantly add nodes with smooth animations and dynamic labels.
* 🔗 **Smart Edge Drawing:** Connect nodes effortlessly with magnetic snapping and real-time feedback.
* 🖱️ **Contextual Menus:** Right-click for fast actions, custom options, and handy tooltips.
* 🛡️ **Live Validation:** Errors highlighted inline with **animated color-coded states** and real-time feedback.

### 🎨 Visual Brilliance

* 🧊 **Modern UI:** Glassmorphism panels, soft shadows, and buttery-smooth transitions.
* 🌈 **Colorful Node Types:** Unique themes and icons for each node type (**Database, API, Lambda, Compute**, etc.).
* 🗺️ **Interactive Mini Map:** Navigate large graphs effortlessly with zoomable, draggable overview.
* 🖌️ **Customizable Themes:** Toggle **light/dark mode**, or bring your own palette.

### 🧠 Smart DAG Management

* 🔄 **Auto Layout:** One-click node arrangement using Dagre, with smooth animated repositioning.
* 🔍 **Real-time JSON Preview:** Instantly see the full DAG structure in JSON format.
* ✨ **Multi-Select & Bulk Actions:** Easily move, delete, or export multiple nodes at once.
* ⬇️⬆️ **Import/Export:** Save and load complete graphs as pretty-printed JSON.

### ⚡ Productivity Boosters

* 🎹 **Keyboard Shortcuts:** Power users welcome (see below).
* 🔁 **Undo/Redo:** Infinite history stack (**coming soon**).
* ♿ **Accessibility:** ARIA labeling, keyboard navigation, and high-contrast mode.

---

## 🔧 Quick Start

```bash
git clone https://github.com/chiragSahani/DAG.git
cd DAG
npm install
npm run dev         # Start development server
npm run build       # Create production build
```

---

## 🕹️ How to Use

| Action           | Shortcut / How-To                               |
| ---------------- | ----------------------------------------------- |
| ➕ Add Node       | Click **"+"** or press `Ctrl/Cmd + N`           |
| 🔗 Connect Nodes | Drag from blue output port to teal input port   |
| ❌ Delete         | Select node/edge & press `Delete`/`Backspace`   |
| 🧹 Auto Layout   | Click **"Auto Layout"** or press `Ctrl/Cmd + L` |
| 💾 Export        | Click **"Export"** or right-click context menu  |
| 🔍 Select All    | `Ctrl/Cmd + A`                                  |
| 🚫 Deselect      | Press `Escape`                                  |

---

### ✅ Validation Rules

* Requires **minimum 2 nodes**
* Ensures **no cycles** (**DAG only**)
* Blocks **self-loops**
* Enforces **all nodes must be connected**
* Checks **proper edge direction** (output → input)

⚠️ Validation errors are displayed **inline** on the canvas and in the **Validation Panel**, with animated feedback.

---

## 🏗️ Architecture Overview

```
src/
├── components/
│   ├── PipelineEditor.tsx   # Main container
│   ├── Toolbar.tsx          # Top bar actions
│   ├── Canvas.tsx           # React Flow canvas
│   ├── CustomNode.tsx       # Custom node design
│   ├── ValidationPanel.tsx  # Error display
│   └── JSONPreview.tsx      # Live JSON preview
├── stores/
│   └── pipelineStore.ts     # Zustand state management
├── utils/
│   ├── dagValidation.ts     # DAG validation logic
│   └── autoLayout.ts        # Dagre layout integration
├── types/
│   └── pipeline.ts          # TypeScript types
└── App.tsx                  # App root
```

---

## 🎨 Design Highlights

* **Glassmorphism & Neumorphism**: Modern UI aesthetics
* **Animated Node Transitions**: Bounce, fade, and error highlight animations
* **Lucide Icons**: Elegant icons for clarity
* **State Management**: Lightweight, reactive state with **Zustand**
* **Custom React Flow Setup**: Tailored edges, ports, and interaction styles

---

## 🔌 Customization

### Add New Node Types

```typescript
const nodeTypes = {
  custom: CustomNode,
  database: DatabaseNode,   // Purple theme, DB icon
  api: APINode,             // Yellow theme, API icon
  lambda: LambdaNode,       // Green theme, Function icon
};
```

### Extend Validation Logic

```typescript
export function validateDAG(nodes, edges) {
  const hasDatabase = nodes.some(n => n.type === 'database');
  // Add your own validation logic here
}
```

---

## 🧪 Development & Quality Tools

| Task       | Command           |
| ---------- | ----------------- |
| 🔬 Test    | `npm run test`    |
| 🧹 Lint    | `npm run lint`    |
| 🛠️ Build  | `npm run build`   |
| 👀 Preview | `npm run preview` |

---

## 🚀 Challenges & Innovations

* 🔄 Smooth React Flow ↔ Zustand sync for flawless UX
* 🧭 Optimized DFS-based cycle detection for large graphs
* 🎨 Animated validation feedback for clarity and fun
* 📐 Dagre-powered auto-layout with fluid transitions

---

## 🔮 Roadmap

* 🔁 **Undo/Redo History Stack**
* 📂 **Node Templates** for common patterns
* 💾 **Persistent Save/Load** with backend support
* 🤝 **Real-time Collaboration** (**WebSockets / Firebase / Supabase**)
* ⚙️ **Plugin Ecosystem**: Custom validations, analytics, and node types
* 📊 **Pipeline Analytics Dashboard**

---

## 🤝 Contributing

1. **Fork** the repo
2. **Create a Branch:** `feature/awesome-feature`
3. **Commit Your Code:** `git commit -m 'Add awesome feature'`
4. **Push to GitHub:** `git push origin feature/awesome-feature`
5. **Open a Pull Request** and share your brilliance!

---

## 📝 License

MIT License — feel free to use, modify, and share.

---

## 💬 Support & Feedback

Encounter an issue? Have a cool feature idea?
Open an issue or reach out to the dev team.
Built with ❤️ using **React**, **TypeScript**, **Zustand**, **TailwindCSS**, and **modern web technologies**.


