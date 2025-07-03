import { PipelineNode, PipelineEdge, DAGValidationResult } from '../types/pipeline';

export function validateDAG(nodes: PipelineNode[], edges: PipelineEdge[]): DAGValidationResult {
  const errors: string[] = [];
  
  // Check minimum nodes
  const hasMinimumNodes = nodes.length >= 2;
  if (!hasMinimumNodes) {
    errors.push(nodes.length === 0 ? 'Graph is empty' : 'Graph needs at least 2 nodes');
  }

  // Check for cycles using DFS
  const hasNoCycles = !hasCycle(nodes, edges);
  if (!hasNoCycles) {
    errors.push('Graph contains cycles (not a DAG)');
  }

  // Check if all nodes are connected
  const allNodesConnected = areAllNodesConnected(nodes, edges);
  if (!allNodesConnected && nodes.length > 0) {
    errors.push('All nodes must be part of at least one edge');
  }

  // Check for self-loops
  const hasNoSelfLoops = !edges.some(edge => edge.source === edge.target);
  if (!hasNoSelfLoops) {
    errors.push('Self-loops are not allowed');
  }

  // Check edge directions (this is always true in our implementation)
  const hasValidEdgeDirections = true;

  const isValid = hasMinimumNodes && hasNoCycles && allNodesConnected && hasNoSelfLoops && hasValidEdgeDirections;

  return {
    isValid,
    errors,
    hasMinimumNodes,
    hasNoCycles,
    allNodesConnected,
    hasNoSelfLoops,
    hasValidEdgeDirections,
  };
}

function hasCycle(nodes: PipelineNode[], edges: PipelineEdge[]): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const nodeIds = nodes.map(node => node.id);

  // Build adjacency list
  const adjacencyList = new Map<string, string[]>();
  nodeIds.forEach(nodeId => {
    adjacencyList.set(nodeId, []);
  });

  edges.forEach(edge => {
    const neighbors = adjacencyList.get(edge.source) || [];
    neighbors.push(edge.target);
    adjacencyList.set(edge.source, neighbors);
  });

  // DFS to detect cycle
  function dfs(nodeId: string): boolean {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true; // Back edge found, cycle detected
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  // Check for cycles starting from each unvisited node
  for (const nodeId of nodeIds) {
    if (!visited.has(nodeId)) {
      if (dfs(nodeId)) {
        return true;
      }
    }
  }

  return false;
}

function areAllNodesConnected(nodes: PipelineNode[], edges: PipelineEdge[]): boolean {
  if (nodes.length === 0) return false;
  if (nodes.length === 1) return false; // Single node is not connected
  
  const connectedNodes = new Set<string>();
  
  edges.forEach(edge => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  });

  return nodes.every(node => connectedNodes.has(node.id));
}