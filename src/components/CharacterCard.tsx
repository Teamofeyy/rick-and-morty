import type { Character } from "@/api/types";
import Card from "./Card";

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card
      image={character.image}
      title={character.name}
      description={character.species}
      to={`/character/${character.id}`}
    />
  );
}
