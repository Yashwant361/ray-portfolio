import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export const fetchHackerRankData = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/hackerrank`)
    return data
  } catch (err) {
    console.warn('HackerRank API unavailable, using fallback data')
    // Fallback static data when backend is unavailable
    return {
      username: 'ray_dev',
      stars: 3,
      badges: [
        { name: 'Problem Solving', stars: 3 },
        { name: 'JavaScript', stars: 1 },
      ],
      rank: null,
      totalSolved: 45,
      source: 'static',
    }
  }
}
