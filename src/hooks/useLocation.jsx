import { useState } from "react";

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const locate = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const { latitude, longitude } = p.coords;

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9671432fd5f842ea86f552d8dc4c5a77`,
        )
          .then((res) => res.json())
          .then((data) => {
            setLocation(data.results[0].components.city);
          })
          .catch(() => setLocation("Unavailable"))
          .finally(() => setLoading(false));
      },
      (error) => {
        setLoading(false);
        setLocation("Locate me");
      },
      {
        timeout: 10000, // 10 seconds
      },
    );
  };

  return [locate, location, loading];
}
