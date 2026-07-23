import api from "./axios";

export type HealthResponse = {
  status: string;
  application: string;
  database: string;
};

export async function getHealthStatus(): Promise<HealthResponse> {

  const response =
    await api.get("/health");

  return response.data;

}
