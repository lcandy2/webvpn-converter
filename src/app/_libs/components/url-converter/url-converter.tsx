import MdTextField, { MdOutlinedTextField } from '@/app/_libs/ui/text-field';
import MdIconButton from '@/app/_libs/ui/icon-button';
import { TextField } from '@mui/material';
import OriginalUrlInput from '@/app/_libs/components/url-converter/original-url-input';

export default function UrlConverter() {
  return (
    // <MdOutlinedTextField ref={textAreaRef} type="textarea" rows="1" maxRows="4" label="原始链接" className="w-[100%]">
    //   <MdIconButton icon="content_paste" slot="trailing-icon" />
    // </MdOutlinedTextField>
    <OriginalUrlInput />
  );
}
