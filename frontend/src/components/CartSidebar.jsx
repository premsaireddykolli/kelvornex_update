import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-brand-purple" size={24} />
                <h2 className="text-xl font-bold font-display text-gray-900">Your Cart</h2>
                <span className="bg-brand-purple/10 text-brand-purple text-xs font-bold px-2 py-1 rounded-full">
                  0
                </span>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body - Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart size={48} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any programs to your cart yet.
              </p>
              
              <button 
                onClick={onClose}
                className="bg-brand-purple text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-purple-dark transition-colors flex items-center gap-2"
              >
                Browse Courses <ArrowRight size={18} />
              </button>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button 
                disabled
                className="w-full bg-gray-200 text-gray-400 px-6 py-4 rounded-xl font-bold cursor-not-allowed"
              >
                Return to Course
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
