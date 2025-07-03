import React from 'react';
import { motion } from 'framer-motion';
import { usePipelineStore } from '../stores/pipelineStore';
import { CheckCircle, XCircle, AlertCircle, Activity, TrendingUp, Sparkles } from 'lucide-react';

export function ValidationPanel() {
  const { dagValidation, nodes, edges } = usePipelineStore();

  const getStatusIcon = () => {
    if (dagValidation.isValid) {
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    } else if (dagValidation.errors.some(error => error.includes('cycle'))) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusColor = () => {
    if (dagValidation.isValid) return 'border-emerald-200 bg-emerald-50/80';
    if (dagValidation.errors.some(error => error.includes('cycle'))) return 'border-red-200 bg-red-50/80';
    return 'border-amber-200 bg-amber-50/80';
  };

  const getCheckIcon = (condition: boolean) => {
    return condition ? (
      <CheckCircle className="w-4 h-4 text-emerald-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-sm border-l border-gray-200/50 p-4 sm:p-6 w-full sm:w-80 overflow-y-auto shadow-lg h-full"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-sm"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Activity className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">DAG Validation</h2>
          <p className="text-xs text-gray-500">Real-time graph analysis</p>
        </div>
      </motion.div>

      {/* Overall Status */}
      <motion.div 
        className={`border rounded-xl p-4 mb-6 backdrop-blur-sm ${getStatusColor()}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            {getStatusIcon()}
          </motion.div>
          <span className="font-semibold text-gray-800">
            {dagValidation.isValid ? (
              <motion.span
                animate={{ color: ['#10b981', '#059669', '#10b981'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Valid DAG ✨
              </motion.span>
            ) : (
              'Invalid DAG'
            )}
          </span>
        </div>
        
        {dagValidation.errors.length > 0 && (
          <motion.div 
            className="text-sm text-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.2 }}
          >
            <div className="font-medium mb-2">Issues to resolve:</div>
            <ul className="list-disc list-inside space-y-1">
              {dagValidation.errors.map((error, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {error}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Detailed Checks */}
      <motion.div 
        className="space-y-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-medium text-gray-800 mb-3">Validation Checks</h3>
        
        {[
          { condition: dagValidation.hasMinimumNodes, text: `Minimum 2 nodes (${nodes.length} nodes)` },
          { condition: dagValidation.hasNoCycles, text: 'No cycles (acyclic)' },
          { condition: dagValidation.allNodesConnected, text: `All nodes connected (${edges.length} edges)` },
          { condition: dagValidation.hasNoSelfLoops, text: 'No self-loops' },
          { condition: dagValidation.hasValidEdgeDirections, text: 'Valid edge directions' }
        ].map((check, index) => (
          <motion.div 
            key={index}
            className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-gray-50/80 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + 0.1 * index, type: "spring" }}
            >
              {getCheckIcon(check.condition)}
            </motion.div>
            <span className={check.condition ? 'text-gray-700' : 'text-gray-600'}>
              {check.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Graph Statistics */}
      <motion.div 
        className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-xl backdrop-blur-sm mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </motion.div>
          <h3 className="font-medium text-gray-800">Graph Statistics</h3>
        </div>
        <div className="text-sm text-gray-600 space-y-2">
          <motion.div 
            className="flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>Nodes:</span>
            <motion.span 
              className="font-medium"
              animate={{ scale: nodes.length > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {nodes.length}
            </motion.span>
          </motion.div>
          <motion.div 
            className="flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span>Edges:</span>
            <motion.span 
              className="font-medium"
              animate={{ scale: edges.length > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {edges.length}
            </motion.span>
          </motion.div>
          <motion.div 
            className="flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>Density:</span>
            <span className="font-medium">
              {nodes.length > 1 
                ? ((edges.length / (nodes.length * (nodes.length - 1))) * 100).toFixed(1) + '%'
                : '0%'
              }
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div 
        className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/80 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
          </motion.div>
          <h3 className="font-medium text-gray-800">Quick Tips</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-2">
          {[
            'Click "Add Node" to create nodes',
            'Drag from blue dots to create edges',
            'Press Delete to remove selected items',
            'Use "Layout" to organize nodes',
            'Right-click nodes for context menu'
          ].map((tip, index) => (
            <motion.div 
              key={index}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <motion.span 
                className="text-blue-500 mt-0.5"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                •
              </motion.span>
              <span>{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}