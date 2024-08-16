import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import Link from 'next/link';
import { WorkTwoTone } from '@mui/icons-material';
import { MdFabDonate, MdTextButtonDonate } from '@/app/_libs/ui/donate-buttons';

export default function Page() {
  const hasCVEmail = (process.env.CV_EMAIL && true) || false;
  return (
    <>
      <TitleComponent marginBottom={false}>感谢您的支持</TitleComponent>
      <SubtitleComponent>
        {hasCVEmail ? (
          <>
            我正在寻找一份在校实习，如果您能帮助到我，请与我联系{' '}
            <Link
              href={`mailto:${process.env.CV_EMAIL}`}
              className={'underline'}
            >
              {process.env.CV_EMAIL}
            </Link>{' '}
            ，非常感谢您的帮助。
          </>
        ) : (
          '如果你想提供帮助，可通过以下方式捐赠本项目，非常感谢您的帮助。'
        )}
      </SubtitleComponent>
      {/*<p className="text-sm text-on-surface">*/}
      {/*  希望能够获得您的内推*/}
      {/*</p>*/}
      <div className={'flex flex-col gap-6 pt-2'}>
        {hasCVEmail && (
          <Link href={`mailto:${process.env.CV_EMAIL}`}>
            <MdFabDonate
              label="我有内推机会"
              className="w-[100%] sm:w-40 mb-8 sm:mr-8 sm:mb-0"
            >
              <span slot="icon">
                <WorkTwoTone />
              </span>
            </MdFabDonate>
          </Link>
        )}
        <div className={'flex flex-row'}>
          <Link href={'https://afdian.net/a/Lcandy/plan'} target={'_blank'}>
            {/*<MdFabDonate*/}
            {/*  label="我有资金支持 (爱发电)"*/}
            {/*  className="w-[100%] sm:w-56 mb-8 sm:mr-8 sm:mb-0"*/}
            {/*>*/}
            {/*  <span slot="icon">*/}
            {/*    <PaidTwoTone />*/}
            {/*  </span>*/}
            {/*</MdFabDonate>*/}
          </Link>
          <Link href={'/'} prefetch={false}>
            <MdTextButtonDonate
              hasIcon
              className="w-[100%] sm:w-auto h-full min-w-36"
              label="好意我心领啦"
            ></MdTextButtonDonate>
          </Link>
        </div>
      </div>
    </>
  );
}
