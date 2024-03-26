import OriginalUrlInput from '@/app/_libs/components/url-converter/original-url-input';
import ConvertedUrlInput from '@/app/_libs/components/url-converter/converted-url-input';

export default function UrlConverter() {
  return (
    <div className="flex flex-col lg:flex-row gap-x-8">
      <OriginalUrlInput />
      <ConvertedUrlInput />
    </div>
  );
}
