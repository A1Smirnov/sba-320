import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchMonster = async (nameOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching monster:", error);
    return null;
  }
};
