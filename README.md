# Pipeline Editor (DAG Builder)

A comprehensive React + TypeScript application for building and validating Directed Acyclic Graphs (DAGs) with real-time validation and auto-layout capabilities.

![Pipeline Editor Screenshot](https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## 🚀 Features

### Core Features
- **Interactive Node Creation**: Click "Add Node" to create labeled nodes with clear input/output ports
- **Manual Edge Drawing**: Drag connections between nodes with real-time validation
- **Smart Connection Rules**: Prevents invalid connections (self-loops, wrong directions)
- **Keyboard Shortcuts**: Delete selected items with Delete/Backspace key
- **Real-time DAG Validation**: Continuous validation with detailed error messages

### Advanced Features
- **Auto Layout**: Dagre-based automatic node arrangement with zoom-to-fit
- **JSON Preview**: Live JSON export of the current graph structure
- **Mini Map**: Navigation aid for large graphs
- **Context Actions**: Right-click context menus and tooltips
- **Export Functionality**: Download graph as JSON file
- **Selection Management**: Multi-select nodes and edges

### Visual Design
- **Modern UI**: Clean, professional interface with smooth animations
- **Color-coded Validation**: Visual feedback for DAG status
- **Custom Node Design**: Professional node styling with clear port indicators
- **Responsive Layout**: Works across different screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Flow** - Node-based graph editor
- **Zustand** - State management
- **Dagre** - Auto-layout algorithm
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd pipeline-editor

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Usage

### Basic Operations
1. **Add Nodes**: Click "Add Node" button and enter a label
2. **Connect Nodes**: Drag from blue output ports to teal input ports
3. **Delete Items**: Select nodes/edges and press Delete key
4. **Auto Layout**: Click "Auto Layout" to organize nodes automatically
5. **Export Graph**: Click "Export" to download as JSON

### Keyboard Shortcuts
- `Delete/Backspace` - Delete selected items
- `Escape` - Clear selection
- `Ctrl/Cmd + A` - Select all items
- `Ctrl/Cmd + N` - Add new node (when implemented)
- `Ctrl/Cmd + L` - Auto layout (when implemented)

### Validation Rules
- Minimum 2 nodes required
- No cycles allowed (must be acyclic)
- All nodes must be connected
- No self-loops permitted
- Edges must follow direction rules (output → input)

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # React components
│   ├── PipelineEditor.tsx   # Main editor container
│   ├── Toolbar.tsx          # Action buttons and controls
│   ├── Canvas.tsx           # React Flow canvas
│   ├── CustomNode.tsx       # Custom node component
│   ├── ValidationPanel.tsx  # DAG validation display
│   └── JSONPreview.tsx      # JSON output preview
├── stores/
│   └── pipelineStore.ts     # Zustand state management
├── utils/
│   ├── dagValidation.ts     # DAG validation logic
│   └── autoLayout.ts        # Dagre layout integration
├── types/
│   └── pipeline.ts          # TypeScript definitions
└── App.tsx                  # Root component
```

### Design Decisions

1. **Zustand for State Management**: Chosen for its simplicity and TypeScript support over Redux
2. **React Flow**: Industry-standard library for node-based editors with excellent customization
3. **Dagre Layout**: Proven algorithm for automatic graph layout
4. **Modular Architecture**: Separated concerns for maintainability and testing
5. **Custom Validation**: Implemented DFS-based cycle detection for performance

### Key Components

- **PipelineStore**: Centralized state management with actions
- **CustomNode**: Reusable node component with visual ports
- **Canvas**: React Flow integration with event handling
- **ValidationPanel**: Real-time DAG validation feedback
- **Toolbar**: User actions and controls

## 🧪 Validation Logic

The application implements comprehensive DAG validation:

1. **Cycle Detection**: Uses Depth-First Search (DFS) with recursion stack
2. **Connectivity Check**: Ensures all nodes participate in edges
3. **Direction Validation**: Enforces proper edge directions
4. **Self-loop Prevention**: Blocks nodes connecting to themselves
5. **Minimum Nodes**: Requires at least 2 nodes for valid DAG

## 🎨 Customization

### Adding New Node Types
```typescript
// In CustomNode.tsx
const nodeTypes = {
  custom: CustomNode,
  database: DatabaseNode,  // Add new type
  api: APINode,           // Add another type
};
```

### Extending Validation Rules
```typescript
// In dagValidation.ts
export function validateDAG(nodes, edges) {
  // Add custom validation logic
  const hasCustomRule = checkCustomRule(nodes, edges);
  // Return enhanced validation result
}
```

## 🔧 Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Building
```bash
npm run build
npm run preview
```

## 🚧 Challenges Faced

1. **React Flow Integration**: Managing state synchronization between React Flow and Zustand
2. **Cycle Detection**: Implementing efficient DFS algorithm for large graphs
3. **Real-time Validation**: Balancing performance with immediate feedback
4. **Edge Validation**: Preventing invalid connections while maintaining UX
5. **Auto Layout**: Integrating Dagre with React Flow coordinate systems

## 🔮 Future Enhancements

- **Undo/Redo**: Command pattern implementation
- **Node Templates**: Predefined node types for common operations
- **Graph Persistence**: Save/load functionality with backend integration
- **Collaborative Editing**: Real-time multi-user editing
- **Advanced Validation**: Custom validation rules and plugins
- **Graph Analytics**: Metrics and insights about pipeline structure

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For questions or issues, please open a GitHub issue or contact the development team.

---

Built with ❤️ using React, TypeScript, and modern web technologies.