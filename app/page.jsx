import ToasterShow from "@/_helpers/toasterShow.helper";
import Client_Component from "@/components/Client_Component";
import Loader from "@/components/Loader";
import { SessionProviderComponent } from "@/components/provider/nextAuthSessionProvider";
import BottomBar from "@/components/typePage/bottomBar";
import FilterBar from "@/components/typePage/filterBar";
import TypeTextComponent from "@/components/typePage/typeTextComponent";
import { Suspense } from "react";

export default function Root() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToasterShow />
      </Suspense>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[1440px] h-full flex flex-col items-center justify-start">
          <FilterBar />
          <TypeTextComponent />
          <BottomBar />
        </div>
      </div>
    </>
  );
}
