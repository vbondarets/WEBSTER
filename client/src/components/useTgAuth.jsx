import { useEffect } from 'react';

export default function useTgAuth({ url, tgWidget }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.setAttribute("data-telegram-login", "WEBSTER_assistant_bot");
    script.setAttribute("data-size", "medium");
    script.setAttribute("data-radius", "14");
    script.setAttribute("data-auth-url", "webster.pp.ua");
    script.setAttribute("data-request-access", "write");

    // data-size="medium" data-radius="14" data-auth-url="webster.pp.ua" data-request-access="write"

    tgWidget.appendChild(script);
    return () => {
      tgWidget.removeChild(script);
    }
    // eslint-disable-next-line
  }, [url]);
};