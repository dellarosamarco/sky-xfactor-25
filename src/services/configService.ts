const CONFIG_API_BASE_URL = (process.env.REACT_APP_CONFIG_API_BASE_URL || "").replace(/\/+$/, "");

export type SiteConfig = {
  isOpen?: boolean;
} & Record<string, unknown>;

const normalizeConfig = (raw: SiteConfig | null | undefined): SiteConfig => {
  const data = raw ?? ({} as SiteConfig);

  return {
    ...data,
    isOpen: data.isOpen !== undefined ? Boolean(data.isOpen) : undefined,
  };
};

const assertConfigApiConfigured = () => {
  if (!CONFIG_API_BASE_URL) {
    throw new Error(
      "Config API endpoint non configurato. Imposta REACT_APP_CONFIG_API_BASE_URL nel file .env"
    );
  }
};

export const getSiteConfig = async (): Promise<SiteConfig> => {
  assertConfigApiConfigured();

  const response = await fetch(`${CONFIG_API_BASE_URL}/config`);

  if (!response.ok) {
    throw new Error(`Impossibile recuperare la configurazione (status ${response.status})`);
  }

  const data = (await response.json()) as SiteConfig;
  return normalizeConfig(data);
};
