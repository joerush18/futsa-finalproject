import { useEffect, useRef, useState } from "react";
import { auth } from "core/src/db";
import { useGetUser } from "core/src/db/hooks/useUser";
import { ROLES } from "core/src/types/users.types";
import useUserStore from "@/store/useUserStore";
import { IFutsal } from "core/src/types/futsals.types";

const useCurrentUser = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { setFutsal, futsal } = useUserStore();

  const unsubscribe = useRef<() => void>();
  const {
    data: futsalData,
    mutate: fetchUser,
    isLoading,
    isSuccess,
  } = useGetUser();

  useEffect(() => {
    if (typeof unsubscribe.current === "function") {
      unsubscribe.current();
    }
    const fetchCurrentUser = async () => {
      unsubscribe.current = auth.onAuthStateChanged((user) => {
        setIsAuth(!!user);
        if (user) {
          fetchUser({ id: user?.uid, role: ROLES.FUTSAL });
          if (isSuccess) {
            setFutsal(futsalData as IFutsal);
          }
        }
      });
    };
    fetchCurrentUser();
    return () => {
      if (typeof unsubscribe.current === "function") {
        unsubscribe.current();
      }
    };
  }, []);

  return {
    isAuth,
    futsal: isSuccess ? (futsalData as IFutsal) : (futsal as IFutsal),
    isLoading,
  };
};

export default useCurrentUser;
