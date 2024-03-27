'use client';

import { isSchoolNotListedAtom } from '@/app/settings/_libs/atoms';
import { MdOutlinedTextField } from '@/app/_libs/ui/text-field';
import { useAtomValue } from 'jotai';
import { MdOutlinedCard } from '@/app/_libs/ui/card';
import { useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { selectedSchoolAtom } from '@/app/_libs/atoms';

export default function SchoolCustomization() {
  const isSchoolNotListed = useAtomValue(isSchoolNotListedAtom);
  const schoolSelected = useAtomValue(selectedSchoolAtom);

  const [host, setHost] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');

  const initConfig = useCallback(() => {
    setHost(schoolSelected?.host || '');
    setKey(schoolSelected?.crypto_key || '');
    setIv(schoolSelected?.crypto_iv || '');
  }, [schoolSelected, setHost, setKey, setIv]);

  useEffect(() => {
    initConfig();
  }, [schoolSelected]);

  if (isSchoolNotListed) {
    return (
      <>
        <MdOutlinedCard className="p-6 flex flex-col gap-4">
          <p className="text-2xl">自定义</p>
          <TextField
            label="学校 Web VPN 网络地址"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
          <div className="flex flex-row gap-4 flex-wrap">
            <TextField
              label="KEY"
              className="flex-1"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <TextField
              label="IV"
              className="flex-1"
              value={iv}
              onChange={(e) => setIv(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 font-normal">
            注: KEY 或 IV 留空 将使用默认值 wrdvpnisthebest!
          </p>
        </MdOutlinedCard>
      </>
    );
  } else {
    return null;
  }
}
