import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSiteConfig, SiteConfig } from "../services/configService";
import SiteClosed from "../pages/SiteClosed/SiteClosed";
import SiteConfigLoading from "../pages/SiteClosed/SiteConfigLoading";

type SiteConfigContextValue = {
  config: SiteConfig | null;
  loading: boolean;
  error: Error | null;
  refreshConfig: () => Promise<void>;
};

const defaultValue: SiteConfigContextValue = {
  config: null,
  loading: true,
  error: null,
  refreshConfig: async () => {
    /* noop default */
  },
};

const SiteConfigContext = createContext<SiteConfigContextValue>(defaultValue);

export const SiteConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshConfig = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getSiteConfig();
      setConfig(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshConfig();
  }, [refreshConfig]);

  const value = useMemo<SiteConfigContextValue>(
    () => ({ config, loading, error, refreshConfig }),
    [config, loading, error, refreshConfig]
  );

  const hasConfig = config !== null;
  const isSiteClosed = hasConfig && config.isOpen === false;
  const shouldShowLoading = loading;
  const shouldShowClosed = !loading && (!hasConfig || isSiteClosed);
  const shouldRenderContent = !loading && hasConfig && !isSiteClosed;

  return (
    <SiteConfigContext.Provider value={value}>
      {shouldShowLoading && <SiteConfigLoading />}
      {shouldShowClosed && (
        <SiteClosed loading={loading} onRetry={refreshConfig} hasError={Boolean(error)} />
      )}
      {shouldRenderContent && children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
