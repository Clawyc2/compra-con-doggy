"use client";

import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function AuthButton() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();

  const { login } = useLogin({
    onComplete: (params) => {
      // params tiene: user, isNewUser, wasAlreadyAuthenticated, loginMethod, loginAccount
      if (params.user) {
        // Redirigir a /app donde se creará el usuario
        router.push("/app");
      }
    },
  });

  // Si ya está autenticado, redirigir a /app
  useEffect(() => {
    if (ready && authenticated && user) {
      router.push("/app");
    }
  }, [ready, authenticated, user, router]);

  if (!ready) {
    return (
      <button
        disabled
        className="px-6 py-3 rounded-lg text-sm font-semibold opacity-50"
        style={{
          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
          color: "#000",
        }}
      >
        Cargando...
      </button>
    );
  }

  if (authenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">
          {user?.google?.name || user?.email?.address}
        </span>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="px-4 py-2 rounded text-sm font-medium border border-gray-600 text-gray-300 hover:bg-white/5 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
      style={{
        background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        color: "#000",
        boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
      }}
    >
      Inicia Sesión / Regístrate
    </button>
  );
}
