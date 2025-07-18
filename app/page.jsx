import Client_Component from "@/components/Client_Component";
import BottomBar from "@/components/typePage/bottomBar";
import FilterBar from "@/components/typePage/filterBar";
import TypeTextComponent from "@/components/typePage/typeTextComponent";

export default function Root() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[1440px] h-full flex flex-col items-center justify-start">
        <Client_Component>
          <FilterBar />
          <TypeTextComponent />
          <BottomBar />
        </Client_Component>
      </div>
    </div>
  );
}
