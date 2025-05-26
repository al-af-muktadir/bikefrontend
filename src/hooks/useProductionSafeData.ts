/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { ensureArray } from "../utils/safeDataUtils";

interface UseProductionSafeDataOptions<T> {
  url: string;
  defaultValue: T;
  retries?: number;
  timeout?: number;
}

export function useProductionSafeData<T>({
  url,
  defaultValue,
  retries = 3,
  timeout = 10000,
}: UseProductionSafeDataOptions<T>) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    let attempt = 0;
    setLoading(true);
    setError(null);

    const attemptFetch = async (): Promise<void> => {
      try {
        console.log(
          `[${new Date().toISOString()}] Fetching: ${url} (attempt ${
            attempt + 1
          })`
        );

        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(`[${new Date().toISOString()}] API Response:`, {
          url,
          status: response.status,
          dataType: typeof result,
          isArray: Array.isArray(result),
          data: result,
        });

        // Handle different response structures safely
        let processedData: T;

        if (Array.isArray(defaultValue)) {
          // If expecting an array, ensure we get an array
          processedData = ensureArray(
            result,
            defaultValue as unknown as any[]
          ) as T;
        } else if (typeof defaultValue === "object" && defaultValue !== null) {
          // If expecting an object
          processedData =
            result && typeof result === "object" ? result : defaultValue;
        } else {
          // Primitive types
          processedData = result ?? defaultValue;
        }

        setData(processedData);
        setError(null);
        console.log(
          `[${new Date().toISOString()}] Data set successfully:`,
          processedData
        );
      } catch (err) {
        console.error(
          `[${new Date().toISOString()}] Fetch attempt ${attempt + 1} failed:`,
          err
        );

        if (attempt < retries - 1) {
          attempt++;
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Max 10s delay
          console.log(
            `[${new Date().toISOString()}] Retrying in ${delay}ms...`
          );
          setTimeout(attemptFetch, delay);
        } else {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred";
          setError(errorMessage);
          setData(defaultValue);
          console.error(
            `[${new Date().toISOString()}] All attempts failed, using default value`
          );
        }
      } finally {
        if (attempt >= retries - 1) {
          setLoading(false);
        }
      }
    };

    await attemptFetch();
  }, [url, defaultValue, retries, timeout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
