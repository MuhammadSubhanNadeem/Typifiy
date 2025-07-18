"use client";
import { useAppContext } from "@/store/App_Context";
import { motion, AnimatePresence } from "motion/react";
export default function FilterBar() {
  let appStore = useAppContext();
  return (
    <>
      <motion.div
        key="filter-root-container"
        layout
        layoutId="filter-bar"
        transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
        className="w-auto h-[35px] rounded-[5px] border bg-background-light font-orbit flex items-center justify-between px-[35px] gap-[35px] mt-[45px] overflow-hidden max-[1098px]:flex-col max-[1098px]:h-auto max-[1098px]:max-h-[420px] max-[1098px]:overflow-auto max-[1098px]:py-[35px]"
      >
        <AnimatePresence exitBeforeEnter>
          {appStore.uiStates?.textFilterStates?.contentType !== "quote" ? (
            <motion.div
              key="filter-left-container"
              initial={{ width: 0, opacity: 0 }}
              exit={{
                scaleX: 0,
                width: 0,
                transformOrigin: "left center",
                opacity: 0,
              }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              className="w-full h-full flex items-center justify-center flex-nowrap gap-[15px] overflow-hidden"
            >
              <button
                key="alphabet-buttons"
                type="button"
                className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1.5 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150 overflow-hidden"
              >
                <span className="font-bold text-[16px] italic">@</span>
                <span className="inline-block text-nowrap">alphabet</span>
              </button>
              <button
                key="numbers-buttons"
                type="button"
                className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1.5 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150 overflow-hidden"
              >
                <span className="font-bold text-[16px] italic">#</span>
                <span className="inline-block text-nowrap">numbers</span>
              </button>
              <button
                key="mix-buttons"
                type="button"
                className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1.5 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150 flex-nowrap overflow-hidden"
              >
                <i className="bi bi-union text-[12px]"></i>
                <span className="inline-block text-nowrap">mix Up</span>
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
        {appStore.uiStates?.textFilterStates?.contentType !== "quote" ? (
          <span className="w-[5px] min-w-[5px] h-[80%] bg-background-color rounded-4xl inline-block max-[1098px]:hidden"></span>
        ) : null}
        <div className="w-full h-full flex items-center justify-center gap-[15px] max-[1098px]:justify-between">
          <button
            type="button"
            className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1.5 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150"
            onClick={() =>
              appStore.uiStates?.textFilterStates?.setContentType("time")
            }
          >
            <i className="bi bi-clock-fill"></i>
            <span className="inline-block text-nowrap">time</span>
          </button>
          <button
            type="button"
            className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150"
            onClick={() =>
              appStore.uiStates?.textFilterStates?.setContentType("word")
            }
          >
            <svg
              className="w-[14px] h-[14px]"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path
                d="M432 32H16C7.2 32 0 39.2 0 48v32c0 8.8 7.2 16 16 16h176v336h-40c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-40V96h176c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16z"
                stroke="currentColor"
                strokeWidth="30"
              />
            </svg>

            <span className="inline-block text-nowrap">words</span>
          </button>
          <button
            type="button"
            className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150"
            onClick={() =>
              appStore.uiStates?.textFilterStates?.setContentType("quote")
            }
          >
            <svg
              className="w-[14px] h-[14px]"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h40.6c-11.3 26.5-31.2 50.2-56.6 66.1-11.7 7.3-15.3 22.6-7.9 34.3l28.5 45.7c7.3 11.7 22.6 15.3 34.3 7.9C460.7 368.6 512 295.5 512 208V80c0-26.5-21.5-48-48-48zM208 32H80C53.5 32 32 53.5 32 80v128c0 26.5 21.5 48 48 48h40.6c-11.3 26.5-31.2 50.2-56.6 66.1-11.7 7.3-15.3 22.6-7.9 34.3l28.5 45.7c7.3 11.7 22.6 15.3 34.3 7.9C204.7 368.6 256 295.5 256 208V80c0-26.5-21.5-48-48-48z" />
            </svg>
            <span className="inline-block text-nowrap">quotes</span>
          </button>
        </div>
        <span className="w-[5px] min-w-[5px] h-[80%] bg-background-color rounded-4xl inline-block max-[1098px]:hidden"></span>
        <div className="w-full h-full flex items-center justify-between gap-[15px]">
          <AnimatePresence mode="wait">
            {appStore.uiStates?.textFilterStates?.contentType === "time" && (
              <motion.div
                key="time-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeIn", duration: 0.3 }}
                className="w-full h-full flex items-center justify-between gap-[15px] flex-nowrap"
              >
                {[15, 30, 45, 60].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      appStore?.uiStates?.textFilterStates?.setTextTime(label);
                      console.log(label);
                      
                    }}
                    className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150"
                  >
                    {label} s
                  </button>
                ))}
              </motion.div>
            )}

            {appStore.uiStates?.textFilterStates?.contentType === "word" && (
              <motion.div
                key="word-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeIn", duration: 0.3 }}
                className="w-full h-full flex items-center justify-between gap-[15px] flex-nowrap"
              >
                {["10 w", "25 w", "50 w", "100 w"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="h-[80%] text-[14px] font-extralight flex text-nowrap items-center justify-center gap-1 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150"
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}

            {appStore.uiStates?.textFilterStates?.contentType === "quote" && (
              <motion.div
                key="quote-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeIn", duration: 0.3 }}
                className="w-full h-full flex items-center justify-between gap-[15px] flex-nowrap"
              >
                {["short", "medium", "long", "thicc"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="h-[80%] text-[14px] font-extralight flex items-center justify-center gap-1 text-content-light cursor-pointer px-2 hover:text-content transition-all duration-150"
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <button
        type="button"
        className="border items-center justify-center gap-[5px] rounded-[5px] bg-background-light hidden max-[1098px]:flex cursor-pointer text-content-light hover:text-content transition-all duration-150 px-12 py-3 font-bold"
      >
        <i className="bi bi-funnel-fill"></i> <span>Text Filter</span>
      </button>
    </>
  );
}
