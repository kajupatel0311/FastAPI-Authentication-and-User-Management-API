import api from "./axios";
import type { UserProfile } from "../types/user";

export type UserListResponse = {
  page: number;
  limit: number;
  total: number;
  search: string;
  sort: string;
  domain: string;
  users: UserProfile[];
};

export async function getMyProfile(): Promise<UserProfile> {

  const response = await api.get<UserProfile>(
    "/users/me"
  );

  return response.data;

}

export async function updateMyProfile(
  data: {
    name: string;
    email: string;
  }
) {

  const response = await api.put(
    "/users/me",
    data
  );

  return response.data;

}

export async function uploadProfileImage(
  file: File
) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/upload/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

}

export async function getUsers(
  page = 1,
  search = "",
  limit = 10
): Promise<UserListResponse> {

  const response = await api.get<UserListResponse>(
    "/users",
    {
      params: {
        page,
        limit,
        search,
      },
    }
  );

  return response.data;

}

export async function updateUser(
  id: string,
  data: {
    name: string;
    email: string;
  }
) {

  const response = await api.put(
    `/users/${id}`,
    data
  );

  return response.data;

}

export async function deleteUser(
  id: string
) {

  const response = await api.delete(
    `/users/${id}`
  );

  return response.data;

}


