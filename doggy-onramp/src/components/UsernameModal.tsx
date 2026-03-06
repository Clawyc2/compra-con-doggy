"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "@/lib/supabase";

interface UsernameModalProps {
  onComplete: () => void;
}

export function UsernameModal({ onComplete }: UsernameModalProps) {
  const { user } = usePrivy();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    const email = user?.email?.address || "";
    const privyDid = user?.id || "";
    const avatarUrl = (user as any)?.google?.profilePictureUrl || null;
    const walletAddr = 
      (user as any)?.wallet?.address ||
      (user as any)?.linkedAccounts?.find((a: any) => a.type === 'wallet')?.address ||
      null;

    try {
      // 1. Intentar crear usuario
      const { data: insertData, error: insertError } = await supabase
        .from("doggy_users")
        .insert({
          privy_did: privyDid,
          email,
          name: username,
          avatar_url: avatarUrl,
          wallet_address: walletAddr,
        })
        .select()
        .single();

      if (insertData) {
        // Éxito con insert
        onComplete();
        return;
      }

      // 2. Si falló por conflicto (ya existe privy_did), hacer update
      if (insertError) {
        console.log("Insert failed, trying update:", insertError);
        
        const { data: updateData, error: updateError } = await supabase
          .from("doggy_users")
          .update({
            name: username,
            email,
            avatar_url: avatarUrl,
            wallet_address: walletAddr,
            updated_at: new Date().toISOString(),
          })
          .eq("privy_did", privyDid)
          .select()
          .single();

        if (updateData) {
          // Éxito con update
          onComplete();
          return;
        }

        // 3. Si también falló, intentar por email
        const { data: emailData, error: emailError } = await supabase
          .from("doggy_users")
          .update({
            privy_did: privyDid,
            name: username,
            avatar_url: avatarUrl,
            wallet_address: walletAddr,
            updated_at: new Date().toISOString(),
          })
          .eq("email", email)
          .select()
          .single();

        if (emailData) {
          onComplete();
          return;
        }

        // Todo falló
        console.error("All methods failed:", { insertError, updateError, emailError });
        setError("Error al guardar. Intenta refrescar la página.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.9)" }}>
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: "linear-gradient(180deg, #0a1628 0%, #050d1f 100%)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
          boxShadow: "0 0 60px rgba(0, 100, 255, 0.2)",
        }}
      >
        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))" }}
          >
            <span className="text-4xl">🐕</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido a DOGGY!</h2>
          <p className="text-gray-400">Elige tu nombre de usuario</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu nombre de usuario"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5c842] transition-colors"
              autoFocus
              disabled={loading}
              minLength={2}
              maxLength={50}
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || username.trim().length < 2}
            className="w-full py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: loading ? "#666" : "linear-gradient(135deg, #f5c842 0%, #e6a800 100%)",
              color: "#000",
            }}
          >
            {loading ? "Guardando..." : "Continuar"}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-4">
          Este nombre aparecerá en tu perfil de DOGGY OnRamp
        </p>
      </div>
    </div>
  );
}
