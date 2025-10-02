"use client";

import { useEffect, useState } from "react";
import InterviewSettingBox from "./components/InterviewSettingBox";
import TopNav from "./components/TopNav";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import InterviewSettingModal from "./components/InterviewSettingModal";

const Page = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ✅ 브라우저에서만 true
  }, []);

  const portal =
    mounted &&
    ReactDOM.createPortal(
      <AnimatePresence>
        {isModal && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black z-[9]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModal(false)}
            />
            <motion.div
              key="panel"
              className="fixed top-1/2 left-1/2 
    -translate-x-1/2 -translate-y-1/2
    bg-white rounded-2xl shadow-xl
    w-[80%] sm:w-full h-[17rem] max-w-md
    z-[10]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <InterviewSettingModal setIsModal={setIsModal} />
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    );
  return (
    <div className="flex flex-col items-center justify-start gap-5 min-h-screen w-full">
      <TopNav />
      <div className="w-[100%] sm:w-[70%] mt-3 p-3 sm:p-0">
        <InterviewSettingBox setIsModal={setIsModal} />
        {portal}
      </div>
    </div>
  );
};

export default Page;
