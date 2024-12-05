import UmamiProvider from 'next-umami';
import { ReactNode } from 'react';

interface UmamiProviderProps {
  children: ReactNode;
}

export default function WPNUmamiProvider({ children }: UmamiProviderProps) {\
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_ID;
\
  if (!websiteId) {
    return <>{children}</>;
  }
\
  return (
    <UmamiProvider
      websiteId={websiteId}
      src={process.env.NEXT_PUBLIC_UMAMI_SRC}
    >
      {children}
    </UmamiProvider>
  );
}
