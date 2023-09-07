import { getCurrentPlayer } from "core";
import { ROLES } from "core";
import { useEffect, useRef, useState } from "react";
import { auth } from "core";
import { useUserStore } from "core";
import * as sstorage from "expo-secure-store";
const useCurrentUser = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { player, setPlayer } = useUserStore();

  const unsubscribe = useRef<() => void>();

  useEffect(() => {
    if (typeof unsubscribe.current === "function") {
      unsubscribe.current();
    }
    const fetchCurrentUser = async () => {
      setIsLoading(true);

      unsubscribe.current = auth.onAuthStateChanged(async (user) => {
        try {
          if (user) {
            setIsAuth(!!user);
            const res = await getCurrentPlayer(user?.uid, ROLES.PLAYER);
            if (res) {
              // @ts-ignore
              setPlayer(res);
            }
          }
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
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

  return { user: player, isAuth, isLoading };
};

export default useCurrentUser;
