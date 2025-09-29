import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function MenuHeader({
  restaurant,
  selectedTab,
  setSelectedTab,
  menuRef,
  isClicked,
}) {
  const tabRef = useRef({});
  const [mounted, setMounted] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setMounted(true)
    }, 50)
  }, [])

  useEffect(() => {
    const activeTab = tabRef.current[selectedTab];
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedTab]);

  const handleClick = (title) => {
    isClicked.current = true;
    setSelectedTab(title);
    const activeSection = menuRef.current[title];
    if (activeSection) {
      activeSection.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      isClicked.current = false;
    }, 800);
  };

  return (
    <header className="sticky top-0 z-10 flex h-[60px] items-center gap-5 bg-gray-100 px-4 shadow-[0px_2px_3px_rgba(0,0,0,0.3)]">
      <div className="rounded-[50%] bg-white p-3 px-4 shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
        <i className="fa-solid fa-magnifying-glass text-[16px] text-gray-500"></i>
      </div>
      <div className="flex h-full items-center gap-3 overflow-x-auto overflow-y-hidden pr-5 whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {restaurant.menu.map((x) => (
          <div
            ref={(e) => (tabRef.current[x.title] = e)}
            onClick={() => handleClick(x.title)}
            className="relative flex h-full min-w-[100px] flex-shrink-0 items-center justify-center px-2 pb-2 text-[16px] font-[400]"
            key={x.title}
          >
            {x.title}
            {x.title === selectedTab ? (
              <motion.div
                layoutId="underline"
                transition={mounted ? {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  bounce: 42,
                } : {duration: 0}}
                className="absolute bottom-0 left-0 h-[4px] w-full rounded-4xl bg-gray-700 shadow-[0px_-2px_3px_rgba(0,0,0,0.3)]"
              ></motion.div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
