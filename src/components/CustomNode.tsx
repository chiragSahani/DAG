import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { Settings, Circle, Zap } from 'lucide-react';

interface CustomNodeData {
  label: string;
}

export function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  return (
    <motion.div
      className={`
        relative bg-white/95 backdrop-blur-sm border-2 rounded-xl shadow-lg min-w-[180px] 
        transition-all duration-300 cursor-pointer
        ${selected 
          ? 'border-blue-500 shadow-blue-200/50 shadow-xl' 
          : 'border-gray-200/80 hover:border-gray-300/80 hover:shadow-xl'
        }
      `}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="w-4 h-4 border-2 border-emerald-500 bg-white hover:bg-emerald-50 transition-all duration-200 shadow-sm"
        style={{ left: -8 }}
      />
      
      {/* Node Content */}
      <div className="p-5">
        <motion.div 
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            <Settings className="w-4 h-4 text-white" />
          </motion.div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Pipeline Node
          </div>
        </motion.div>
        
        <motion.div 
          className="font-semibold text-gray-800 text-sm leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {data.label}
        </motion.div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="w-4 h-4 border-2 border-blue-500 bg-white hover:bg-blue-50 transition-all duration-200 shadow-sm"
        style={{ right: -8 }}
      />
      
      {/* Animated port indicators */}
      <motion.div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Circle className="w-3 h-3 text-emerald-500 fill-current" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Circle className="w-3 h-3 text-blue-500 fill-current" />
        </motion.div>
      </motion.div>

      {/* Subtle glow effect when selected */}
      {selected && (
        <motion.div
          className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Floating energy effect */}
      <motion.div
        className="absolute top-2 right-2"
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Zap className="w-3 h-3 text-yellow-500" />
      </motion.div>
    </motion.div>
  );
}