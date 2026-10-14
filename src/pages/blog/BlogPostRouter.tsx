import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ClaudeCodeFeaturesBlog from "./ClaudeCodeFeaturesBlog";
import AIStackBlog from "./AIStackBlog";
import AgenticAIBlog from "./AgenticAIBlog";
import ClaudeArtifactsBlog from "./ClaudeArtifactsBlog";
import AutomationTrapBlog from "./AutomationTrapBlog";
import HiddenDangersOfAIBlog from "./HiddenDangersOfAIBlog";
import AIGeneratedTestsOracleBlog from "./AIGeneratedTestsOracleBlog";
import FlakyTestsDataProblemBlog from "./FlakyTestsDataProblemBlog";
import MCPForQAEngineersBlog from "./MCPForQAEngineersBlog";
import PromptingLLMSeleniumBlog from "./PromptingLLMSeleniumBlog";
import QAToAIBuilderBlog from "./QAToAIBuilderBlog";
import AIRootCauseAnalysisBlog from "./AIRootCauseAnalysisBlog";
import BuildingQAAgentBlog from "./BuildingQAAgentBlog";
import SelfHealingLocatorsBlog from "./SelfHealingLocatorsBlog";
import TestingAIFeaturesBlog from "./TestingAIFeaturesBlog";
import PlaywrightVsSeleniumAIEraBlog from "./PlaywrightVsSeleniumAIEraBlog";
import ClaudeCodeTestAutomationBlog from "./ClaudeCodeTestAutomationBlog";
import RegressionSuiteAuditBlog from "./RegressionSuiteAuditBlog";
import HumanInTheLoopChecklistBlog from "./HumanInTheLoopChecklistBlog";
import RiskBasedTestingCopilotBlog from "./RiskBasedTestingCopilotBlog";
import ClaudeMdForTestReposBlog from "./ClaudeMdForTestReposBlog";
import TestDataBottleneckBlog from "./TestDataBottleneckBlog";
import DocumentationAsTestSuiteBlog from "./DocumentationAsTestSuiteBlog";
import MutationTestingBlog from "./MutationTestingBlog";
import ReusablePromptPatternsBlog from "./ReusablePromptPatternsBlog";
import APITestingRoadmapBlog from "./APITestingRoadmapBlog";
import N8nForQATeamsBlog from "./N8nForQATeamsBlog";
import JiraBugReportsBlog from "./JiraBugReportsBlog";
import SDETSkillsMap2026Blog from "./SDETSkillsMap2026Blog";
import ShippingSmallAIToolBlog from "./ShippingSmallAIToolBlog";
import AIInQATeamOfFiveBlog from "./AIInQATeamOfFiveBlog";
import PromptInjectionTestersBlog from "./PromptInjectionTestersBlog";
import CICDTestAutomationBlog from "./CICDTestAutomationBlog";
import LongLogsLLMBlog from "./LongLogsLLMBlog";
import ExploratoryTestingAIEraBlog from "./ExploratoryTestingAIEraBlog";
import TestingRAGSystemBlog from "./TestingRAGSystemBlog";
import QAInterviewsAIAgeBlog from "./QAInterviewsAIAgeBlog";
import SecurityTestingBasicsBlog from "./SecurityTestingBasicsBlog";
import AICostLiteracyBlog from "./AICostLiteracyBlog";
import TestReportsManagersBlog from "./TestReportsManagersBlog";
import ReviewingAICodeChecklistBlog from "./ReviewingAICodeChecklistBlog";
import LoadTestingFunctionalTestersBlog from "./LoadTestingFunctionalTestersBlog";
import LocalVsCloudModelsBlog from "./LocalVsCloudModelsBlog";
import CrossBrowserTesting2026Blog from "./CrossBrowserTesting2026Blog";
import WritingInPublicQABlog from "./WritingInPublicQABlog";
import VibeCodingVsEngineeringBlog from "./VibeCodingVsEngineeringBlog";

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
    case "ai-generated-tests-oracle-problem":
      return <AIGeneratedTestsOracleBlog />;
    case "flaky-tests-are-a-data-problem":
      return <FlakyTestsDataProblemBlog />;
    case "mcp-explained-for-qa-engineers":
      return <MCPForQAEngineersBlog />;
    case "prompting-llms-for-selenium-tests-that-dont-rot":
      return <PromptingLLMSeleniumBlog />;
    case "from-qa-engineer-to-ai-builder":
      return <QAToAIBuilderBlog />;
    case "ai-assisted-root-cause-analysis-for-failed-tests":
      return <AIRootCauseAnalysisBlog />;
    case "building-a-qa-agent-what-to-automate":
      return <BuildingQAAgentBlog />;
    case "self-healing-locators-magic-or-technical-debt":
      return <SelfHealingLocatorsBlog />;
    case "how-to-test-an-ai-feature":
      return <TestingAIFeaturesBlog />;
    case "playwright-vs-selenium-in-the-ai-era":
      return <PlaywrightVsSeleniumAIEraBlog />;
    case "claude-code-for-test-automation-daily-workflow":
      return <ClaudeCodeTestAutomationBlog />;
    case "regression-suite-audit-with-ai":
      return <RegressionSuiteAuditBlog />;
    case "human-in-the-loop-checklist-for-ai-automation":
      return <HumanInTheLoopChecklistBlog />;
    case "risk-based-testing-with-an-ai-copilot":
      return <RiskBasedTestingCopilotBlog />;
    case "claude-md-for-test-repositories":
      return <ClaudeMdForTestReposBlog />;
    case "test-data-is-the-hidden-bottleneck":
      return <TestDataBottleneckBlog />;
    case "documentation-is-part-of-your-test-suite":
      return <DocumentationAsTestSuiteBlog />;
    case "mutation-testing-for-teams-with-good-coverage":
      return <MutationTestingBlog />;
    case "reusable-prompt-patterns-for-qa-engineers":
      return <ReusablePromptPatternsBlog />;
    case "api-testing-roadmap-from-zero":
      return <APITestingRoadmapBlog />;
    case "n8n-for-qa-teams-workflows-that-save-hours":
      return <N8nForQATeamsBlog />;
    case "writing-bug-reports-developers-act-on":
      return <JiraBugReportsBlog />;
    case "the-sdet-skills-map-for-2026":
      return <SDETSkillsMap2026Blog />;
    case "shipping-a-small-ai-tool-as-a-solo-builder":
      return <ShippingSmallAIToolBlog />;
    case "where-id-use-ai-in-a-qa-team-of-five":
      return <AIInQATeamOfFiveBlog />;
    case "prompt-injection-for-testers":
      return <PromptInjectionTestersBlog />;
    case "ci-cd-for-test-automation-pipelines":
      return <CICDTestAutomationBlog />;
    case "feeding-long-logs-to-an-llm":
      return <LongLogsLLMBlog />;
    case "exploratory-testing-in-the-ai-era":
      return <ExploratoryTestingAIEraBlog />;
    case "testing-a-rag-system":
      return <TestingRAGSystemBlog />;
    case "qa-interviews-in-the-age-of-ai":
      return <QAInterviewsAIAgeBlog />;
    case "security-testing-basics-for-qa-engineers":
      return <SecurityTestingBasicsBlog />;
    case "ai-cost-literacy-for-engineers":
      return <AICostLiteracyBlog />;
    case "test-reports-managers-actually-read":
      return <TestReportsManagersBlog />;
    case "reviewing-ai-generated-code-a-testers-checklist":
      return <ReviewingAICodeChecklistBlog />;
    case "load-testing-for-functional-testers":
      return <LoadTestingFunctionalTestersBlog />;
    case "local-models-vs-cloud-models-for-qa":
      return <LocalVsCloudModelsBlog />;
    case "cross-browser-testing-in-2026":
      return <CrossBrowserTesting2026Blog />;
    case "writing-in-public-as-a-qa-engineer":
      return <WritingInPublicQABlog />;
    case "vibe-coding-vs-engineering":
      return <VibeCodingVsEngineeringBlog />;
    default:
      return <Navigate to="/blog" replace />;
  }
}
