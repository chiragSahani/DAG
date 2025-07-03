export interface PipelineNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
  };
}

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface DAGValidationResult {
  isValid: boolean;
  errors: string[];
  hasMinimumNodes: boolean;
  hasNoCycles: boolean;
  allNodesConnected: boolean;
  hasNoSelfLoops: boolean;
  hasValidEdgeDirections: boolean;
}

export interface PipelineState {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  selectedNodes: string[];
  selectedEdges: string[];
  dagValidation: DAGValidationResult;
  isConnecting: boolean;
  connectionStart: { nodeId: string; handleType: 'source' | 'target' } | null;
}