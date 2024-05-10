import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';

const privacy = `Collection of Routine Information
This website track basic information about its visitors. This information includes, but is not limited to, IP addresses, browser details, timestamps and referring pages. None of this information can personally identify specific visitors to this website. The information is tracked for routine administration and maintenance purposes.

Cookies
Where necessary, this website uses cookies to store information about a visitor’s preferences and history to better serve the visitor and/or present the visitor with customized content.

Advertisement and Other Third Parties
Advertising partners and other third parties may use cookies, scripts and/or web beacons to track visitor activities on this website to display advertisements and other useful information. Such tracking is done directly by the third parties through their servers and is subject to their privacy policies. This website has no access or control over these cookies, scripts and/or web beacons that may be used by third parties.
I have included links on this website for your use and reference. I am not responsible for the privacy policies on these websites. You should be aware that the privacy policies of these websites may differ from my own.

Link to the privacy policy of third-party service providers used by the website
- Google Analytics

Security
The security of your personal information is important to me, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While I strive to use commercially acceptable means to protect your personal information, I cannot guarantee its absolute security.

Changes To This Privacy Policy
This Privacy Policy is effective as of 2024-03 and will remain in effect except concerning any changes in its provisions in the future, which will be in effect immediately after being posted on this page. I reserve the right to update or change my Privacy Policy at any time and you should check this Privacy Policy periodically. If I make any material changes to this Privacy Policy, I will notify you either through the email address you have provided me or by placing a prominent notice on my website.

Contact Information
For any questions or concerns regarding the privacy policy, please contact me at GitHub issues.`;

export default function Page() {
  return (
    <>
      <TitleComponent marginBottom={false}>Privacy</TitleComponent>
      <SubtitleComponent>
        Web VPN Converter takes your privacy seriously.
      </SubtitleComponent>
      {privacy.split('\n').map((line, index) => (
        <p key={index} className="text-sm">
          {line === '' ? <br /> : line}
        </p>
      ))}
    </>
  );
}
