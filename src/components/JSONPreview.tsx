import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePipelineStore } from '../stores/pipelineStore';
import { Code, ChevronDown, Copy, Check, FileJson } from 'lucide-react';

export function JSONPreview() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { nodes, edges } = usePipelineStore();

  const graphData = {
    nodes: nodes.map(node => ({
      id: node.id,
      label: node.data.label,
      position: node.position,
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    })),
  };

  const jsonString = JSON.stringify(graphData, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-sm border-t border-gray-200/50 shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/80 transition-all duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-sm"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <FileJson className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-gray-800">JSON Preview</h3>
            <span className="text-sm text-gray-500">
              {nodes.length} nodes, {edges.length} edges
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
            className="p-2 hover:bg-gray-200/80 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            title="Copy JSON"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* JSON Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200/50 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50">
              <motion.pre 
                className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap break-words max-h-64 overflow-y-auto bg-white/80 p-4 rounded-xl border border-gray-200/50 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {jsonString}
              </motion.pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}