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
  return <><button className="bm-button bm-outline" ref={trigger} onClick={() => dialog.current?.showModal()}>Choose your adventure <span aria-hidden="true">↗</span></button>
    <dialog className="bm-dialog" ref={dialog} aria-labelledby="picker-title" onCancel={close}>
      <button className="bm-close" onClick={close} aria-label="Close activity chooser">×</button>
      <p className="bm-kicker">BALI MONSTER · YOUR DAY, YOUR WAY</p>
      <h2 id="picker-title">What brings you<br />to the water?</h2>
      <p>One ocean. Two ways to make it yours.</p>
      <div className="bm-dialog-options">
        <a href="/charters"><span className="bm-choice-number">01 / TAKE IT ALL IN</span><h3>Boat charters <span aria-hidden="true">↗</span></h3><p>Snorkeling, sunsets, camping,<br />sportfishing &amp; island transfers.</p><strong>Explore boat trips →</strong></a>
        <a href="/spearfishing"><span className="bm-choice-number">02 / GO A LITTLE DEEPER</span><h3>Spearfishing <span aria-hidden="true">↗</span></h3><p>For time below the surface <br />and the thrill of the hunt.</p><strong>Explore spearfishing →</strong></a>
      </div>
      <button className="bm-skip" onClick={close}>Just looking? Explore Bali Monster</button>
    </dialog>
  </>;
}
