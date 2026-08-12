import MarkdownImage from "~/components/content/MarkdownImage.vue";
import WorkFeature from "~/components/global/WorkFeature.vue";

/**
 * Map of custom component names used in content markdown to Vue components.
 * Pass to <ContentRenderer :components="contentComponents"> so that tags like
 * <MarkdownImg>, <MarkdownImage>, and <work-feature> render correctly.
 */
export function useContentComponents() {
  return {
    MarkdownImg: MarkdownImage,
    MarkdownImage,
    WorkFeature,
    "work-feature": WorkFeature,
  };
}
