import endpoints from "../api/endpoints";


export const fetchPlans = async () => {
  try {
    const response = await fetch(endpoints.PLANS);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
