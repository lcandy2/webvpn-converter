import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import { Skeleton } from '@mui/material';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <TitleComponent marginBottom={false}>
        <Skeleton variant="rounded" height={78} width={300} />
      </TitleComponent>
      <SubtitleComponent>
        <Skeleton variant="rounded" height={30} />
      </SubtitleComponent>
      <p className="mb-96">
        <Skeleton variant="rounded" height={48} />
      </p>
    </>
  );
}
