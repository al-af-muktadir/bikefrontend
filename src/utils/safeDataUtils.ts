// Safe array operations
export function safeSlice<T>(data: unknown, start?: number, end?: number): T[] {
  if (Array.isArray(data)) {
    return data.slice(start, end);
  }
  console.warn("safeSlice: Expected array but got:", typeof data, data);
  return [];
}

export function safeMap<T, R>(
  data: unknown,
  callback: (item: T, index: number) => R
): R[] {
  if (Array.isArray(data)) {
    return data.map(callback);
  }
  console.warn("safeMap: Expected array but got:", typeof data, data);
  return [];
}

export function safeFilter<T>(
  data: unknown,
  callback: (item: T, index: number) => boolean
): T[] {
  if (Array.isArray(data)) {
    return data.filter(callback);
  }
  console.warn("safeFilter: Expected array but got:", typeof data, data);
  return [];
}

// Safe string operations
export function safeStringSlice(
  data: unknown,
  start?: number,
  end?: number
): string {
  if (typeof data === "string") {
    return data.slice(start, end);
  }
  if (data != null) {
    return String(data).slice(start, end);
  }
  console.warn("safeStringSlice: Expected string but got:", typeof data, data);
  return "";
}

// Data validation
export function ensureArray<T>(data: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(data)) {
    return data;
  }

  // Handle common API response patterns
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;

    // Check for common array properties
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.items)) return obj.items;
    if (Array.isArray(obj.results)) return obj.results;
    if (Array.isArray(obj.list)) return obj.list;
  }

  console.warn("ensureArray: Could not convert to array:", typeof data, data);
  return fallback;
}

export function ensureString(data: unknown, fallback = ""): string {
  if (typeof data === "string") {
    return data;
  }
  if (data != null) {
    return String(data);
  }
  return fallback;
}
