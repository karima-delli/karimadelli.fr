import { useState, useEffect } from 'react';

const useAdblockDetect = () => {
  const [adblockEnabled, setAdBlockStatus] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return null;
    }
    const el = document.createElement('div');
    el.className = 'adBanner';
    el.setAttribute('id', 'adBanner');
    document.body.appendChild(el);
    const elStyle = getComputedStyle(el, null);

    if (!el.offsetTop || elStyle.display === 'none') {
      setAdBlockStatus(true);
    }

    return () => {
      el.parentNode.removeChild(el);
    };
  });

  return adblockEnabled;
};

export default useAdblockDetect;
