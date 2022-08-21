import { usePostAuthProfile } from "hook/api/useApiAuth";
import { useUser } from "hook/useUser";
import cookie from "js-cookie";
import { useEffect } from "react";

function SetupUser() {
  const id = cookie.get("userId");
  const { setUser } = useUser();

  const postAuthProfile = usePostAuthProfile({ userId: id });

  useEffect(() => {
    if (id) {
      postAuthProfile.mutate(
        { userId: id },
        {
          onSuccess: (res) => {
            setUser({
              username: res?.valueOrDefault.user.username,
              userId: res?.valueOrDefault.user.id,
              role: res?.valueOrDefault.user.role,
              phoneNo: res?.valueOrDefault.user.phoneNo,
              gender: res?.valueOrDefault.user.gender,
              car: res?.valueOrDefault.driver?.car,
              carId: res?.valueOrDefault.driver?.carId,
              id: res?.valueOrDefault.driver?.id,
              passId: res?.valueOrDefault.passenger?.id,
            });
          },
          onError: (err) => {
            toast.error({ err });
          },
        }
      );
    }
  }, [id]);
  return null;
}

export default SetupUser;
