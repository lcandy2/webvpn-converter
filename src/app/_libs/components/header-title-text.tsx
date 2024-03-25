'use client';

// import { usePathname } from 'next/navigation';
//
// export default function HeaderTitleText() {
//   const pathname = usePathname()
//   return (
//     <h1 className="text-2xl mx-4">{(pathname !== '/') && 'Web VPN Cornverter'}</h1>
//   )
// }

export default function HeaderTitleText() {
  return <h1 className="text-2xl mx-4">Web VPN Cornverter</h1>;
}
