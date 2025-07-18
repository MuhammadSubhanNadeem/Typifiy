"use client";

import { useAppContext } from "@/store/App_Context";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TypeTextComponent() {
  const appStore = useAppContext();

  const [timer, setTimer] = useState(15);
  const [WPS, setWPS] = useState(0);
  const [writeStatus, setWriteStatus] = useState(false);
  const [words, setWords] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeWord, setActiveWord] = useState(0);
  const [activeLetter, setActiveLetter] = useState(0);
  const [letterStatus, setLetterStatus] = useState([]);
  const [typedLetters, setTypedLetters] = useState([]);
  const [wrongTyped, setWrongTyped] = useState([]);
  const letterStatusRef = useRef([]);
  const lettersRef = useRef([]);
  useEffect(() => {
    console.log(typedLetters);
    console.log(wrongTyped);
  }, [typedLetters, wrongTyped]);
  useEffect(() => {
    setTimer(appStore?.uiStates?.textFilterStates?.textTime);
  }, [appStore?.uiStates?.textFilterStates?.textTime]);
  useEffect(() => {
    console.log("WPS: ", WPS);
  }, [WPS]);
  function startTimer() {
    if (writeStatus) {
      let timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          setWPS(
            () =>
              (typedLetters.length /
                (appStore?.uiStates?.textFilterStates?.textTime - timer)) *
              60
          );
          clearInterval(timerInterval);
          return 0;
        });
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }
  }
  useEffect(() => {
    startTimer();
  }, [writeStatus]);
  useEffect(() => {
    let result = [];
    letterStatus.forEach((eachWord) => {
      if (eachWord.every((each) => each !== null && each === "correct")) {
        result.push("correct");
      } else if (!eachWord.includes(null) && eachWord.includes("wrong")) {
        result.push("wrong");
      }
    });
    setWrongTyped(result);
  }, [typedLetters]);

  useEffect(() => {
    const paragraph = appStore?.uiStates?.textFilterStates?.paragraph || "";
    const split = paragraph.trim().split(" ");
    setWords(split);
    setActiveWord(0);
    setActiveLetter(0);
    const status = split.map((w) => Array(w.length).fill(null));
    setLetterStatus(status);
    letterStatusRef.current = status;
    lettersRef.current = [];
  }, [appStore?.uiStates?.textFilterStates?.paragraph]);

  const lettersRefSetter = (ref, wordIdx, letterIdx) => {
    if (ref) {
      if (!lettersRef.current[wordIdx]) lettersRef.current[wordIdx] = [];
      lettersRef.current[wordIdx][letterIdx] = ref;
    }
  };

  const updateLetterStatus = (wordIdx, letterIdx, value) => {
    const updated = [...letterStatusRef.current];
    updated[wordIdx][letterIdx] = value;
    letterStatusRef.current = updated;
    setLetterStatus(updated);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    const word = words[activeWord];
    const currentLetter = word[activeLetter];

    if (key === "Backspace") {
      if (activeLetter > 0) {
        setActiveLetter((prev) => prev - 1);
        updateLetterStatus(activeWord, activeLetter - 1, null);
      } else if (activeWord > 0) {
        const prevLen = words[activeWord - 1].length;
        setActiveWord((prev) => prev - 1);
        setActiveLetter(prevLen);
        setTypedLetters((prev) => {
          if (prev.length > 0) {
            let updatedArray = [...prev];
            updatedArray.pop();
            return updatedArray;
          }
          return [];
        });
      }
      return;
    }

    if ((key === " " || key === "Enter") && activeLetter >= word.length) {
      if (activeWord < words.length - 1) {
        setActiveWord((prev) => prev + 1);
        setActiveLetter(0);
        setTypedLetters((prev) => [...prev, word]);
      }
      return;
    }

    if (key.length === 1 && activeLetter < word.length) {
      setWriteStatus(true);
      const correct = key === currentLetter ? "correct" : "wrong";
      updateLetterStatus(activeWord, activeLetter, correct);
      setActiveLetter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, activeWord, activeLetter]);

  return (
    <div className="w-full max-h-[320px] border font-sans mt-[75px] flex flex-col items-center justify-center px-[35px] py-[15px]">
      <div className="text-3xl font-orbit mb-2">{timer} s</div>

      <div
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full flex flex-wrap items-center font-roboto text-3xl leading-14 break-words text-content-light select-none outline-none"
      >
        {words.map((eachWord, wordIdx) => (
          <div key={wordIdx} className="mx-1.5 flex">
            {eachWord.split("").map((eachLetter, letterIdx) => (
              <motion.span
                key={letterIdx}
                ref={(ref) => lettersRefSetter(ref, wordIdx, letterIdx)}
                className="relative lowercase outline-none"
                animate={{
                  color:
                    letterStatus[wordIdx]?.[letterIdx] === "correct"
                      ? "#ffffff"
                      : letterStatus[wordIdx]?.[letterIdx] === "wrong"
                      ? "#ff0000"
                      : "#a0a0a0",
                }}
                transition={{ duration: 0.05 }}
              >
                <AnimatePresence mode="wait">
                  {isFocused &&
                    activeWord === wordIdx &&
                    activeLetter === letterIdx && (
                      <motion.div
                        layout
                        layoutId="blinker"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          layout: { duration: 0.15 },
                          opacity: { duration: 0.2 },
                          ease: "linear",
                        }}
                        className="absolute top-[50%] left-0 -translate-y-[50%] w-[3px] h-[36px] bg-content rounded-full animate-blink"
                      />
                    )}
                </AnimatePresence>
                {eachLetter}
              </motion.span>
            ))}

            {isFocused &&
              activeWord === wordIdx &&
              activeLetter === eachWord.length && (
                <motion.span className="relative w-[0px] lowercase inline-block">
                  <motion.div
                    layout
                    layoutId="blinker"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      layout: { duration: 0.15 },
                      opacity: { duration: 0.2 },
                      ease: "linear",
                    }}
                    className="absolute top-[50%] left-0 -translate-y-[50%] w-[3px] h-[36px] bg-content rounded-full animate-blink"
                  />
                </motion.span>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
