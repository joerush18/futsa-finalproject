import { useEffect, useRef, useState } from "react";
import { auth } from "core/src/db";
import { ROLES } from "core/src/types/users.types";
import useUserStore from "@/store/useUserStore";
import { getCurrentFutsal } from "core/src/db/methods/users/futsal";

const useCurrentUser = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { futsal, setFutsal } = useUserStore();

  const unsubscribe = useRef<() => void>();

  useEffect(() => {
    setIsLoading(true);
    if (typeof unsubscribe.current === "function") {
      unsubscribe.current();
    }
    const fetchCurrentUser = async () => {
      unsubscribe.current = auth.onAuthStateChanged(async (user) => {
        setIsAuth(!!user);
        try {
          if (user) {
            const res = await getCurrentFutsal(user?.uid, ROLES.FUTSAL);
            if (res) {
              // @ts-ignore
              setFutsal(res);
            }
          }
        } catch (e) {
          console.log(e);
        }
        setIsLoading(false);
      });
    };
    fetchCurrentUser();
    return () => {
      if (typeof unsubscribe.current === "function") {
        unsubscribe.current();
      }
    };
  }, [isAuth]);

  return {
    isAuth,
    futsal: futsal ?? null,
    isLoading,
  };
};

export default useCurrentUser;
