import { ArrowDownIcon } from "@/components/ui/icons";
import type { ServiceDetail } from "@/lib/content";

type Architecture = ServiceDetail["architecture"];

function Down() {
  return (
    <div aria-hidden="true" className="flex justify-center text-strong">
      <ArrowDownIcon size={16} />
    </div>
  );
}

/**
 * Service Detail architecture figure (white band): three edge boxes, down arrow, a cyan-bordered
 * core box, down arrow, four filled layer boxes, then a dashed observability box.
 */
export function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { edge, core, layers, observability } = architecture;
  return (
    <figure className="m-0 flex flex-col gap-3" aria-label={`${core.label} reference architecture`}>
      <div className="grid grid-cols-1 gap-2 min-[720px]:grid-cols-3">
        {edge.map((box) => (
          <div key={box.t} className="flex flex-col gap-1.5 rounded-md border border-strong p-4">
            <span className="text-body leading-[22px] font-semibold">{box.t}</span>
            <span className="font-mono text-[13px] leading-5 text-muted">{box.d}</span>
          </div>
        ))}
      </div>
      <Down />
      <div className="flex flex-col gap-1.5 rounded-md border border-brand-cyan p-5">
        <span className="eyebrow text-link">{core.label}</span>
        <span className="text-body">{core.text}</span>
      </div>
      <Down />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {layers.map((box) => (
          <div
            key={box.t}
            className="flex flex-col gap-1.5 rounded-md border border-hairline bg-ground p-4"
          >
            <span className="text-body leading-[22px] font-semibold">{box.t}</span>
            <span className="text-small text-muted">{box.d}</span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex flex-wrap justify-between gap-x-6 gap-y-1.5 rounded-md border border-dashed border-strong px-5 py-4">
        <span className="text-body leading-6 font-semibold">{observability.t}</span>
        <span className="font-mono text-[13px] leading-6 text-muted">{observability.d}</span>
      </div>
    </figure>
  );
}
