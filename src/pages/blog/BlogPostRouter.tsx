import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ClaudeCodeFeaturesBlog from "./ClaudeCodeFeaturesBlog";
import AIStackBlog from "./AIStackBlog";
import AgenticAIBlog from "./AgenticAIBlog";
import ClaudeArtifactsBlog from "./ClaudeArtifactsBlog";
import AutomationTrapBlog from "./AutomationTrapBlog";
import HiddenDangersOfAIBlog from "./HiddenDangersOfAIBlog";

export default function BlogPostRouter() {
  const params = useParams();
  const slug = params.slug;

  switch (slug) {
    case "claude-code-features":
      return <ClaudeCodeFeaturesBlog />;
    case "ai-coding-stack":
      return <AIStackBlog />;
    case "governing-agentic-ai":
      return <AgenticAIBlog />;
    case "claude-artifacts-building":
      return <ClaudeArtifactsBlog />;
    case "the-automation-trap":
      return <AutomationTrapBlog />;
    case "hidden-dangers-of-ai":
      return <HiddenDangersOfAIBlog />;
    default:
      return <Navigate to="/blog" replace />;
  }
}
