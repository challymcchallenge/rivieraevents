'use client';

import { useEffect, useRef, useState } from 'react';
import { Rotate3d, X } from 'lucide-react';

/** Tur virtual 360 găzduit pe annaevents.ro: iframe-ul se încarcă doar după click (ADR-004, fără cookies la încărcarea paginii). */
export default function TourButton({ url, title, label = 'Tur virtual 360', className = 'btn2' }: { url: string; title: string; label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}><Rotate3d aria-hidden size={20} />{label}</button>
      <dialog ref={ref} onClose={() => setOpen(false)} aria-label={title}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-black/80">
        {open && (
          <>
            <iframe src={url} title={title} className="size-full border-0" allow="fullscreen; gyroscope; accelerometer" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Închide turul virtual" autoFocus
              className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-black/70 text-white"><X aria-hidden size={22} /></button>
          </>
        )}
      </dialog>
    </>
  );
}
