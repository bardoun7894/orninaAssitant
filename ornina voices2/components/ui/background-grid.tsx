export const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_200px,#1e40af20,transparent)]"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_80%_80%,#0ea5e920,transparent)]"></div>
    </div>
  );
};
