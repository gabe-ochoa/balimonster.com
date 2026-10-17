'use client';
import { useEffect, useRef } from 'react';

export default function ActivityPicker() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);
  function close() { dialog.current?.close(); trigger.current?.focus(); }
  return <><button className="bm-button bm-outline" ref={trigger} onClick={() => dialog.current?.showModal()}>Choose an activity <span aria-hidden="true">↗</span></button>
    <dialog className="bm-dialog" ref={dialog} aria-labelledby="picker-title" onCancel={close}>
      <button className="bm-close" onClick={close} aria-label="Close activity chooser">×</button>

      <h2 id="picker-title">Choose an activity</h2>

      <div className="bm-dialog-options">
        <a href="/charters"><h3>Boat charters <span aria-hidden="true">↗</span></h3><p>Snorkeling, sunsets,<br />sportfishing &amp; island transfers.</p><strong>Explore boat trips →</strong></a>
        <a href="/spearfishing"><h3>Spearfishing <span aria-hidden="true">↗</span></h3><strong>Explore spearfishing →</strong></a>
      </div>
      <button className="bm-skip" onClick={close}>Just looking? Explore Bali Monster</button>
    </dialog>
  </>;
}
