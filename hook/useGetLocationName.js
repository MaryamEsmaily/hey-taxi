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
        "Api-Key": "service.7f87d05ab66c440098e036b97f3dd1b1",
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
