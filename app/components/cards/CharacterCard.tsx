import type { FunctionComponent } from "react";
import type { getCharactersList } from "~/models/characters.server";

import { Link } from "@remix-run/react";

import { Paper } from "~/components/Paper";
import { StaticPicture } from "~/components/StaticPicture";

type CharacterListEntry = Awaited<ReturnType<typeof getCharactersList>>[number];
interface Props {
  character: CharacterListEntry;
  className?: string;
}

export const CharacterCard: FunctionComponent<Props> = ({ character, className }) => {
  const elementSrc = `/img/elements/${character.vision.toLowerCase()}/icon.webp`;

  const iconObjectS3 = character.assets.find((entry) => entry.type === "ICON")?.url;
  const iconSrc = iconObjectS3 ?? `/img/characters/${character.id}/icon.webp`;

  const iconBg = () => {
    if (character.rarity === 5) {
      return "from-[#945C2C] to-[#B27330]";
    } else if (character.rarity === 4) {
      return "from-[#5E5789] to-[#9C75B7]";
    }
    return "from-[#6A6D74] to-[#868586]";
  };

  return (
    <div className={`w-[calc(33.33%-0.75rem)] lg:w-28 ${className}`}>
      <Paper
        as={Link}
        to={`/characters/${character.id}`}
        className="relative z-0 block p-0 before:absolute before:top-0 before:bottom-0 before:z-[-1] before:h-full before:w-full before:rounded-lg before:bg-inherit before:transition-all hover:shadow-lg dark:before:hover:brightness-125"
      >
        <div className="absolute -ml-[10px] -mt-[10px] box-border flex aspect-square w-8 items-center justify-center rounded-full bg-dark-900 dark:bg-black">
          <StaticPicture
            src={elementSrc}
            alt="Element src"
            className="aspect-square h-5 w-5 object-contain object-center"
          />
        </div>
        <div className={"aspect-square w-full rounded-t-lg bg-gradient-to-b " + iconBg()}>
          <img
            className="card-thumbnail"
            src={iconSrc}
            alt={`${character.identity.at(0)?.name} icon`}
          />
        </div>

        <div className="flex h-full w-full items-center justify-center py-1 text-[.9rem] font-semibold">
          <p className="p-1 text-center leading-none dark:text-dark-100">
            {character.identity.at(0)?.name}
          </p>
        </div>
      </Paper>
    </div>
  );
};
