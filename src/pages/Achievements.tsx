export default function Achievements() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          Achievements
        </h1>

        <div className="space-y-6">
          <div className="border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold">
              QA Automation Engineer
            </h3>
            <p className="text-gray-400 mt-2">
              Working on enterprise-scale automation frameworks,
              API testing and Selenium automation.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold">
              AI Learning Journey
            </h3>
            <p className="text-gray-400 mt-2">
              Exploring AI tools, automation workflows and modern
              productivity systems.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold">
              Digital Presence
            </h3>
            <p className="text-gray-400 mt-2">
              Built and deployed personal website using React,
              Vite and GitHub Pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}