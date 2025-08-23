export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-700">
      {/* Header ala GitHub */}
      <header className="w-full bg-white text-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-200">
  {/* Left: Logo + Nav */}
  <div className="flex items-center gap-6">
    <a href="#" className="text-gray-800 text-2xl">🐱</a>
    <nav className="hidden md:flex gap-6 text-sm">
      <a href="#" className="hover:text-gray-600">Discover</a>
      <a href="#" className="hover:text-gray-600">Issues</a>
      <a href="#" className="hover:text-gray-600">Marketplace</a>
      <a href="#" className="hover:text-gray-600">Explore</a>
    </nav>
  </div>

  {/* Middle: Search */}
  <div className="flex-1 max-w-sm mx-6">
    <input
      type="text"
      placeholder="Search or jump to..."
      className="w-full bg-gray-50 text-sm text-gray-800 px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Right: Profile */}
  <div className="flex items-center gap-4">
    <button className="hover:text-gray-600">+</button>
    <img
      src="/path-to-profile.jpg"
      alt="Profile"
      className="w-8 h-8 rounded-full border border-gray-300"
    />
  </div>
</header>


      {/* Body Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 p-6 flex flex-col gap-6 bg-white">
          <div className="flex flex-col items-center">
            <img
              src="/path-to-profile.jpg"
              alt="Profile"
              className="rounded-full w-60 h-60 border-4 border-gradient-to-br from-purple-400 via-pink-500 to-yellow-400"
            />
            <h1 className="text-2xl font-semibold mt-4">Marco Fiorito</h1>
            <p className="text-gray-500 mt-1">@Marcoo09</p>
            <p className="text-gray-600 mt-2 text-center">
              Software Engineer | Mobile Developer
            </p>
          </div>

          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <p>📍 Montevideo</p>
            <p>📧 marcofiorito1@gmail.com</p>
            <p>
              🔗{" "}
              <a
                href="https://medium.com/@maarcoo09"
                className="text-blue-500 hover:underline"
              >
                Medium
              </a>
            </p>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <div className="w-10 h-10 border-2 border-green-300 rounded-full hover:border-green-500 transition-colors"></div>
            <div className="w-10 h-10 border-2 border-yellow-300 rounded-full hover:border-yellow-500 transition-colors"></div>
            <div className="w-10 h-10 border-2 border-pink-300 rounded-full hover:border-pink-500 transition-colors"></div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col gap-8">
          {/* About Me */}
          <div>
            <h2 className="text-lg text-gray-700 mb-2">About Me</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <p>
                Hi guys, I'm Marco Fiorito. I'm a Software Engineer from
                Montevideo 🇺🇾.
              </p>
              <p>
                📌 Currently working on{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Howdy
                </a>
              </p>
              <p>
                📧 Reach me at{" "}
                <a
                  href="mailto:marcofiorito1@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  marcofiorito1@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Pinned */}
          <div>
            <h2 className="text-lg text-gray-700 mb-2">Pinned</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border p-3 rounded border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  MetaLabs-inc/flutter-base-project
                </div>
                <div className="border p-3 rounded border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  MetaLabs-inc/react-native-base-project
                </div>
              </div>
            </div>
          </div>

          {/* Contributions */}
          <div>
            <h2 className="text-lg text-gray-700 mb-2">Contributions</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="h-32 bg-gray-50 rounded flex items-center justify-center text-gray-400 border border-gray-200">
                Contribution graph placeholder
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
