import '../lib/amplify';
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from './apiService';

export type UserProfile = {
  userId: string;
  name?: string;
  email: string;
  company?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type VideoMetadata = {
  videoId: string;
  ownerId: string;
  s3Url: string;
  createdAt: string;
  description?: string;
};

export type CreateUserPayload = {
  userId: string;
  name?: string;
  email: string;
  company?: string;
  metadata?: Record<string, unknown>;
};

export type UpdateUserPayload = Partial<Omit<CreateUserPayload, 'userId'>>;

export type CreateVideoPayload = {
  videoId: string;
  ownerId: string;
  s3Url: string;
  createdAt?: string;
  description?: string;
};

export const createUserProfile = async (payload: CreateUserPayload): Promise<UserProfile> => {
  return apiPost<UserProfile>('/users', payload);
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    return await apiGet<UserProfile>(`/users/${userId}`);
  } catch (error) {
    if (error instanceof Error && (error as { statusCode?: number }).statusCode === 404) {
      return null;
    }
    throw error;
  }
};

export const updateUserProfile = async (userId: string, payload: UpdateUserPayload): Promise<UserProfile> => {
  return apiPut<UserProfile>(`/users/${userId}`, payload);
};

export const patchUserProfile = async (userId: string, payload: UpdateUserPayload): Promise<UserProfile> => {
  return apiPatch<UserProfile>(`/users/${userId}`, payload);
};

export const deleteUserProfile = async (userId: string): Promise<void> => {
  await apiDelete(`/users/${userId}`);
};

export const createVideoMetadata = async (payload: CreateVideoPayload): Promise<VideoMetadata> => {
  return apiPost<VideoMetadata>('/videos', payload);
};

export const getVideoMetadata = async (videoId: string): Promise<VideoMetadata | null> => {
  try {
    return await apiGet<VideoMetadata>(`/videos/${videoId}`);
  } catch (error) {
    if (error instanceof Error && (error as { statusCode?: number }).statusCode === 404) {
      return null;
    }
    throw error;
  }
};

export const listUserVideos = async (userId: string): Promise<VideoMetadata[]> => {
  const res = await apiGet<{ videos: VideoMetadata[] }>(`/videos?ownerId=${userId}`);
  return res.videos;
};

export const deleteVideoMetadata = async (videoId: string): Promise<void> => {
  await apiDelete(`/videos/${videoId}`);
};
