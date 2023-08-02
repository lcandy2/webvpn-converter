// lib/gtag.js
import Script from 'next/script'

const Gtag = () => {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q9YMPKF9Y7" />
      <Script id="google-analytics">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Q9YMPKF9Y7');
        `}
      </Script>
    </>
  );
};

export default Gtag