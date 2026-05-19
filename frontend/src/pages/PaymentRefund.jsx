import React from 'react';
import Layout from '../components/Layout';
import { CreditCard, ShieldCheck, RefreshCw, Calendar, FileText, CheckCircle2 } from 'lucide-react';

const PaymentRefund = () => {
  const refundSteps = [
    {
      step: "01",
      title: "Submit a Request",
      desc: "Send an email to support@kelvornex.com with your registered Email ID, Order ID, and details about why you want a refund."
    },
    {
      step: "02",
      title: "Review & Validation",
      desc: "Our support and finance team will review the request against our enrollment conditions, cohort timelines, and attendance logs."
    },
    {
      step: "03",
      title: "Processing",
      desc: "Once approved, the refund will be initiated immediately. It will be credited back to your original payment method in 5 to 7 business days."
    }
  ];

  const guidelines = [
    {
      title: "Self-Paced Courses",
      condition: "100% Refund within 3 Days",
      details: "Refund is applicable if requested within 3 days of purchase, provided that less than 15% of the course modules have been watched."
    },
    {
      title: "Advanced Live Programs",
      condition: "Refund before the 2nd Lecture",
      details: "Request must be sent prior to the commencement of the second live lecture of the batch. Any registration fees or kit charges are non-refundable."
    },
    {
      title: "Pro Packs (Bundle Courses)",
      condition: "Partial & Full Refund Rules",
      details: "Full refund is available within 48 hours of purchase. If you have already unlocked or started multiple courses in the pack, a partial refund may apply."
    }
  ];

  return (
    <Layout 
      title="Payment & Refund Policy" 
      subtitle="Understand our enrollment transaction guidelines, EMI facilities, and transparent refund timelines."
      description="Kelvornex Payment & Refund Policy: Clear details on billing options, interest-free EMIs, course cancellations, and refund processing."
    >
      <div className="space-y-16">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Secure Payments</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We integrate with top-tier industry gateways supporting 256-bit encryption. Your financial data is fully encrypted and secure.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center mx-auto">
              <Calendar size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">EMI Plans Available</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Upskill without budget constraints. Avail 0% interest EMI schemes on premium cohorts in partnership with leading consumer credit networks.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Simple Refunds</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Change of plans? We provide a hassle-free cancellation process. Get refunds directly credited back to your bank account or wallet.
            </p>
          </div>
        </div>

        {/* Guidelines section */}
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-gray-900 text-center">Program Specific Refund Rules</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guidelines.map((guide, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="p-8 space-y-4">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple">
                    {guide.condition}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{guide.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{guide.details}</p>
                </div>
                <div className="bg-slate-50 p-4 border-t border-gray-100 text-xs font-semibold text-gray-400 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Refund Policy Compliant
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-gray-900">How to request a refund?</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">Follow these simple steps to claim a refund on eligible transactions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {refundSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-brand-purple text-white rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-lg shadow-brand-purple/20">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note Alert */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 space-y-2">
          <h4 className="font-bold text-base flex items-center gap-2">
            <FileText size={18} /> Important Note regarding EMI Cancellations
          </h4>
          <p className="text-sm leading-relaxed text-amber-700">
            For courses purchased using EMI plans, interest charges paid to third-party lenders and processing fees charged by banks are non-refundable. The base amount returned will be processed through our financial partners, which could require additional verification documents.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentRefund;
