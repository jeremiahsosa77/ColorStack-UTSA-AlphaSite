import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Animated background blobs
const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Main gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0a1c33] to-[#061525]" />
    
    {/* Animated blobs */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#F15A22]/20 to-[#F15A22]/5 blur-3xl"
    />
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        x: [0, -20, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#1a4a7a]/30 to-[#0C2340]/10 blur-3xl"
    />
    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        rotate: [0, 10, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-gradient-to-r from-[#F15A22]/10 to-transparent blur-2xl"
    />
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        y: [0, -40, 0],
      }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-l from-[#2a5a9a]/20 to-transparent blur-3xl"
    />
  </div>
);

// Glass card component
const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={hover ? { scale: 1.02, y: -4 } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`
      relative backdrop-blur-xl bg-white/10 
      border border-white/20 
      rounded-3xl shadow-2xl shadow-black/20
      ${className}
    `}
  >
    {/* Inner glow effect */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// Info card with icon
const InfoCard = ({ icon, title, children }) => (
  <GlassCard className="p-6 md:p-8 h-full">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <div className="text-white/70 text-sm leading-relaxed">{children}</div>
  </GlassCard>
);

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    ulsaId: '',
    major: '',
    graduationYear: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.PROD 
        ? '/api/members' 
        : 'http://localhost:3001/api/members';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      console.log('Member registered:', data);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  return (
    <div className="min-h-screen relative">
      <BackgroundBlobs />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-lg"
          >
            <GlassCard className="p-8 md:p-10" hover={false}>
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F15A22]/20 border border-[#F15A22]/30 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#F15A22] animate-pulse" />
                <span className="text-sm font-medium text-white/90">ColorStack @ UTSA</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
              >
                Join a community{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F15A22] to-[#ff8c5a]">
                  built for you.
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 mb-8 leading-relaxed"
              >
                We're the UTSA chapter of ColorStack—empowering Black and Latinx tech students 
                with community, mentorship, and career opportunities. Everyone is welcome.
              </motion.p>

              {/* Form */}
              {!submitted ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 
                               text-white placeholder-white/40 
                               focus:outline-none focus:border-[#F15A22]/50 focus:ring-2 focus:ring-[#F15A22]/20
                               transition-all duration-200"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 
                               text-white placeholder-white/40 
                               focus:outline-none focus:border-[#F15A22]/50 focus:ring-2 focus:ring-[#F15A22]/20
                               transition-all duration-200"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="UTSA email (abc123@utsa.edu)"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 
                               text-white placeholder-white/40 
                               focus:outline-none focus:border-[#F15A22]/50 focus:ring-2 focus:ring-[#F15A22]/20
                               transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="major"
                      placeholder="Major"
                      required
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 
                               text-white placeholder-white/40 
                               focus:outline-none focus:border-[#F15A22]/50 focus:ring-2 focus:ring-[#F15A22]/20
                               transition-all duration-200"
                    />
                    <select
                      name="graduationYear"
                      required
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 
                               text-white appearance-none cursor-pointer
                               focus:outline-none focus:border-[#F15A22]/50 focus:ring-2 focus:ring-[#F15A22]/20
                               transition-all duration-200"
                      style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px'
                      }}
                    >
                      <option value="" disabled className="bg-[#0C2340] text-white/40">Grad year</option>
                      {years.map(year => (
                        <option key={year} value={year} className="bg-[#0C2340]">{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="ulsaId"
                      placeholder="UTSA ID (abc123)"
                      required
                      value={formData.ulsaId}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 
                               text-white placeholder-white/40 
                               focus:outline-none focus:border-[#F15A22]/50 focus:ring-2 focus:ring-[#F15A22]/20
                               transition-all duration-200"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 mt-2 rounded-xl font-semibold text-white
                             bg-gradient-to-r from-[#F15A22] to-[#ff7a45]
                             hover:from-[#ff6a35] hover:to-[#ff8a55]
                             shadow-lg shadow-[#F15A22]/30
                             focus:outline-none focus:ring-2 focus:ring-[#F15A22]/50 focus:ring-offset-2 focus:ring-offset-[#0C2340]
                             disabled:opacity-70 disabled:cursor-not-allowed
                             transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Become a member now'
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-white mb-2">Welcome to the family!</h3>
                  <p className="text-white/70">
                    We'll be in touch soon with next steps. Check your email!
                  </p>
                </motion.div>
              )}

              {/* Privacy note */}
              {!submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-white/40 text-center mt-5"
                >
                  🔒 We'll only use this to contact you about ColorStack @ UTSA.
                </motion.p>
              )}
            </GlassCard>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center mt-8"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/40 text-sm flex flex-col items-center gap-2"
              >
                <span>Learn more</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Info Cards Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Why ColorStack?
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                More than just a club—we're a movement to help underrepresented students thrive in tech.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <InfoCard icon="🤝" title="What is ColorStack?">
                  <p className="mb-3">
                    ColorStack is a national nonprofit on a mission to increase the number of Black and 
                    Latinx Computer Science graduates who start rewarding careers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">✦</span>
                      <span>15,000+ members nationwide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">✦</span>
                      <span>Career prep & internship support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">✦</span>
                      <span>Peer mentorship & community</span>
                    </li>
                  </ul>
                </InfoCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <InfoCard icon="🏫" title="Why join at UTSA?">
                  <p className="mb-3">
                    Our chapter brings ColorStack's mission to San Antonio, creating a local 
                    community where you'll find your people and grow together.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">✦</span>
                      <span>Weekly study sessions & workshops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">✦</span>
                      <span>Resume reviews & mock interviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">✦</span>
                      <span>Conference trips & networking events</span>
                    </li>
                  </ul>
                </InfoCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <InfoCard icon="📅" title="What's coming up?">
                  <p className="mb-3">
                    We've got exciting events planned this semester. Join us and be part of something 
                    amazing!
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">→</span>
                      <span>Fall Kickoff Meeting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">→</span>
                      <span>LeetCode Nights (weekly)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">→</span>
                      <span>Industry Networking Mixer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F15A22] mt-0.5">→</span>
                      <span>ColorStack National Conference</span>
                    </li>
                  </ul>
                </InfoCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#F15A22] to-[#ff8c5a]" />
                  <span className="font-semibold text-white">ColorStack @ UTSA</span>
                </div>
                <p className="text-white/50 text-sm">
                  Local chapter of the national ColorStack community.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="mailto:colorstack@utsa.edu"
                  className="text-white/60 hover:text-[#F15A22] transition-colors duration-200 
                           focus:outline-none focus:ring-2 focus:ring-[#F15A22]/50 rounded-lg p-1"
                  aria-label="Email us"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/colorstack_utsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#F15A22] transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-[#F15A22]/50 rounded-lg p-1"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://discord.gg/colorstack-utsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#F15A22] transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-[#F15A22]/50 rounded-lg p-1"
                  aria-label="Join our Discord"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a
                  href="https://colorstack.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#F15A22] transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-[#F15A22]/50 rounded-lg p-1"
                  aria-label="Visit ColorStack.org"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-white/30 text-xs">
                © {currentYear} ColorStack @ UTSA. Made with 🧡 in San Antonio.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}