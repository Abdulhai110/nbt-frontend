import ENV from "../config/env";

// Generic API request
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${ENV.BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
