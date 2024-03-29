'use client';

import MdFab from '@/app/_libs/ui/floating-action-buttons';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkletRaw from '~bookmarklet/dist/index.js.bookmarklet.export';
import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BOOKMARKLET_CONFIG } from '@/app/_libs/config';
import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MdTextButton } from '@/app/_libs/ui/button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useCopy from '@/app/_libs/hooks/use-copy';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeStatus from '@/app/_libs/components/home-status';

export default function BookmarkletClient() {
  const selectedSchool = useAtomValue(selectedSchoolAtom);
  const bookmarkletRaw = BookmarkletRaw;
  const [bookmarkletHref, setBookmarkletHref] = useState<string>('');
  const [hasMounted, setHasMounted] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const buttonClickedTimeoutRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null!);

  const loading = useMemo(
    () =>
      !(bookmarkletHref !== '') ||
      !hasMounted ||
      !bookmarkletRaw ||
      (hasMounted && !selectedSchool),
    [bookmarkletHref, hasMounted, selectedSchool, bookmarkletRaw],
  );

  const { copy, reset, error, copied } = useCopy({
    onCopyError: (message) => {
      enqueueSnackbar(message, {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    },
  });

  const handleBookmarkletParse: string = useMemo(() => {
    try {
      const replacedHost = bookmarkletRaw.replace(
        BOOKMARKLET_CONFIG.HOST_SEPRATOR,
        selectedSchool?.name || '',
      );
      const replacedKey = replacedHost.replace(
        BOOKMARKLET_CONFIG.KEY_SEPRATOR,
        selectedSchool?.crypto_key || '',
      );
      const replacedIv = replacedKey.replace(
        BOOKMARKLET_CONFIG.IV_SEPRATOR,
        selectedSchool?.crypto_iv || '',
      );
      return replacedIv;
    } catch (e) {
      return (e as Error).toString();
    }
  }, [selectedSchool, bookmarkletRaw]);

  const handleSetBookmarkHref = useCallback(() => {
    setBookmarkletHref(handleBookmarkletParse);
  }, [handleBookmarkletParse]);

  const handleInit = useCallback(() => {
    setHasMounted(true);
  }, [setHasMounted]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  useEffect(() => {
    if (hasMounted) {
      handleSetBookmarkHref();
    }
  }, [hasMounted, handleSetBookmarkHref]);

  const handleButtonClickReset = useCallback(() => {
    setIsButtonClicked(false);
    if (buttonClickedTimeoutRef.current) {
      clearTimeout(buttonClickedTimeoutRef.current);
    }
  }, [setIsButtonClicked]);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (buttonClickedTimeoutRef.current) {
        clearTimeout(buttonClickedTimeoutRef.current);
      }
      buttonClickedTimeoutRef.current = window.setTimeout(() => {
        handleButtonClickReset();
      }, 1000);
      setIsButtonClicked(true);
    },
    [setIsButtonClicked, handleButtonClickReset],
  );

  const handleCopyButtonClick = useCallback(() => {
    copy({ valueToCopy: bookmarkletHref });
  }, [copy, bookmarkletHref]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <section className="mt-8 mb-4 grow">
          <p className="leading-3">适用于</p>
          <HomeStatus />
          {loading ? (
            <p className="inline-flex flex-row items-center">
              <CircularProgress color="inherit" size={40} className="mx-2" />
              正在加载，若长时间处于此页面请
              <a href="" className="underline">
                刷新
              </a>
              。
            </p>
          ) : (
            <section className="flex flex-row flex-wrap gap-6 mt-6">
              <a
                href={bookmarkletHref}
                onClick={handleButtonClick}
                title="WebVPN 转换"
                className="w-[100%] sm:w-56 lg:w-full"
              >
                <MdFab
                  label={isButtonClicked ? '请不要点击' : '请将我拖拽至书签栏'}
                  className="w-full"
                >
                  <span className="hidden">WebVPN 转换</span>
                  {selectedSchool?.name && (
                    <span className="hidden"> | {selectedSchool?.name}</span>
                  )}
                  <span slot="icon">
                    {isButtonClicked ? <CloseIcon /> : <BookmarkAddIcon />}
                  </span>
                </MdFab>
              </a>
              <MdTextButton
                className="w-[100%] sm:w-auto lg:w-full h-14 sm:h-auto lg:h-14 min-w-36"
                onClick={handleCopyButtonClick}
              >
                <span className="m-2">
                  {error ? (
                    <ErrorIcon color="error" />
                  ) : copied ? (
                    <DoneIcon color="success" />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </span>
                {error
                  ? '复制失败'
                  : copied
                    ? '复制成功'
                    : '复制 Bookmarklet 小书签'}
              </MdTextButton>
            </section>
          )}
        </section>
        <TextField
          inputRef={inputRef}
          label="Bookmarklet 小书签链接"
          value={bookmarkletHref}
          variant="filled"
          fullWidth
          multiline
          maxRows={8}
          margin="normal"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <MdIconButton onClick={handleCopyButtonClick}>
                  {error ? (
                    <ErrorIcon color="error" />
                  ) : copied ? (
                    <DoneIcon color="success" />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </MdIconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <SnackbarProvider />
    </>
  );
}
