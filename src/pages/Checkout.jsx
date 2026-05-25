import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Check, ShoppingBag, Lock, Ticket, QrCode,
  ShieldCheck, CheckCircle2, ArrowLeft, Loader2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProgramDetails } from '../utils/courseCatalog';

// Reliable, Inline SVG/HTML Vector Logos for India Payments
const UpiLogo = () => (
  <svg viewBox="0 0 60 20" className="h-5 shrink-0">
    <text x="2" y="15" fill="#092f5d" fontWeight="900" fontStyle="italic" fontSize="15" fontFamily="sans-serif">UPI</text>
    <path d="M38,6 L50,6" stroke="#f37021" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M35,11 L47,11" stroke="#007a3e" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const GPayLogo = () => (
  <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200 shrink-0">
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
    <span className="text-gray-800 font-black text-[10px] tracking-tight">Pay</span>
  </div>
);

const PhonePeLogo = () => (
  <div className="flex items-center gap-1.5 bg-[#5f259f] px-2 py-1 rounded-xl shrink-0 shadow-sm">
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-white">
      <path d="M10.206 9.941h2.949v4.692c-.402.201-.938.268-1.34.268-1.072 0-1.609-.536-1.609-1.743V9.941zm13.47 4.816c-1.523 6.449-7.985 10.442-14.433 8.919C2.794 22.154-1.199 15.691.324 9.243 1.847 2.794 8.309-1.199 14.757.324c6.449 1.523 10.442 7.985 8.919 14.433zm-6.231-5.888a.887.887 0 0 0-.871-.871h-1.609l-3.686-4.222c-.335-.402-.871-.536-1.407-.402l-1.274.401c-.201.067-.268.335-.134.469l4.021 3.82H6.386c-.201 0-.335.134-.335.335v.67c0 .469.402.871.871.871h.938v3.217c0 2.413 1.273 3.82 3.418 3.82.67 0 1.206-.067 1.877-.335v2.145c0 .603.469 1.072 1.072 1.072h.938a.432.432 0 0 0 .402-.402V9.874h1.542c.201 0 .335-.134.335-.335v-.67z" />
    </svg>
    <span className="text-white font-extrabold text-[10px] tracking-wider uppercase">PhonePe</span>
  </div>
);

const PaytmLogo = () => (
  <div className="flex items-center bg-white px-2 py-0.5 rounded border border-gray-200 shrink-0">
    <span className="text-[#00baf2] font-black text-xs tracking-tighter">pay</span>
    <span className="text-[#002e6e] font-black text-xs tracking-tighter">tm</span>
  </div>
);

const AmazonPayLogo = () => (
  <div className="flex items-center gap-0.5 bg-[#232f3e] px-2 py-0.5 rounded shadow-sm shrink-0">
    <span className="text-white font-extrabold text-[8px] tracking-tight">amazon</span>
    <span className="text-[#ff9900] font-black text-[8px] tracking-tight">pay</span>
  </div>
);

const VisaLogo = ({ active = true }) => (
  <div className={`transition-all duration-300 shrink-0 ${active ? 'opacity-100 scale-105' : 'opacity-40'}`}>
    <span className="text-[#1a1f71] font-black italic text-base tracking-tighter">VISA</span>
  </div>
);

const MastercardLogo = ({ active = true }) => (
  <svg viewBox="0 0 40 24" className={`h-5 shrink-0 transition-all duration-300 ${active ? 'opacity-100 scale-105' : 'opacity-40'}`}>
    <circle cx="14" cy="12" r="10" fill="#eb001b" />
    <circle cx="26" cy="12" r="10" fill="#ff5f00" opacity="0.9" />
    <circle cx="20" cy="12" r="7" fill="#f79e1b" opacity="0.6" />
  </svg>
);

const RuPayLogo = ({ active = true }) => (
  <div className={`flex items-center italic shrink-0 transition-all duration-300 ${active ? 'opacity-100 scale-105' : 'opacity-40'}`}>
    <span className="text-[#092f5d] font-black text-sm tracking-tighter">Ru</span>
    <span className="text-[#f37021] font-black text-sm tracking-tighter">Pay</span>
  </div>
);

