import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, cartCount, cartTotal } = useCart();
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
                  {cartCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart size={40} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm mb-8 max-w-xs">
                    Looks like you haven't added any programs to your cart yet.
                  </p>
                  <Link
                    to="/"
                    onClick={onClose}
                    className="bg-black text-white border-2 border-black px-6 py-3 rounded-full font-bold hover:bg-transparent hover:text-black transition-all flex items-center gap-2 text-sm"
                  >
                    Browse Courses <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded bg-gray-50 border border-gray-100 items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded border border-gray-200"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-gray-400 font-semibold uppercase">{item.category}</p>
                          <p className="text-brand-purple font-extrabold text-sm mt-1">
                            ₹{item.price ? item.price.toLocaleString('en-IN') : '0'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              {cartCount > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-2xl font-extrabold text-gray-900">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Link
                    to="/checkout/cart"
                    onClick={onClose}
                    className="w-full bg-black text-white border-2 border-black py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-transparent hover:text-black transition-all text-center block shadow-lg shadow-black/10"
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </Link>
                </>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-400 px-6 py-4 rounded-full font-bold cursor-not-allowed"
                >
                  Return to Course
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
