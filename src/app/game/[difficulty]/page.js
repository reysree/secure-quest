import { GameClient } from "./GameClient";

export const generateStaticParams = () => {
  return [
    { difficulty: "easy" },
    { difficulty: "medium" },
    { difficulty: "hard" },
  ];
};

export default async function GamePage({ params: { difficulty } }) {
  return <GameClient difficulty={difficulty} />;
}
