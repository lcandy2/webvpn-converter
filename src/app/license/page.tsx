import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';

const license = `Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function Page() {
  return (
    <>
      <TitleComponent marginBottom={false}>MIT License</TitleComponent>
      <SubtitleComponent>
        Copyright (c) 2024 甜檸Cirtron(lcandy2)
      </SubtitleComponent>
      {license.split('\n').map((line, index) => (
        <p key={index} className="text-sm text-on-surface">
          {line === '' ? <br /> : line}
        </p>
      ))}
    </>
  );
}
