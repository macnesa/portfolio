import React from "react";

const demoProfile = {
  name: "Resonate Sample",
  handle: "resonate.sample",
  quote: "Songs that stayed with me.",
  avatar: "/placeholder-avatar.png",
  tracks: [
    {
      id: "1",
      title: "Eternal Drift",
      artist: "Nocturne Ensemble",
      album: "Quiet Nights",
      cover: "/placeholder-cover-1.jpg",
      snippet: "…and when the light bends, I remember home…",
      visibility: "public",
    },
    {
      id: "2",
      title: "Glass Harbor",
      artist: "Low Tide Choir",
      album: "Shoreline",
      cover: "/placeholder-cover-2.jpg",
      snippet: "…this part — the bridge — is the one I keep.",
      visibility: "public",
    },
    {
      id: "3",
      title: "Midnight Grammar",
      artist: "Arcadian Roads",
      album: "Pages",
      cover: "/placeholder-cover-3.jpg",
      snippet: "…a chord that always lands on truth.",
      visibility: "public",
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 items-start">
        {/* Left: Manifesto + CTA */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Your music,
              <br />
              <span className="text-rose-400">your identity.</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-300 max-w-xl">
              Resonate is where your listening becomes a story. 
              Capture the songs that matter, highlight the lines that hit, 
              and let your portfolio of sound speak for itself. 
              Not about charts or scores — just you, in music form.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/api/auth/spotify"
              className="inline-flex items-center justify-center rounded-md bg-rose-500 text-white px-5 py-3 font-semibold shadow hover:bg-rose-400 transition"
            >
              Start your profile
            </a>

            <a
              href="/demo"
              className="inline-flex items-center justify-center rounded-md border border-neutral-800 px-5 py-3 text-neutral-200 hover:bg-neutral-900 transition"
            >
              View demo
            </a>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-neutral-400">Why Resonate?</h4>
            <ul className="mt-3 grid gap-2 text-neutral-400">
              <li>• Showcase your music taste as part of your identity.</li>
              <li>• Full control: choose what to share and what stays private.</li>
              <li>• Pin exact lyrics or fragments that define the moment.</li>
              <li>• A portfolio of sound, not just another feed.</li>
            </ul>
          </div>
        </div>

        {/* Right: Demo profile preview */}
        <aside className="relative">
          <div className="rounded-2xl bg-neutral-900 shadow-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-600 to-rose-400 flex items-center justify-center text-2xl font-bold text-white">
                R
              </div>
              <div>
                <div className="font-semibold text-neutral-100">
                  {demoProfile.name}
                </div>
                <div className="text-sm text-neutral-500">@{demoProfile.handle}</div>
              </div>
              <div className="ml-auto text-sm text-neutral-500">Public</div>
            </div>

            <p className="mt-4 text-sm text-neutral-400 italic">“{demoProfile.quote}”</p>

            <div className="mt-6 space-y-4">
              {demoProfile.tracks.map((t) => (
                <article
                  key={t.id}
                  className="flex gap-4 items-start bg-neutral-800 rounded-lg p-3 border border-neutral-700 hover:border-neutral-600 transition"
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-md bg-neutral-700 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-sm text-neutral-500">
                      cover
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-neutral-100">
                        {t.title}
                      </h3>
                      <span className="text-xs text-neutral-500">•</span>
                      <span className="text-xs text-neutral-400">{t.artist}</span>
                    </div>

                    <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
                      {t.snippet}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-rose-500/20 text-rose-400">
                        Frag: 0:42–1:05
                      </span>
                      <span className="text-xs text-neutral-500">Album: {t.album}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 border-t border-neutral-800 pt-4 text-sm text-neutral-500">
              <span>Share your portfolio with one link —</span>{" "}
              <span className="text-neutral-200 font-medium">/resonate/{demoProfile.handle}</span>
            </div>
          </div>

          {/* subtle decorative glow */}
          <div className="absolute -right-6 top-8 w-36 h-36 rounded-2xl bg-rose-500/30 opacity-40 blur-3xl pointer-events-none" />
        </aside>
      </section>

      {/* footer minimal */}
      <footer className="border-t border-neutral-800 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} Resonate — Your music, your identity</div>
          <div>
            <a href="/about" className="hover:underline mr-4">About</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
