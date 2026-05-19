import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdvancedPrograms from './pages/AdvancedPrograms';
import ProPacks from './pages/ProPacks';
import ProgramDetail from './pages/ProgramDetail';
import CartSidebar from './components/CartSidebar';
import PopupBanner from './components/PopupBanner';

// Import newly created static pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import FAQ from './pages/FAQ';
import PaymentRefund from './pages/PaymentRefund';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import ApplyAsMentor from './pages/ApplyAsMentor';
import About from './pages/About';
import Contact from './pages/Contact';
import Affiliate from './pages/Affiliate';



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll position to top on page navigation
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-purple/30">
            <PopupBanner />                                  {/* ← ADD THIS */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Home />} />
          <Route path="/advanced-programs" element={<AdvancedPrograms />} />
          <Route path="/pro-packs" element={<ProPacks />} />

          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/payment-and-refund" element={<PaymentRefund />} />
          <Route path="/refund-policy" element={<PaymentRefund />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/apply-as-mentor" element={<ApplyAsMentor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/affiliate" element={<Affiliate />} />
          
          {/* Dynamic Program Routes */}
          <Route path="/:programId" element={<ProgramDetail />} />
          <Route path="/advanced-:programId" element={<ProgramDetail />} />
          <Route path="/pro/:programId" element={<ProgramDetail />} />
          <Route path="/self-paced" element={<ProgramDetail />} />
          <Route path="/internships" element={<ProgramDetail />} />
          <Route path="/placement" element={<ProgramDetail />} />
          
          {/* Catch-all for sub-paths in dropdowns */}
          <Route path="/advanced-:cat/:programId" element={<ProgramDetail />} />
          <Route path="/:cat/:programId" element={<ProgramDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
