import '../lib/amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import {
  getUrl,
  remove,
  uploadData,
  type GetUrlInput,
  type RemoveInput,
  type UploadDataInput,
} from 'aws-amplify/storage';
import type { StorageAccessLevel } from '@aws-amplify/core';

export type UploadVideoOptions = {
  contentType?: string;
  expiresInSeconds?: number;
  accessLevel?: StorageAccessLevel;
};

export type UploadVideoResult = {
  key: string;
  url: string;
};

const sanitizeLogin = (login?: string) => {
  if (!login) {
    return 'anonymous';
  }

  return login.replace(/@.*/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
};

const buildVideoKey = async () => {
  const current = await getCurrentUser();
  const loginId = current.signInDetails?.loginId;
  const safeIdentifier = `${sanitizeLogin(loginId)}_${current.userId}`;
  const fileName = `${Date.now()}.webm`;

  return `videos/${safeIdentifier}/${fileName}`;
};

export const uploadVideo = async (videoBlob: Blob, options: UploadVideoOptions = {}): Promise<UploadVideoResult> => {
  const key = await buildVideoKey();
  const {
    contentType = 'video/webm',
    expiresInSeconds = 3600,
    accessLevel = 'protected',
  } = options;

  const uploadInput: UploadDataInput = {
    key,
    data: videoBlob,
    options: {
      contentType,
      accessLevel,
    },
  };

  const uploadTask = uploadData(uploadInput);

  const { key: storedKey } = await uploadTask.result;

  const urlInput: GetUrlInput = {
    key: storedKey,
    options: {
      expiresIn: expiresInSeconds,
      accessLevel,
    },
  };

  const urlResult = await getUrl(urlInput);

  return {
    key: storedKey,
    url: urlResult.url.toString(),
  };
};

export const getVideoUrl = async (
  key: string,
  expiresInSeconds = 3600,
  accessLevel: StorageAccessLevel = 'protected',
) => {
  const urlInput: GetUrlInput = {
    key,
    options: {
      expiresIn: expiresInSeconds,
      accessLevel,
    },
  };

  const result = await getUrl(urlInput);

  return result.url.toString();
};

export const deleteVideo = async (key: string, accessLevel: StorageAccessLevel = 'protected') => {
  const removeInput: RemoveInput = {
    key,
    options: {
      accessLevel,
    },
  };

  await remove(removeInput);
};
