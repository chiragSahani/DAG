import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import { ValidationPanel } from './ValidationPanel';
import { JSONPreview } from './JSONPreview';
import { Menu, X } from 'lucide-react';

export function PipelineEditor() {
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Toolbar />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Canvas */}
        <div className="flex-1 relative">
          <Canvas />
        </div>
        
        {/* Desktop Validation Panel */}
        <div className="hidden lg:block">
          <ValidationPanel />
        </div>
        
        {/* Mobile Panel Toggle */}
        <motion.button
          className="lg:hidden fixed top-20 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200/50"
          onClick={() => setShowMobilePanel(!showMobilePanel)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: showMobilePanel ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {showMobilePanel ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </motion.button>
        
        {/* Mobile Validation Panel */}
        <motion.div
          className="lg:hidden fixed inset-y-0 right-0 z-40 w-80 max-w-[90vw]"
          initial={{ x: '100%' }}
          animate={{ x: showMobilePanel ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <ValidationPanel />
        </motion.div>
        
        {/* Mobile Overlay */}
        {showMobilePanel && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobilePanel(false)}
          />
        )}
      </div>
      
      <JSONPreview />
    </div>
  );
}