"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import NavBar from "@/components/home/NavBar";
import TrendingSection from "@/components/home/TrendingSection";
import { CHANNELS, DEMO_ACCOUNT, FEED_POSTS, RIGHT_LINKS, SIDEBAR_ITEMS } from "@/components/home/constants";

export default function HomePage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const rawSession = window.localStorage.getItem("fc-demo-session");
    if (!rawSession) {
      return;
    }

    try {
      const parsed = JSON.parse(rawSession);
      if (parsed?.identifier === DEMO_ACCOUNT.identifier) {
        setCurrentUser({
          displayName: DEMO_ACCOUNT.displayName,
          handle: DEMO_ACCOUNT.handle,
        });
      }
    } catch {
      window.localStorage.removeItem("fc-demo-session");
    }
  }, []);

  function handleLogin(event) {
    event.preventDefault();

    if (
      identifier.trim() === DEMO_ACCOUNT.identifier &&
      password === DEMO_ACCOUNT.password
    ) {
      const sessionPayload = {
        identifier: DEMO_ACCOUNT.identifier,
        signedInAt: new Date().toISOString(),
      };

      window.localStorage.setItem("fc-demo-session", JSON.stringify(sessionPayload));
      setCurrentUser({
        displayName: DEMO_ACCOUNT.displayName,
        handle: DEMO_ACCOUNT.handle,
      });
      setErrorMessage("");
      setPassword("");
      return;
    }

    setErrorMessage("Credential tidak cocok. Pakai akun demo yang ditampilkan.");
  }

  function handleLogout() {
    window.localStorage.removeItem("fc-demo-session");
    setCurrentUser(null);
    setIdentifier("");
    setPassword("");
    setErrorMessage("");
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-zinc-100">
      <main className="mx-auto grid w-full max-w-340 grid-cols-1 gap-4 px-3 py-3 lg:grid-cols-[250px_1fr_420px]">
        <NavBar items={SIDEBAR_ITEMS} isLoggedIn={Boolean(currentUser)} onLogout={handleLogout} />

        <section id="discover" className="min-w-0">
          <HeroSection posts={FEED_POSTS} />
        </section>

        <section className="min-w-0">
          <TrendingSection
            channels={CHANNELS}
            links={RIGHT_LINKS}
            currentUser={currentUser}
            identifier={identifier}
            password={password}
            errorMessage={errorMessage}
            onIdentifierChange={setIdentifier}
            onPasswordChange={setPassword}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </section>
      </main>
    </div>
  );
}
