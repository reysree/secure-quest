import MysteryRoom from "./MysteryRoom";

export const generateStaticParams = () => {
  return [
    { difficulty: "easy" },
    { difficulty: "medium" },
    { difficulty: "hard" },
  ];
};

export default async function Page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const { difficulty } = resolvedParams;
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MysteryRoom difficulty={difficulty} />
    </div>
  );
}
