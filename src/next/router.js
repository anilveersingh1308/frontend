"use client"; // Add this directive

import { useState, useEffect } from "react";

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : ""
  );
  const [queryParams, setQueryParams] = useState(
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
  );

  const push = (path) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", path);
      setCurrentPath(path);
      setQueryParams(new URLSearchParams(window.location.search));
    }
  };

  const replace = (path) => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", path);
      setCurrentPath(path);
      setQueryParams(new URLSearchParams(window.location.search));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handlePopState = () => {
        setCurrentPath(window.location.pathname);
        setQueryParams(new URLSearchParams(window.location.search));
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  return {
    pathname: currentPath,
    query: Object.fromEntries(queryParams.entries()),
    push,
    replace,
  };
}

//  Custom router hook to simplify navigation logic.
 
const useCustomRouter = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  const redirectToStudents = () => {
    router.push("/students");
  };

  return {
    navigateTo,
    redirectToLogin,
    redirectToStudents,
  };
};

export default useCustomRouter;
