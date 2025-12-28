import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("@/pages/home/page"));
const WebAppPage = lazy(() => import("@/pages/webapp/page"));
const AIImageGeneratorPage = lazy(() => import("@/pages/ai-image-generator/page"));
const AIImageEditorPage = lazy(() => import("@/pages/ai-image-editor/page"));
const AIBackgroundRemoverPage = lazy(() => import("@/pages/ai-background-remover/page"));
const AISketchGeneratorPage = lazy(() => import("@/pages/ai-sketch-generator/page"));
const ImageToVideoPage = lazy(() => import("@/pages/image-to-video/page"));
const AIClothesChangerPage = lazy(() => import("@/pages/ai-clothes-changer/page"));
const ImageEnhancerPage = lazy(() => import("@/pages/image-enhancer/page"));
const PricingPage = lazy(() => import("@/pages/pricing/page"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy/page"));
const TermsOfServicePage = lazy(() => import("@/pages/terms-of-service/page"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/webapp",
    element: <WebAppPage />,
  },
  {
    path: "/ai-image-generator",
    element: <AIImageGeneratorPage />,
  },
  {
    path: "/ai-image-editor",
    element: <AIImageEditorPage />,
  },
  {
    path: "/ai-background-remover",
    element: <AIBackgroundRemoverPage />,
  },
  {
    path: "/ai-sketch-generator",
    element: <AISketchGeneratorPage />,
  },
  {
    path: "/image-to-video",
    element: <ImageToVideoPage />,
  },
  {
    path: "/ai-clothes-changer",
    element: <AIClothesChangerPage />,
  },
  {
    path: "/image-enhancer",
    element: <ImageEnhancerPage />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfServicePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
