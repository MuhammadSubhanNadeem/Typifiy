import FilterBar from "@/components/typePage/filterBar";

export default function Root() {
  return (
    <div className="w-full h-full">
      <div className="w-full max-w-[1440px] flex items-start justify-center">
        <FilterBar />
        <div className="w-full h-fit max-h-[350px] text-justify font-orbit">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
          eveniet optio, eum non architecto deleniti quisquam repudiandae animi
          sint placeat aut aliquid maxime labore ex hic inventore. Ipsam,
          consectetur nostrum?
        </div>
      </div>
    </div>
  );
}
