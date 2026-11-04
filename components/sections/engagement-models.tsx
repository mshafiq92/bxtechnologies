import { Tag } from "@/components/ui/chip";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading } from "@/components/ui/typography";
import type { EngagementModel } from "@/lib/content";

/**
 * Engagement models (Home and Services): heading block on the left, a hairline list of
 * models on the right, each with a pill tag.
 */
export function EngagementModels({
  intro,
  models,
}: {
  intro: { eyebrow: string; title: string; text: string; cta: string };
  models: EngagementModel[];
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-12">
      <div className="flex flex-col gap-4">
        <Eyebrow>{intro.eyebrow}</Eyebrow>
        <Heading as="h2" size="h2">
          {intro.title}
        </Heading>
        <p className="max-w-[48ch] text-body text-muted">{intro.text}</p>
        <TextLink href="#contact" className="self-start">
          {intro.cta}
        </TextLink>
      </div>
      <ul className="border-b border-hairline">
        {models.map((model) => (
          <li key={model.title} className="flex flex-col gap-2 border-t border-hairline py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <Heading as="h3" size="h4">
                {model.title}
              </Heading>
              <Tag shape="pill">{model.tag}</Tag>
            </div>
            <p className="max-w-[62ch] text-body text-muted">{model.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
