import React, { useCallback, useState } from 'react';
import { DemoBanner, Header } from './components/Header';
import { Hero, QuickLinks } from './components/Hero';
import { About, Admission, Leadership } from './components/About';
import { Timetable } from './components/Timetable';
import { Achievements, Clubs, Teachers } from './components/People';
import { Canteen, Gallery, Library, News } from './components/Content';
import { Contact, Footer } from './components/Contact';
import { ContactModal, RequestType } from './components/ContactModal';

export default function App() {
  const [modal, setModal] = useState<{ open: boolean; type: RequestType; subject: string }>({
    open: false,
    type: 'Murojaat',
    subject: '',
  });

  const openContact = useCallback((type: RequestType = 'Murojaat', subject = '') => {
    setModal({ open: true, type, subject });
  }, []);
  const close = useCallback(() => setModal((m) => ({ ...m, open: false })), []);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#asosiy" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg">
        Asosiy qismga o'tish
      </a>
      <DemoBanner />
      <Header onContact={() => openContact()} />

      <main id="asosiy" className="flex-1">
        <Hero onContact={() => openContact()} />
        <QuickLinks />
        <About />
        <Admission />
        <Leadership onMessage={(to) => openContact('Murojaat', to)} />
        <Timetable />
        <Teachers />
        <Clubs onJoin={(club) => openContact("To'garakka yozilish", club)} />
        <Achievements />
        <News />
        <Gallery />
        <Library />
        <Canteen />
        <Contact onContact={() => openContact()} />
      </main>

      <Footer />
      <ContactModal open={modal.open} onClose={close} type={modal.type} subject={modal.subject} />
    </div>
  );
}
