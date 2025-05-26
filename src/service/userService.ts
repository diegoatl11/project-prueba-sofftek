import endpoints from "../api/endpoints";

interface User {
  name: string;
  lastName: string;
  birthDay: string;
}

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await fetch(endpoints.USER);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
