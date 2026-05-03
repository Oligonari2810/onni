'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789012345';

  useEffect(() => {
    // 🔹 GA4 - Initialize dataLayer
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // 🔹 GA4 - Define gtag function
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    // 🔹 GA4 - Load script (only once)
    const existingScript = document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`);
    if (!existingScript) {
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);
    }

    // 🔹 GA4 - Initialize
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    });

    // 🔹 Meta Pixel - Load script
    const existingPixel = document.querySelector(`script[src*="fbevents.js"]`);
    if (!existingPixel) {
      const fbScript = document.createElement('script');
      fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      fbScript.async = true;
      fbScript.onload = () => {
        window.fbq('init', PIXEL_ID);
        window.fbq('track', 'PageView');
      };
      document.head.appendChild(fbScript);
    }

    // 🔹 Meta Pixel - Define fbq function
    if (!window.fbq) {
      // @ts-ignore
      window.fbq = function () {
        // @ts-ignore
        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
      };
      // @ts-ignore
      window.fbq.queue = [];
    }

  }, [pathname, searchParams, GA_ID, PIXEL_ID]);

  return null;
}
