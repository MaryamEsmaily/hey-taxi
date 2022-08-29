import { instance } from "config/instanceAxios";
import { useEffect, useState } from "react";

const useGetLocationName = (latLng) => {
  const [name, setName] = useState("");
  const getLocationName = async (latLng) => {
    const { data } = await instance.get("https://api.neshan.org/v4/reverse", {
      params: {
        ...latLng,
      },
      headers: {
        "Api-Key": "service.71e4b3742d254ed797f31bdec2a10040",
      },
    });
    return data;
  };
  //
  useEffect(() => {
    if (latLng) {
      getLocationName(latLng).then((res) =>
        setName(res?.formatted_address ?? "")
      );
    }
  }, [latLng]);

  //
  return name;
};

export default useGetLocationName;
