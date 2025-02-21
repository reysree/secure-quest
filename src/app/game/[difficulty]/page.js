import { GameClient } from "./GameClient";

export const generateStaticParams = () => {
  return [
    { difficulty: "easy" },
    { difficulty: "medium" },
    { difficulty: "hard" },
  ];
};

export default function GamePage({ params }) {
  return <GameClient difficulty={params.difficulty} />;
}
