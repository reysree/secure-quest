import MysteryRoom from "./MysteryRoom";

export const generateStaticParams = () => {
  return [
    { difficulty: "easy" },
    { difficulty: "medium" },
    { difficulty: "hard" },
  ];
};

export default function GamePage({ params }) {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MysteryRoom difficulty={params.difficulty} />
    </div>
  );
}
