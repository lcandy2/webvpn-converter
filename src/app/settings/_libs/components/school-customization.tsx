'use client';

import { isSchoolNotListedAtom } from '@/app/settings/_libs/atoms';
import { useAtom } from 'jotai';
import { MdOutlinedCard } from '@/app/_libs/ui/card';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { School, SettingsConfig } from '@/app/_libs/types';
import CloseIcon from '@mui/icons-material/Close';
import { MdIconButton } from '@/app/_libs/ui/icon-button';

export default function SchoolCustomization({
  mode = 'settings',
  type = 'page',
}: SettingsConfig) {
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

  const handleInputChanged = useCallback(() => {
    setChanged(true);
  }, [setChanged]);

  const handleHostChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setHost(e.target.value);
      handleInputChanged();
    },
    [handleInputChanged, setHost],
  );

  const handleKeyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKey(e.target.value);
      handleInputChanged();
    },
    [handleInputChanged, setKey],
  );

  const handleIvChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setIv(e.target.value);
      handleInputChanged();
    },
    [handleInputChanged, setIv],
  );

  const handleSetCustomSchool = useCallback(() => {
    setSchoolSelected(buildCustomSchool);
  }, [setSchoolSelected, buildCustomSchool]);

  useEffect(() => {
    initConfig();
  }, [schoolSelected, initConfig]);

  useEffect(() => {
    if (changed) {
      handleSetCustomSchool();
    }
  }, [handleSetCustomSchool, host, key, iv, changed]);

  const handleCloseButtonClick = useCallback(() => {
    setIsSchoolNotListed(false);
  }, [setIsSchoolNotListed]);

  if (isSchoolNotListed || mode === 'settings') {
    return (
      <>
        <MdOutlinedCard className="p-6 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="text-title-l sm:text-2xl pb-4 order-first items-start">
              自定义
            </p>
            {mode === 'init' && (
              <MdIconButton
                className="order-last self-start"
                onClick={handleCloseButtonClick}
              >
                <CloseIcon />
              </MdIconButton>
            )}
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
