import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

export const LoginNavigate: FC<PropsWithChildren> = ({ children }) => {
  const route = useRouter();

  const isAuth = false; // запрос за данными пользователя useSelector(state=> state.auth.isAuth)

  if (!isAuth) route.push("/test");

  return <>{children}</>;
};
