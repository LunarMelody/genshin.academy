import type { FC } from "react";

interface Props {
  title?: string;
  headings: Array<string>;
}

export const ContentsTable: FC<Props> = ({ title, headings }) => {
  return (
    <div className="hidden flex-col space-y-1 lg:flex">
      <div className="card sticky right-0 top-4 w-60 overflow-y-auto">
        <div className="flex w-full flex-col gap-y-2">
          <div className="mb-0 self-center border-b border-gray-200 pb-3">
            <h1 className="font-semibold">{title}</h1>
          </div>

          <div className="flex flex-col gap-y-0">
            {headings.map((heading) => (
              <a
                key={`guide-nav-${heading}`}
                href={`#${heading}`}
                className="block rounded-lg px-4 py-2 text-sm font-medium capitalize text-gray-700 hover:bg-gray-100"
              >
                {heading.replaceAll("-", " ")}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
