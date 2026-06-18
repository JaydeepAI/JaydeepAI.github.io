import { useNavigate } from "react-router-dom";

export const blogPosts = [
  {
    slug: "claude-code-features",
    title: "Claude Code: Every AI Feature Explained",
    excerpt:
      "A complete breakdown of CLAUDE.md, Skills, Commands, Subagents, Hooks, MCP Servers, and Plugins — with real code examples.",
    date: "June 18, 2025",
    readTime: "12 min",
    tags: ["Claude Code", "AI Dev Tools", "Anthropic"],
    category: "AI Builder",
    emoji: "🤖",
  },
];

export default function BlogIndex() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 pt-24 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full border border-blue-500/40 text-blue-400 bg-blue-500/10">
            Digital Jaydeep · Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            AI Insights & Dev Logs
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Deep-dives on AI tools, automation systems, and the builder mindset — from someone actually shipping.
          </p>
        </div>

        {/* Post List */}
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 p-6 md:p-8 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{post.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <span className="text-xs text-gray-500">· {post.readTime} read</span>
                  </div>
                  <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-500"
                      >
                        #{tag.replace(/\s/g, "")}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-blue-400 transition-colors text-xl shrink-0">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}