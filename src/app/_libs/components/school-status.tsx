import { SubtitleComponent } from '@/app/_libs/components/title';
import type { School, SchoolService } from '@/app/_libs/types';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';

export default function SchoolStatus({
  school,
  service = 'encrypt',
}: {
  school: School;
  service?: SchoolService;
}) {
  const settingsHref =
    service === 'encrypt' ? '/settings' : `/settings?service=${service}`;

  return (
    <SubtitleComponent>
      {school.name} ({school.host || school.code})
      <Link href={settingsHref} prefetch={true} className="inline-flex ml-1">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-container-high">
          <EditIcon titleAccess="编辑" fontSize="small" />
        </span>
      </Link>
    </SubtitleComponent>
  );
}
