import axios from "axios";

export const getNearbyHospitals = async (latitude, longitude) => {
  const overpassUrl = "https://overpass-api.de/api/interpreter";
  const query = `
    [out:json];
    node
      ["amenity"="hospital"]
      (around:5000,${latitude},${longitude});
    out body;
  `;

  try {
    const response = await axios.post(overpassUrl, query, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const hospitals = response.data.elements;
    return hospitals;
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    throw error;
  }
};

