import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useGetUser } from "core/src/db/hooks/useUser";
import { IUser } from "core/src/types/users.types";

const useCurrentUser = () => {
  const auth = getAuth();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { mutate: getUser, isLoading, isSuccess, data } = useGetUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          getUser(currentUser.uid);
          if (isSuccess) {
            setIsAuth(true);
            setUser(data);
          }
        } else {
          setIsAuth(false);
          setUser(null);
        }
      },
      (error) => {
        setError(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, isAuth, error, isLoading };
};

export default useCurrentUser;
