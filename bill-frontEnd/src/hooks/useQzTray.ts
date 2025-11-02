import { useState, useEffect, useCallback } from "react";
import * as qz from "qz-tray";

interface QZTrayHook {
  printers: string[];
  findPrinters: () => Promise<string[]>;
  print: (printer: string, data: string[]) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useQzTray = (): QZTrayHook => {
  const [printers, setPrinters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: Error) => {
    console.error("QZ Tray Error:", err);
    setError(err);
    setLoading(false);
  };

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      if (!qz.websocket.isActive()) {
        await qz.websocket.connect();
      }
      setLoading(false);
    } catch (err) {
      handleError(err as Error);
    }
  }, []);

  useEffect(() => {
    // Initialize QZ Tray and set up certificate
    qz.security.setCertificatePromise((resolve, reject) => {
      // This can be a local file or a file on the web
      // For example, fetch('/path/to/digital-certificate.txt').then(res => res.text()).then(resolve).catch(reject);
      // For now, using a placeholder
      resolve("YOUR_QZ_TRAY_CERTIFICATE");
    });

    // This is the private key that will be used to sign the messages
    qz.security.setSignaturePromise((toSign) => {
      return (resolve, reject) => {
        // This should be a call to your backend to sign the data
        // For example, fetch('/api/sign-qz-data', { method: 'POST', body: toSign }).then(res => res.text()).then(resolve).catch(reject);
        // For now, using a placeholder
        resolve("YOUR_QZ_TRAY_PRIVATE_KEY");
      };
    });

    connect();

    return () => {
      if (qz.websocket.isActive()) {
        qz.websocket.disconnect();
      }
    };
  }, [connect]);

  const findPrinters = useCallback(async () => {
    setLoading(true);
    try {
      await connect();
      const found = await qz.printers.find();
      const foundPrinters = Array.isArray(found) ? found : [found];
      setPrinters(foundPrinters);
      setLoading(false);
      return foundPrinters;
    } catch (err) {
      handleError(err as Error);
      return [];
    }
  }, [connect]);

  const print = useCallback(
    async (printer: string, data: string[]) => {
      setLoading(true);
      try {
        await connect();
        const config = qz.configs.create(printer);
        await qz.print(config, data);
        setLoading(false);
      } catch (err) {
        handleError(err as Error);
      }
    },
    [connect]
  );

  return { printers, findPrinters, print, loading, error };
};

export default useQzTray;
