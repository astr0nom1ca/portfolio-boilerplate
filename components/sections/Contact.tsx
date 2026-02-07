'use client'

import React, { useState } from 'react'

export default function Contact({ data }: { data: any }) {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE')

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Guard clause: check if ID exists
  if (!data?.formspreeId) {
    console.error("Formspree ID is missing from Sanity!");
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
      // Handles cases where the server responded with 404, 500, etc.
      setStatus('ERROR');
    }
  } catch (error) {
    // This catches "Failed to fetch" (Network errors / Ad-blockers)
    console.error("Fetch error:", error);
    setStatus('ERROR');
  }
};

const handleWhatsAppClick = async () => {
  // 1. Prepare data in a "form-friendly" way to avoid CORS issues
  const formData = new FormData();
  formData.append("message", "System Log: A user just clicked your WhatsApp contact button.");
  formData.append("subject", "New WhatsApp Inquiry");

  // 2. Send the silent log to Formspree
  // 'keepalive: true' ensures the request finishes even after the link opens
  fetch(`https://formspree.io/f/${data?.formspreeId}`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' },
    keepalive: true, 
  }).catch(err => console.log("Silent log failed, but WhatsApp still opening", err));

  // 3. Open WhatsApp
const cleanNumber = data?.whatsappNumber?.replace(/\D/g, ''); // Removes everything except numbers
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
  className="inline-block w-full bg-[#128C7E]-600 text-white font-bold py-4 px-8 rounded-xl text-center hover:bg-green-700 transition-transform active:scale-95"
>
  Chat on WhatsApp
</button>
          </div>

          {/* Right Side: Formspree with Status Logic */}
          <div className="relative">
            {status === 'SUCCESS' ? (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-blue-50 dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900 text-center animate-in fade-in zoom-in duration-300">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400">Message Sent!</h3>
                <p className="text-blue-600 dark:text-zinc-400 mt-2">Thanks for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('IDLE')}
                  className="mt-6 text-sm underline text-blue-800 dark:text-blue-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value="EMail Inquiry" />
                <input type="text" name="name" placeholder="Name" required className="w-full p-4 border rounded-xl dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-blue-500" />
                <input type="email" name="email" placeholder="Email" required className="w-full p-4 border rounded-xl dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-blue-500" />
                <textarea name="message" placeholder="How can I help?" rows={4} required className="w-full p-4 border rounded-xl dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 outline-blue-500"></textarea>
                
                <button 
                  type="submit" 
                  disabled={status === 'SENDING'}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400"
                >
                  {status === 'SENDING' ? 'Sending...' : 'Send Message'}
                </button>
                
                {status === 'ERROR' && (
                  <p className="text-red-500 text-sm mt-2 text-center">Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}