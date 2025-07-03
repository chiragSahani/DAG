import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePipelineStore } from '../stores/pipelineStore';
import { getLayoutedElements } from '../utils/autoLayout';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  Download, 
  GitBranch,
  Zap,
  X,
  Sparkles
} from 'lucide-react';

export function Toolbar() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  
  const { 
    addNode, 
    deleteSelected, 
    nodes, 
    edges, 
    setNodes,
    selectedNodes,
    selectedEdges,
    clearSelection
  } = usePipelineStore();

  const handleAddNode = () => {
    if (newNodeLabel.trim()) {
      addNode(newNodeLabel.trim());
      setNewNodeLabel('');
      setShowAddDialog(false);
    }
  };

  const handleAutoLayout = () => {
    if (nodes.length > 0) {
      const { nodes: layoutedNodes } = getLayoutedElements(nodes, edges);
      setNodes(layoutedNodes);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleAddNode();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setShowAddDialog(false);
      setNewNodeLabel('');
    }
  };

  const handleDialogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAddDialog(false);
    setNewNodeLabel('');
  };

  const exportGraph = () => {
    const graphData = { nodes, edges };
    const dataStr = JSON.stringify(graphData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pipeline-graph.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <motion.div 
        className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-4 shadow-sm relative z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <GitBranch className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">Pipeline Editor</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Build and validate DAG structures</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 flex-wrap"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Add Node Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowAddDialog(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline">Add Node</span>
            </motion.button>

            {/* Delete Selected Button */}
            <motion.button
              onClick={deleteSelected}
              disabled={selectedNodes.length === 0 && selectedEdges.length === 0}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm text-sm"
              whileHover={{ scale: selectedNodes.length > 0 || selectedEdges.length > 0 ? 1.05 : 1 }}
              whileTap={{ scale: selectedNodes.length > 0 || selectedEdges.length > 0 ? 0.95 : 1 }}
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </motion.button>

            {/* Auto Layout Button */}
            <motion.button
              onClick={handleAutoLayout}
              disabled={nodes.length < 2}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm text-sm"
              whileHover={{ scale: nodes.length >= 2 ? 1.05 : 1 }}
              whileTap={{ scale: nodes.length >= 2 ? 0.95 : 1 }}
            >
              <motion.div
                animate={{ 
                  rotate: nodes.length >= 2 ? [0, 360] : 0,
                  scale: nodes.length >= 2 ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: nodes.length >= 2 ? Infinity : 0,
                  repeatDelay: 1
                }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline">Layout</span>
            </motion.button>

            {/* Clear Selection Button */}
            <motion.button
              onClick={clearSelection}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </motion.button>

            {/* Export Button */}
            <motion.button
              onClick={exportGraph}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Download className="w-4 h-4" />
              </motion.div>
              <span className="hidden sm:inline">Export</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Add Node Dialog - Separate Portal */}
      <AnimatePresence>
        {showAddDialog && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={handleDialogClick}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-blue-500" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-800">Add New Node</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAddDialog(false);
                    setNewNodeLabel('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
              
              <motion.input
                type="text"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter node label..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                autoFocus
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              />
              
              <motion.div 
                className="flex justify-end gap-3 mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAddDialog(false);
                    setNewNodeLabel('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddNode();
                  }}
                  disabled={!newNodeLabel.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm"
                >
                  Add Node
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}