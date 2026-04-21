import LoginCard from "@/components/home/LoginCard";

export default function TrendingSection({
  channels,
  links,
  currentUser,
  identifier,
  password,
  errorMessage,
  onIdentifierChange,
  onPasswordChange,
  onLogin,
  onLogout,
}) {
  return (
    <aside className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-[#0b0b0f] p-2.5">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-400">
          <span>Search casts, channels and users</span>
          <span className="rounded border border-white/15 px-1.5 py-0.5 text-xs">Ctrl+K</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#18181d] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl font-semibold text-white">Discover Mini Apps</p>
            <p className="mt-1 text-sm text-zinc-400">View Mini Apps in Action</p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white"
          >
            &gt;
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-zinc-500">
          {links.map((link) => (
            <a key={link} href="#" className="hover:text-zinc-300">
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b0b0f] p-4">
        <p className="mb-3 text-sm font-semibold text-zinc-400">Popular channels</p>
        <div className="flex flex-wrap gap-2">
          {channels.map((channel) => (
            <button
              type="button"
              key={channel}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10"
            >
              {channel}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#18181d] p-4">
        <p className="mb-3 text-sm font-semibold text-zinc-300">Wallet</p>
        <LoginCard
          currentUser={currentUser}
          identifier={identifier}
          password={password}
          errorMessage={errorMessage}
          onIdentifierChange={onIdentifierChange}
          onPasswordChange={onPasswordChange}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      </div>
    </aside>
  );
}
