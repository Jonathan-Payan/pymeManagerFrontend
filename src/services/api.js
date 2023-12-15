export const API_BASE_URL = "http://localhost:4000/api";

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de red:", error);
    throw error;
  }
};
