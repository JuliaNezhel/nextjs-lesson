import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";

// хук который добавляется загрузку при переходе между страницами
export const useLoader = () => {
  const router = useRouter();

  const startLoading = () => nProgress.start();
  const endLoader = () => nProgress.done();

  useEffect(() => {
    //деламе подписку на событие
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", endLoader);
    router.events.on("routeChangeError", endLoader);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", endLoader);
      router.events.off("routeChangeError", endLoader);
    };
  }, [router]);
};
