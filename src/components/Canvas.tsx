import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowInstance,
  NodeMouseHandler,
  EdgeMouseHandler,
} from 'reactflow';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';

import { usePipelineStore } from '../stores/pipelineStore';
import { CustomNode } from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#4f46e5',
  },
  style: {
    stroke: '#4f46e5',
    strokeWidth: 2,
  },
};

export function Canvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null);
  
  const {
    nodes: storeNodes,
    edges: storeEdges,
    addEdge: addStoreEdge,
    updateNodePosition,
    setSelectedNodes,
    setSelectedEdges,
    clearSelection,
    deleteSelected,
  } = usePipelineStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  useEffect(() => setNodes(storeNodes), [storeNodes, setNodes]);
  useEffect(() => setEdges(storeEdges), [storeEdges, setEdges]);

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => updateNodePosition(node.id, node.position),
    [updateNodePosition]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        addStoreEdge(connection.source, connection.target);
      }
    },
    [addStoreEdge]
  );

  const onSelectionChange = useCallback(
    ({ nodes: selNodes, edges: selEdges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodes(selNodes.map(n => n.id));
      setSelectedEdges(selEdges.map(e => e.id));
    },
    [setSelectedNodes, setSelectedEdges]
  );

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    event.stopPropagation();
    setSelectedNodes([node.id]);
    setSelectedEdges([]);
  }, [setSelectedNodes, setSelectedEdges]);

  const onEdgeClick: EdgeMouseHandler = useCallback((event, edge) => {
    event.stopPropagation();
    setSelectedEdges([edge.id]);
    setSelectedNodes([]);
  }, [setSelectedEdges, setSelectedNodes]);

  const onPaneClick = useCallback(() => clearSelection(), [clearSelection]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        deleteSelected();
      }
      if (event.key === 'Escape') clearSelection();
      if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
        event.preventDefault();
        setSelectedNodes(storeNodes.map(node => node.id));
        setSelectedEdges(storeEdges.map(edge => edge.id));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, clearSelection, setSelectedNodes, setSelectedEdges, storeNodes, storeEdges]);

  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setSelectedNodes([node.id]);
  }, [setSelectedNodes]);

  return (
    <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onSelectionChange={onSelectionChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          selectNodesOnDrag={false}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick={false}
          minZoom={0.1}
          maxZoom={2.5}
          edgeUpdaterRadius={10}
          selectionOnDrag
          className="bg-transparent"
        >
          <Background 
            variant="dots" 
            gap={24} 
            size={1.5} 
            color="#e2e8f0" 
            className="opacity-60"
          />
          <Controls className="!bg-white/90 !backdrop-blur-sm !border-none !rounded-xl !shadow-lg !p-2 hover:!bg-white transition-all duration-200" />
          <MiniMap 
            className="!bg-white/90 !backdrop-blur-sm !border-none !rounded-xl !shadow-lg hidden lg:block"
            nodeColor={node => {
                if (node.type === 'custom') return '#3b82f6';
                return '#e2e8f0';
            }}
            maskColor="rgba(241, 245, 249, 0.7)"
            pannable
            zoomable
          />
        </ReactFlow>
      </motion.div>
    </div>
  );
}