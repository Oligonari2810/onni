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
    // 🔹 GA4
    if (!window.dataLayer) {
      window.dataLayer = [];
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
    }
    window.gtag('config', GA_ID, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    });

    // 🔹 Meta Pixel
    const fbScript = document.createElement('script');
    fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
    fbScript.async = true;
    fbScript.onload = () => {
      window.fbq('init', PIXEL_ID);
      window.fbq('track', 'PageView');
    };
    document.head.appendChild(fbScript);

    if (!window.fbq) {
      // @ts-ignore - fbq.queue es añadido por el script de Facebook
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