const Checkout = () => {
  const { checkoutId } = useParams();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  // Form states
  const [activeTab, setActiveTab] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Payment method specific states
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardBrand, setCardBrand] = useState('unknown');
  const [netBank, setNetBank] = useState('hdfc');
  const [wallet, setWallet] = useState('');

  // UPI enhanced states
  const [upiSubMethod, setUpiSubMethod] = useState('app'); // 'app' or 'qr'
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay'); // 'gpay', 'phonepe', 'paytm', 'bhim', 'custom'
  const [upiUsername, setUpiUsername] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [isVerifyingQr, setIsVerifyingQr] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const UPI_APP_HANDLES = {
    gpay: '@okhdfc',
    phonepe: '@ybl',
    paytm: '@paytm',
    bhim: '@upi'
  };

  // Processing & Success States
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Derive checkout items and total price during render
  let checkoutItems = [];
  let totalPrice = 0;
  if (checkoutId === 'cart') {
    checkoutItems = cart;
    totalPrice = cartTotal;
  } else {
    const details = getProgramDetails(checkoutId);
    if (details) {
      checkoutItems = [details];
      totalPrice = details.price;
    }
  }

  // Handle empty cart redirection
  useEffect(() => {
    if (checkoutId === 'cart' && cart.length === 0) {
      navigate('/');
    }
  }, [checkoutId, cart.length, navigate]);

  // Card brand detection helper
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    let formattedVal = '';

    // Format card number to groups of 4 digits
    for (let i = 0; i < val.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formattedVal += ' ';
      formattedVal += val[i];
    }
    setCardNumber(formattedVal);

    // Detect Card Brand
    if (val.startsWith('4')) {
      setCardBrand('visa');
    } else if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(val)) {
      setCardBrand('mastercard');
    } else if (/^(508[5-9]|6521|6522|60|50[0-7])/.test(val)) {
      setCardBrand('rupay');
    } else {
      setCardBrand('unknown');
    }
  };

  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    let formattedVal = '';

    for (let i = 0; i < val.length && i < 4; i++) {
      if (i === 2) formattedVal += '/';
      formattedVal += val[i];
    }
    setCardExpiry(formattedVal);
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 3) setCardCvv(val);
  };

  // Coupon handling
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'KELVORNEX10') {
      setDiscount(totalPrice * 0.10);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try KELVORNEX10');
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setDiscount(0);
    setCouponCode('');
    setCouponError('');
  };

  // Price calculations
  const subtotal = totalPrice;
  const tax = Math.round((subtotal - discount) * 0.18); // 18% GST standard in India
  const finalTotal = subtotal - discount + tax;

  // Verify UPI App ID Simulation
  const handleVerifyUpi = () => {
    if (selectedUpiApp === 'custom') {
      if (!upiId || !upiId.includes('@')) {
        alert('Please enter a valid custom UPI ID (e.g. user@bank)');
        return;
      }
    } else {
      if (!upiUsername) {
        alert('Please enter your UPI username first.');
        return;
      }
    }

    setIsVerifyingUpi(true);
    setTimeout(() => {
      setIsVerifyingUpi(false);
      setIsUpiVerified(true);
    }, 1200);
  };

  // Verify QR Payment Simulation
  const handleQrPaymentVerify = () => {
    setIsVerifyingQr(true);
    setTimeout(() => {
      setIsVerifyingQr(false);
      setPaymentSuccess(true);
      setTransactionId('TXN' + Math.floor(1000000000 + Math.random() * 9000000000));
      if (checkoutId === 'cart') {
        clearCart();
      }
    }, 2000);
  };

  // Handle Payment Submit
  const handlePayment = (e) => {
    e.preventDefault();

    // Validation
    if (activeTab === 'upi') {
      if (upiSubMethod === 'app') {
        if (selectedUpiApp === 'custom') {
          if (!upiId || !upiId.includes('@')) {
            alert('Please enter a valid Custom UPI ID (e.g. user@bank).');
            return;
          }
          if (!isUpiVerified) {
            alert('Please verify your Custom UPI ID first.');
            return;
          }
        } else {
          if (!upiUsername) {
            alert('Please enter your UPI username.');
            return;
          }
          if (!isUpiVerified) {
            alert('Please verify your UPI ID first.');
            return;
          }
        }
      } else if (upiSubMethod === 'qr') {
        alert('Please click the "I Have Paid, Verify QR Payment" button above to complete QR payment.');
        return;
      }
    }

    if (activeTab === 'card' && (cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3 || !cardName)) {
      alert('Please fill in all credit card details correctly.');
      return;
    }

    if (activeTab === 'netbanking' && netBank !== 'hdfc') {
      alert('Please select HDFC Bank for Net Banking.');
      return;
    }

    if (activeTab === 'wallet' && !wallet) {
      alert('Please select your preferred Mobile Wallet.');
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Gateway processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTransactionId('TXN' + Math.floor(1000000000 + Math.random() * 9000000000));

      // If checking out the cart, clear it upon success
      if (checkoutId === 'cart') {
        clearCart();
      }
    }, 2500);
  };

  // Payment tab helper
  const tabClasses = (tab) => `flex items-center gap-3 p-4 rounded border font-bold text-sm transition-all ${activeTab === tab
    ? 'bg-brand-purple/5 border-brand-purple text-brand-purple'
    : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
    }`;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Catalog
        </Link>

        <h1 className="text-3xl md:text-5xl font-black font-display text-gray-900 mb-12 tracking-tight">
          Secure <span className="text-brand-purple">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
              <h2 className="text-xl font-bold font-display text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-purple" /> Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2 mb-6">
                {checkoutItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center p-3 rounded bg-gray-50 border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded border border-gray-200 shadow-sm shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-gray-800 text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.category}</p>
                      <p className="text-xs text-gray-500 font-medium">{item.duration} • {item.level}</p>
                    </div>
                    <div className="ml-auto text-brand-purple font-black text-sm shrink-0">
                      ₹{item.price ? item.price.toLocaleString('en-IN') : '0'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="pt-6 border-t border-gray-100 mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="w-full pl-10 pr-4 py-3 rounded border border-gray-200 text-sm font-bold placeholder-gray-400 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple disabled:bg-gray-50"
                    />
                  </div>
                  {couponApplied ? (
                    <button
                      onClick={removeCoupon}
                      className="bg-red-50 hover:bg-red-100 text-red-500 px-4 rounded text-xs font-bold transition-all"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={applyCoupon}
                      className="bg-brand-dark hover:bg-gray-800 text-white px-6 rounded text-sm font-bold transition-all"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {couponError && <p className="text-red-500 text-xs font-semibold mt-2 pl-1">{couponError}</p>}
                {couponApplied && <p className="text-green-600 text-xs font-bold mt-2 pl-1">10% discount applied successfully!</p>}
              </div>

              {/* Price Calculation */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-green-600 font-bold">
                    <span>Coupon Discount (10%)</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>GST (18% standard)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-extrabold text-gray-900">Total Price</span>
                  <span className="text-3xl font-black text-brand-purple font-display">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-brand-dark rounded p-6 text-white border border-white/10 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-purple/10 blur-2xl rounded-full" />
              <ShieldCheck size={36} className="text-brand-gold shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Secure Checkout Assured</h4>
                <p className="text-white/60 text-xs mt-1">256-bit encryption safeguards your transaction credentials.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePayment} className="bg-white rounded p-8 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-8">
              <h2 className="text-xl font-bold font-display text-gray-900 flex items-center gap-2">
                <CreditCard size={20} className="text-brand-purple" /> Select Payment Option
              </h2>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button type="button" onClick={() => setActiveTab('upi')} className={tabClasses('upi')}>
                  <QrCode size={18} /> UPI
                </button>
                <button type="button" onClick={() => setActiveTab('card')} className={tabClasses('card')}>
                  <CreditCard size={18} /> Cards
                </button>
                <button type="button" onClick={() => setActiveTab('netbanking')} className={tabClasses('netbanking')}>
                  <ShoppingBag size={18} /> Net Banking
                </button>
                <button type="button" onClick={() => setActiveTab('wallet')} className={tabClasses('wallet')}>
                  <CreditCard size={18} /> Wallets
                </button>
              </div>

              {/* Form Content Body */}
              <div className="p-6 rounded bg-gray-50 border border-gray-100 min-h-[220px]">
                <AnimatePresence mode="wait">
                  {/* UPI Tab */}
                  {activeTab === 'upi' && (
                    <motion.div
                      key="upi-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-6"
                    >
                      {/* Sub-tabs for UPI: App vs QR */}
                      <div className="flex gap-2 border-b border-gray-150 pb-2">
                        <button
                          type="button"
                          onClick={() => setUpiSubMethod('app')}
                          className={`pb-2 px-4 font-bold text-sm transition-all border-b-2 ${upiSubMethod === 'app'
                            ? 'border-brand-purple text-brand-purple'
                            : 'border-transparent text-gray-400 hover:text-gray-650'
                            }`}
                        >
                          UPI Application
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiSubMethod('qr')}
                          className={`pb-2 px-4 font-bold text-sm transition-all border-b-2 ${upiSubMethod === 'qr'
                            ? 'border-brand-purple text-brand-purple'
                            : 'border-transparent text-gray-400 hover:text-gray-650'
                            }`}
                        >
                          Scan QR Code
                        </button>
                      </div>

                      {upiSubMethod === 'app' ? (
                        <div className="space-y-6">
                          {/* App selectors */}
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Choose UPI App</label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                              {[
                                { id: 'gpay', name: 'Google Pay', logo: <GPayLogo /> },
                                { id: 'phonepe', name: 'PhonePe', logo: <PhonePeLogo /> },
                                { id: 'paytm', name: 'Paytm', logo: <PaytmLogo /> },
                                { id: 'bhim', name: 'BHIM UPI', logo: <UpiLogo /> },
                                { id: 'custom', name: 'Custom ID', logo: <span className="font-extrabold text-xs tracking-tighter text-brand-purple uppercase">Other VPA</span> }
                              ].map((app) => (
                                <button
                                  key={app.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedUpiApp(app.id);
                                    setIsUpiVerified(false);
                                  }}
                                  className={`flex flex-col items-center justify-center p-3 bg-white border rounded-xl hover:border-brand-purple hover:scale-[1.03] transition-all gap-2 h-20 ${selectedUpiApp === app.id
                                    ? 'border-brand-purple shadow-md ring-1 ring-brand-purple/20 bg-brand-purple/5'
                                    : 'border-gray-150 shadow-sm'
                                    }`}
                                >
                                  {app.logo}
                                  <span className="text-[10px] font-extrabold text-gray-500 text-center leading-none mt-1">{app.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* App input field */}
                          {selectedUpiApp === 'custom' ? (
                            <div className="space-y-2">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enter UPI ID (VPA)</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="e.g. username@bank"
                                  value={upiId}
                                  onChange={(e) => {
                                    setUpiId(e.target.value);
                                    setIsUpiVerified(false);
                                  }}
                                  className="flex-1 px-4 py-3 bg-white rounded-xl border border-gray-250 text-sm font-bold focus:outline-none focus:border-brand-purple"
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyUpi}
                                  disabled={isVerifyingUpi || !upiId}
                                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${isUpiVerified
                                    ? 'bg-green-50 text-green-650 border border-green-200'
                                    : 'bg-brand-purple text-white hover:bg-brand-purple-light disabled:opacity-50'
                                    }`}
                                >
                                  {isVerifyingUpi ? (
                                    <Loader2 size={14} className="animate-spin" />
                                  ) : isUpiVerified ? (
                                    <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Verified</span>
                                  ) : (
                                    'Verify'
                                  )}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enter UPI Username</label>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    placeholder="e.g. name"
                                    value={upiUsername}
                                    onChange={(e) => {
                                      setUpiUsername(e.target.value);
                                      setIsUpiVerified(false);
                                    }}
                                    className="w-full px-4 py-3 bg-white rounded-xl border border-gray-250 text-sm font-bold focus:outline-none focus:border-brand-purple"
                                    style={{ paddingRight: `${(UPI_APP_HANDLES[selectedUpiApp].length * 9) + 16}px` }}
                                  />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-extrabold text-sm pointer-events-none select-none">
                                    {UPI_APP_HANDLES[selectedUpiApp]}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={handleVerifyUpi}
                                  disabled={isVerifyingUpi || !upiUsername}
                                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${isUpiVerified
                                    ? 'bg-green-50 text-green-650 border border-green-200'
                                    : 'bg-brand-purple text-white hover:bg-brand-purple-light disabled:opacity-50'
                                    }`}
                                >
                                  {isVerifyingUpi ? (
                                    <Loader2 size={14} className="animate-spin" />
                                  ) : isUpiVerified ? (
                                    <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Verified</span>
                                  ) : (
                                    'Verify'
                                  )}
                                </button>
                              </div>
                              <p className="text-[10px] text-gray-450 font-bold mt-1">Your VPA will be: {upiUsername || 'username'}{UPI_APP_HANDLES[selectedUpiApp]}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-2xl border border-gray-150 shadow-sm animate-fadeIn">
                          <div className="shrink-0 flex flex-col items-center p-3 border border-gray-100 rounded-xl shadow-inner bg-gray-50">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=kelvornex@okhdfc&pn=Kelvornex&am=${finalTotal}&cu=INR`)}`}
                              alt="Payment QR"
                              className="w-28 h-28"
                            />
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-[8px] text-gray-450 font-extrabold uppercase">Live Session Active</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <span className="font-extrabold text-sm text-gray-800 block mb-1">Scan & Pay via any UPI App</span>
                              <p className="text-xs text-gray-450 leading-relaxed font-medium">Scan this code using Google Pay, PhonePe, Paytm, or BHIM. Enter your PIN in your app to authorize.</p>
                            </div>
                            <div className="flex flex-wrap gap-4 items-center border-t border-gray-50 pt-3">
                              <GPayLogo />
                              <PhonePeLogo />
                              <PaytmLogo />
                            </div>
                            <button
                              type="button"
                              onClick={handleQrPaymentVerify}
                              disabled={isVerifyingQr}
                              className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                            >
                              {isVerifyingQr ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" /> Verifying QR Transaction...
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 size={14} /> I Have Paid, Verify QR Payment
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Cards Tab */}
                  {activeTab === 'card' && (
                    <motion.div
                      key="card-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span className="font-extrabold text-sm text-gray-800">Card Payment Details</span>
                        <div className="flex gap-2 items-center">
                          <VisaLogo active={cardBrand === 'visa'} />
                          <MastercardLogo active={cardBrand === 'mastercard'} />
                          <RuPayLogo active={cardBrand === 'rupay'} />
                        </div>
                      </div>

                      {/* Virtual Card Preview */}
                      <div className="w-full max-w-[320px] mx-auto h-[180px] mb-8 animate-fadeIn" style={{ perspective: '1000px' }}>
                        <div
                          className="relative w-full h-full duration-500"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          {/* Card Front */}
                          <div
                            className="absolute inset-0 w-full h-full rounded-xl p-5 text-white bg-gradient-to-br from-brand-purple via-indigo-600 to-indigo-800 shadow-lg flex flex-col justify-between overflow-hidden border border-white/10"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            {/* Glass overlay shine */}
                            <div className="absolute -right-16 -top-16 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
                            <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-brand-purple-light/20 rounded-full blur-xl pointer-events-none" />

                            <div className="flex justify-between items-start z-10">
                              {/* Chip */}
                              <div className="w-9 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md opacity-85 border border-yellow-200/50 shadow-inner relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-x-2.5 top-0 bottom-0 border-x border-yellow-700/20" />
                                <div className="absolute inset-y-2 left-0 right-0 border-y border-yellow-700/20" />
                              </div>
                              {/* Brand logo */}
                              <div className="h-6 flex items-center justify-end">
                                {cardBrand === 'visa' && <span className="text-white font-black italic text-lg tracking-tighter">VISA</span>}
                                {cardBrand === 'mastercard' && (
                                  <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-[#eb001b]" />
                                    <div className="w-6 h-6 rounded-full bg-[#ff5f00] opacity-90" />
                                  </div>
                                )}
                                {cardBrand === 'rupay' && (
                                  <div className="flex items-center italic">
                                    <span className="text-white font-black text-sm tracking-tighter">Ru</span>
                                    <span className="text-brand-purple-light font-black text-sm tracking-tighter">Pay</span>
                                  </div>
                                )}
                                {cardBrand === 'unknown' && <span className="text-white/40 font-bold text-[10px] uppercase tracking-wider">Debit Card</span>}
                              </div>
                            </div>

                            <div className="text-lg font-mono tracking-widest text-center py-1 text-white/90 z-10 select-none">
                              {cardNumber || '•••• •••• •••• ••••'}
                            </div>

                            <div className="flex justify-between items-end z-10">
                              <div className="min-w-0 pr-2">
                                <div className="text-[8px] uppercase tracking-wider text-white/40 font-bold mb-0.5">Card Holder</div>
                                <div className="text-[10px] font-extrabold uppercase tracking-wide truncate max-w-[170px] select-none">
                                  {cardName || 'YOUR FULL NAME'}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="text-[8px] uppercase tracking-wider text-white/40 font-bold mb-0.5">Expires</div>
                                <div className="text-[10px] font-extrabold tracking-wider font-mono select-none">
                                  {cardExpiry || 'MM/YY'}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Back */}
                          <div
                            className="absolute inset-0 w-full h-full rounded-xl text-white bg-gradient-to-br from-gray-800 to-gray-950 shadow-lg flex flex-col justify-between py-5 border border-white/5"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)'
                            }}
                          >
                            {/* Stripe */}
                            <div className="w-full h-8 bg-gray-900" />

                            {/* Signature & CVV */}
                            <div className="px-5 space-y-1">
                              <div className="text-[7px] uppercase tracking-wider text-white/30 font-bold">Authorized Signature</div>
                              <div className="flex items-center">
                                <div
                                  className="flex-1 h-6 bg-white/10 rounded-l flex items-center px-2 pointer-events-none"
                                  style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)'
                                  }}
                                />
                                <div className="bg-white text-gray-950 px-2.5 h-6 flex items-center font-mono text-xs font-black rounded-r select-none">
                                  {cardCvv || '•••'}
                                </div>
                              </div>
                            </div>

                            {/* Bottom disclaimer */}
                            <div className="px-5 text-[7px] text-white/20 leading-tight">
                              This card is simulated for Kelvornex payments. Do not input real credit card credentials here.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Card Number</label>
                          <input
                            type="text"
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            onFocus={() => setIsCardFlipped(false)}
                            maxLength="19"
                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-250 text-sm font-bold focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            onFocus={() => setIsCardFlipped(false)}
                            maxLength="5"
                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-250 text-sm font-bold focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">CVV Code</label>
                          <input
                            type="password"
                            placeholder="•••"
                            value={cardCvv}
                            onChange={handleCvvChange}
                            onFocus={() => setIsCardFlipped(true)}
                            onBlur={() => setIsCardFlipped(false)}
                            maxLength="3"
                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-250 text-sm font-bold focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Full Name as on card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            onFocus={() => setIsCardFlipped(false)}
                            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-250 text-sm font-bold focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Netbanking Tab */}
                  {activeTab === 'netbanking' && (
                    <motion.div
                      key="netbanking-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-6"
                    >
                      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-gray-800 mb-1">Direct Bank Integration Active</h4>
                          <p className="text-xs text-gray-500 leading-relaxed font-medium">
                            Net Banking is currently available exclusively for **HDFC Bank** accounts. For other banks, please select the Card or UPI payment option.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center py-2">
                        <button
                          type="button"
                          onClick={() => setNetBank('hdfc')}
                          className={`flex flex-col items-center justify-center p-6 bg-white border rounded-2xl hover:border-brand-purple hover:scale-[1.02] transition-all gap-4 w-full max-w-md ${netBank === 'hdfc'
                            ? 'border-brand-purple shadow-md ring-2 ring-brand-purple/20 bg-brand-purple/5'
                            : 'border-gray-200 shadow-sm'
                            }`}
                        >
                          <div className="w-20 h-10 flex items-center justify-center shrink-0 bg-[#003366] rounded-xl shadow-md border border-[#002244]/20 p-2">
                            <svg viewBox="0 0 50 24" className="w-full h-full shrink-0">
                              <text x="50%" y="60%" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">HDFC</text>
                            </svg>
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-extrabold text-gray-800 block">HDFC Bank NetBanking</span>
                            <span className="text-xs text-green-600 font-bold mt-1 flex items-center justify-center gap-1">
                              <CheckCircle2 size={12} /> Pre-selected & Active
                            </span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Wallets Tab */}
                  {activeTab === 'wallet' && (
                    <motion.div
                      key="wallet-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-6"
                    >
                      <span className="font-extrabold text-sm text-gray-800 block border-b border-gray-200 pb-3">Available Wallets</span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { id: 'paytm', name: 'Paytm Wallet' },
                          { id: 'phonepe', name: 'PhonePe' },
                          { id: 'amazon', name: 'Amazon Pay' }
                        ].map((w) => (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => setWallet(w.id)}
                            className={`flex flex-col items-center justify-center p-4 bg-white border rounded-xl hover:border-brand-purple hover:scale-105 transition-all gap-3 ${wallet === w.id ? 'border-brand-purple shadow-md ring-1 ring-brand-purple/20 bg-brand-purple/5' : 'border-gray-100 shadow-sm'
                              }`}
                          >
                            {w.id === 'paytm' && <PaytmLogo />}
                            {w.id === 'phonepe' && <PhonePeLogo />}
                            {w.id === 'amazon' && <AmazonPayLogo />}
                            <span className="text-xs font-bold text-gray-600">{w.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-vibrant hover:scale-[1.01] transition-transform text-white py-4 rounded font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-brand-purple/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing Secure Payment...
                  </>
                ) : (
                  <>
                    Pay Securely ₹{finalTotal.toLocaleString('en-IN')} <Lock size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {paymentSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded p-8 max-w-md w-full border border-gray-100 shadow-2xl relative text-center overflow-hidden"
            >
              {/* Confetti Micro-Animations */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#6366f1', '#a855f7', '#f43f5e', '#eab308', '#10b981'][i % 5],
                      top: '40%',
                      left: '50%',
                    }}
                    animate={{
                      y: [0, -100 - ((i * 17) % 151)],
                      x: [0, -150 + ((i * 23) % 301)],
                      opacity: [1, 0],
                      scale: [1, 0.5],
                    }}
                    transition={{
                      duration: 1.5 + ((i * 7) % 11) / 10,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6 shadow-sm border border-green-100">
                <CheckCircle2 size={48} className="animate-bounce" />
              </div>

              <h2 className="text-3xl font-black text-gray-900 mb-2 font-display">Payment Success!</h2>
              <p className="text-gray-500 text-sm mb-6">Congratulations! You have successfully enrolled in your program(s).</p>

              {/* Receipt Details Card */}
              <div className="bg-gray-50 rounded p-5 border border-gray-100 text-left text-xs space-y-3 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase">Transaction ID</span>
                  <span className="font-extrabold text-gray-800">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase">Amount Paid</span>
                  <span className="font-extrabold text-brand-purple text-sm">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase">Mode of Payment</span>
                  <span className="font-extrabold text-gray-800 uppercase">{activeTab}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase">Status</span>
                  <span className="font-extrabold text-green-600 flex items-center gap-1">
                    <Check size={12} strokeWidth={3} /> Success
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-brand-dark hover:bg-gray-800 text-white py-4 rounded font-bold text-sm transition-all"
              >
                Go to Courses Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
