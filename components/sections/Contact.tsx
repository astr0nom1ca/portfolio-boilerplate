'use client'

import React, { useState } from 'react'

export default function Contact({ data }: { data: any }) {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data?.formspreeId) {
      setStatus('ERROR');
      return;
    }

    setStatus('SENDING');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${data?.formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  const handleWhatsAppClick = async () => {
    const formData = new FormData();
    formData.append("message", "System Log: A user clicked WhatsApp.");
    fetch(`https://formspree.io/f/${data?.formspreeId}`, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
      keepalive: true, 
    }).catch(() => {});

    const cleanNumber = data?.whatsappNumber?.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-bold mb-12 text-center">{data?.title}</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side: WhatsApp */}
          <div className="flex flex-col justify-center space-y-6">
            <h3 className="text-2xl font-semibold">Direct Chat</h3>
            <p className="text-gray-600 dark:text-zinc-400">Click below to start a WhatsApp conversation instantly.</p>
            <button 
              onClick={handleWhatsAppClick}
              aria-label="Chat with me on WhatsApp"
              /* FIXED: Removed -600 from hex, added min-h for touch targets */
              className="inline-block w-full bg-[#128C7E] text-white font-bold py-4 px-8 rounded-xl text-center hover:bg-[#0d6b60] transition-all active:scale-95 min-h-[56px]"
            >
              Chat on WhatsApp
            </button>
          </div>

          {/* Right Side: Formspree */}
          <div className="relative" aria-live="polite">
            {status === 'SUCCESS' ? (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-blue-50 dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900 text-center animate-in fade-in zoom-in duration-300">
                <div className="text-4xl mb-4" role="img" aria-label="rocket">🚀</div>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400">Message Sent!</h3>
                <p className="text-blue-600 dark:text-zinc-400 mt-2">Thanks for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('IDLE')}
                  className="mt-6 text-sm underline text-blue-800 dark:text-blue-400 min-h-[44px] px-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value="Email Inquiry" />
                
                {/* A11y: Inputs now have aria-labels since placeholders aren't enough for screen readers */}
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  aria-label="Full Name"
                  required 
                  className="w-full p-4 border rounded-xl dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-blue-500 min-h-[56px]" 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  aria-label="Email Address"
                  required 
                  className="w-full p-4 border rounded-xl dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-blue-500 min-h-[56px]" 
                />
                <textarea 
                  name="message" 
                  placeholder="How can I help?" 
                  aria-label="Your Message"
                  rows={4} 
                  required 
                  className="w-full p-4 border rounded-xl dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-blue-500 min-h-[100px]"
                ></textarea>
                
                <button 
                  type="submit" 
                  disabled={status === 'SENDING'}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400 min-h-[56px]"
                >
                  {status === 'SENDING' ? 'Sending...' : 'Send Message'}
                </button>
                
                {status === 'ERROR' && (
                  <p role="alert" className="text-red-600 dark:text-red-400 text-sm mt-2 text-center font-semibold">
                    Oops! Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}