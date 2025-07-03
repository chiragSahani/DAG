# Pipeline Editor (DAG Builder)

A next-generation **visual pipeline builder** for Directed Acyclic Graphs (DAGs) with live validation, stunning auto-layout, and a sleek, immersive user experience.

---

## ✨ Key Features

### 🚦 Interactive & Intuitive Editing
- **Drag-and-Drop Node Creation**: Add nodes instantly with vibrant animations and dynamic labels
- **Smart Edge Drawing**: Draw connections fluidly between ports, with magnetic snapping and real-time feedback
- **Contextual Menus**: Right-click for quick actions, custom node options, and tooltips
- **Live Validation**: Errors highlighted inline on the canvas, with animated color-coded states

### 🎨 Visual Brilliance
- **Modern UI**: Glassmorphism panels, soft shadows, and animated transitions throughout
- **Colorful Node Types**: Distinct color themes and icons for each node type (data, API, compute, etc.)
- **Interactive Mini Map**: Zoomable, draggable overview with live viewport tracking
- **Customizable Themes**: Toggle light/dark modes, or apply your own color palette

### 🧠 Smart DAG Management
- **Auto Layout**: One click to magically arrange nodes with Dagre, including animated repositioning
- **Real-time JSON Preview**: See up-to-the-millisecond JSON export in a side panel
- **Multi-Select & Bulk Actions**: Shift/drag to select items, then move, delete, or export in one go
- **Export & Import**: Download/upload complete graph as JSON with pretty formatting

### ⚡ Productivity Power-Ups
- **Keyboard Shortcuts**: Fast actions (see below)
- **Undo/Redo**: Infinite history stack (coming soon)
- **Accessibility**: Full keyboard navigation, ARIA labeling, high-contrast mode

---

## 💡 Quick Start

```bash
git clone <repository-url>
cd pipeline-editor
npm install
npm run dev         # Start in development
npm run build       # Production build
```

---

## 🕹️ How to Use

| Action         | How-To                                             |
|----------------|---------------------------------------------------|
| Add Node       | Click **"+"** or use `Ctrl/Cmd + N`               |
| Connect Nodes  | Drag from blue output to teal input port          |
| Delete         | Select & press `Delete`/`Backspace`               |
| Auto Layout    | Click **"Auto Layout"** or `Ctrl/Cmd + L`         |
| Export         | Click **"Export"** or use context menu            |
| Select All     | `Ctrl/Cmd + A`                                    |
| Deselect       | `Escape`                                          |

### ⚖️ Validation Rules

- **Minimum 2 nodes** required
- **No cycles** (DAG-only)
- **No self-loops**
- **All nodes connected**
- **Edges must be proper direction** (output → input)

Errors are shown **inline** and in the **Validation Panel**.

---

## 🏗️ Architecture Overview

```
src/
├── components/
│   ├── PipelineEditor.tsx   # Main container
│   ├── Toolbar.tsx          # Top bar actions
│   ├── Canvas.tsx           # React Flow canvas
│   ├── CustomNode.tsx       # Gorgeous custom nodes
│   ├── ValidationPanel.tsx  # Animated validation/error display
│   └── JSONPreview.tsx      # Live JSON panel
├── stores/
│   └── pipelineStore.ts     # Zustand state store
├── utils/
│   ├── dagValidation.ts     # DAG rules & error detection
│   └── autoLayout.ts        # Dagre integration
├── types/
│   └── pipeline.ts          # TypeScript types
└── App.tsx                  # App root
```

### 📐 Design Highlights

- **Glassmorphism and Neumorphism** for panels and dialogs
- **Animated node transitions** (bounce, fade, highlight on error)
- **Lucide icons** for node types and actions
- **Zustand** for lightweight, scalable state
- **React Flow** with custom edge styles and port indicators

---

## 🧩 Customization

### Add Node Types (with Custom Icons & Colors)
```typescript
const nodeTypes = {
  custom: CustomNode,
  database: DatabaseNode,   // New: purple theme, DB icon
  api: APINode,             // New: yellow theme, API icon
  lambda: LambdaNode,       // New: green theme, function icon
};
```

### Extend Validation
```typescript
export function validateDAG(nodes, edges) {
  // Custom rule: at least one "database" node
  const hasDatabase = nodes.some(n => n.type === 'database');
  // ...your logic here
}
```

---

## 🧪 Development & Quality

| Task      | Command            |
|-----------|--------------------|
| Test      | `npm run test`     |
| Lint      | `npm run lint`     |
| Build     | `npm run build`    |
| Preview   | `npm run preview`  |

---

## 🚧 Challenges & Innovations

- **Smooth state sync** between React Flow and Zustand for seamless UX
- **Optimized DFS cycle detection** for instant feedback, even on huge graphs
- **Animated validation feedback** for better clarity and engagement
- **Dagre auto-layout** with animated, visually pleasing transitions

---

## 🔮 Future-Ready (Planned)

- 🔁 **Undo/Redo**: Advanced history stack
- 🧱 **Node Templates**: Drag preset patterns
- 💾 **Persistent Save/Load** (backend integration)
- 🤝 **Real-time Collaboration**
- 🛡️ **Plugin System**: Custom validation, analytics, and node types
- 📊 **Pipeline Analytics**: Metrics and visual insights

---

## 🤝 Contributing

1. **Fork** the repo
2. **Create Branch**: `feature/amazing-feature`
3. **Commit**: `git commit -m 'Add amazing feature'`
4. **Push**: `git push origin feature/amazing-feature`
5. **Open PR** & describe your innovation!

---

## 📝 License

MIT License - see LICENSE

---

## 💬 Support

Open an issue or contact the dev team. Built with ❤️ using React, TypeScript, Tailwind, and modern web magic.

---
