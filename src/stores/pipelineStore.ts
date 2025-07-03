import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { PipelineNode, PipelineEdge, PipelineState, DAGValidationResult } from '../types/pipeline';
import { validateDAG } from '../utils/dagValidation';

interface PipelineActions {
  addNode: (label: string, position?: { x: number; y: number }) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  addEdge: (source: string, target: string) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  setSelectedNodes: (nodeIds: string[]) => void;
  setSelectedEdges: (edgeIds: string[]) => void;
  setNodes: (nodes: PipelineNode[]) => void;
  clearSelection: () => void;
  deleteSelected: () => void;
  startConnection: (nodeId: string, handleType: 'source' | 'target') => void;
  endConnection: () => void;
  validateGraph: () => void;
}

const initialValidation: DAGValidationResult = {
  isValid: false,
  errors: ['Graph is empty'],
  hasMinimumNodes: false,
  hasNoCycles: true,
  allNodesConnected: false,
  hasNoSelfLoops: true,
  hasValidEdgeDirections: true,
};

export const usePipelineStore = create<PipelineState & PipelineActions>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodes: [],
  selectedEdges: [],
  dagValidation: initialValidation,
  isConnecting: false,
  connectionStart: null,

  addNode: (label: string, position = { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 }) => {
    const newNode: PipelineNode = {
      id: uuidv4(),
      type: 'custom',
      position,
      data: { label },
    };

    set((state) => {
      const newState = { ...state, nodes: [...state.nodes, newNode] };
      return { ...newState, dagValidation: validateDAG(newState.nodes, newState.edges) };
    });
  },

  deleteNode: (nodeId: string) => {
    set((state) => {
      const newNodes = state.nodes.filter((node) => node.id !== nodeId);
      const newEdges = state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
      const newSelectedNodes = state.selectedNodes.filter((id) => id !== nodeId);
      
      const newState = {
        ...state,
        nodes: newNodes,
        edges: newEdges,
        selectedNodes: newSelectedNodes,
      };
      
      return { ...newState, dagValidation: validateDAG(newState.nodes, newState.edges) };
    });
  },

  deleteEdge: (edgeId: string) => {
    set((state) => {
      const newEdges = state.edges.filter((edge) => edge.id !== edgeId);
      const newSelectedEdges = state.selectedEdges.filter((id) => id !== edgeId);
      
      const newState = {
        ...state,
        edges: newEdges,
        selectedEdges: newSelectedEdges,
      };
      
      return { ...newState, dagValidation: validateDAG(state.nodes, newState.edges) };
    });
  },

  addEdge: (source: string, target: string) => {
    // Validate connection rules
    if (source === target) {
      alert('Self-loops are not allowed');
      return;
    }

    const existingEdge = get().edges.find(
      (edge) => edge.source === source && edge.target === target
    );
    
    if (existingEdge) {
      alert('Edge already exists between these nodes');
      return;
    }

    const newEdge: PipelineEdge = {
      id: uuidv4(),
      source,
      target,
      sourceHandle: 'source',
      targetHandle: 'target',
    };

    set((state) => {
      const newState = { ...state, edges: [...state.edges, newEdge] };
      return { ...newState, dagValidation: validateDAG(state.nodes, newState.edges) };
    });
  },

  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => {
    set((state) => ({
      ...state,
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, position } : node
      ),
    }));
  },

  setSelectedNodes: (nodeIds: string[]) => {
    set({ selectedNodes: nodeIds });
  },

  setSelectedEdges: (edgeIds: string[]) => {
    set({ selectedEdges: edgeIds });
  },

  setNodes: (nodes: PipelineNode[]) => {
    set((state) => {
      const newState = { ...state, nodes };
      return { ...newState, dagValidation: validateDAG(nodes, state.edges) };
    });
  },

  clearSelection: () => {
    set({ selectedNodes: [], selectedEdges: [] });
  },

  deleteSelected: () => {
    set((state) => {
      const newNodes = state.nodes.filter((node) => !state.selectedNodes.includes(node.id));
      const newEdges = state.edges.filter((edge) => 
        !state.selectedEdges.includes(edge.id) &&
        !state.selectedNodes.includes(edge.source) &&
        !state.selectedNodes.includes(edge.target)
      );
      
      const newState = {
        ...state,
        nodes: newNodes,
        edges: newEdges,
        selectedNodes: [],
        selectedEdges: [],
      };
      
      return { ...newState, dagValidation: validateDAG(newState.nodes, newState.edges) };
    });
  },

  startConnection: (nodeId: string, handleType: 'source' | 'target') => {
    set({
      isConnecting: true,
      connectionStart: { nodeId, handleType },
    });
  },

  endConnection: () => {
    set({
      isConnecting: false,
      connectionStart: null,
    });
  },

  validateGraph: () => {
    const { nodes, edges } = get();
    set({ dagValidation: validateDAG(nodes, edges) });
  },
}));