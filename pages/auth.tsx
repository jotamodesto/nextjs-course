import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
