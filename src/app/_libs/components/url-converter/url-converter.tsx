import OriginalUrlInput from '@/app/_libs/components/url-converter/original-url-input';
import ConvertedUrlInput from '@/app/_libs/components/url-converter/converted-url-input';
import { ConverterConfig } from '@/app/_libs/types';

export default function UrlConverter({ mode = 'encrypt' }: ConverterConfig) {
  return (
    <div className="flex flex-col lg:flex-row gap-x-8">
      <OriginalUrlInput mode={mode} />
      <ConvertedUrlInput mode={mode} />
    </div>
  );
}
