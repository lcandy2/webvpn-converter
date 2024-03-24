'use client';

import '@lit-labs/ssr-react/enable-lit-ssr.js';

const LitSSRProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default LitSSRProvider;
