'use client';

import { isSchoolNotListedAtom } from '@/app/settings/_libs/atoms';
import { MdOutlinedTextField } from '@/app/_libs/ui/text-field';
import { useAtom, useAtomValue } from 'jotai';
import { MdOutlinedCard } from '@/app/_libs/ui/card';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { School } from '@/app/_libs/types';
import MdIconButton from '@/app/_libs/ui/icon-button';

export default function SchoolCustomization() {
  const [isSchoolNotListed, setIsSchoolNotListed] = useAtom(
    isSchoolNotListedAtom,
  );
  const [schoolSelected, setSchoolSelected] = useAtom(selectedSchoolAtom);

  const [host, setHost] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [changed, setChanged] = useState(false);

  const initConfig = useCallback(() => {
    setHost(schoolSelected?.host || '');
    setKey(schoolSelected?.crypto_key || '');
    setIv(schoolSelected?.crypto_iv || '');
    setChanged(false);
  }, [schoolSelected, setHost, setKey, setIv]);

  const buildCustomSchool = useMemo((): School => {
    const name = '自定义';
    return {
      province: null,
      name,
      host,
      crypto_key: key !== '' ? key : undefined,
      crypto_iv: iv !== '' ? iv : undefined,
    };
  }, [host, key, iv]);

  const handleHostChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setHost(e.target.value);
      handleInputChanged();
    },
    [setHost],
  );

  const handleKeyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKey(e.target.value);
      handleInputChanged();
    },
    [setKey],
  );

  const handleIvChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIv(e.target.value);
      handleInputChanged();
    },
    [setIv],
  );

  const handleInputChanged = useCallback(() => {
    setChanged(true);
  }, [setChanged]);

  const handleSetCustomSchool = useCallback(() => {
    setSchoolSelected(buildCustomSchool);
  }, [setSchoolSelected, buildCustomSchool]);

  useEffect(() => {
    initConfig();
  }, [schoolSelected]);

  useEffect(() => {
    if (changed) {
      handleSetCustomSchool();
    }
  }, [host, key, iv, changed]);

  const handleCloseButtonClick = useCallback(() => {
    setIsSchoolNotListed(false);
  }, [setIsSchoolNotListed]);

  if (isSchoolNotListed) {
    return (
      <>
        <MdOutlinedCard className="p-6 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="text-2xl pb-4 order-first items-start">自定义</p>
            <MdIconButton
              className="order-last self-start"
              icon="close"
              onClick={handleCloseButtonClick}
            />
          </div>
          <TextField
            label="学校 Web VPN 网络地址"
            value={host}
            onChange={handleHostChange}
          />
          <div className="flex flex-row gap-4 flex-wrap">
            <TextField
              label="KEY"
              className="flex-1"
              value={key}
              onChange={handleKeyChange}
            />
            <TextField
              label="IV"
              className="flex-1"
              value={iv}
              onChange={handleIvChange}
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
