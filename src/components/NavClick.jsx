import { motion } from "motion/react"

import { NavLink, useLocation } from "react-router-dom"

export default function NavClick({icon, name, to}) {
  const location = useLocation()

  return (
    <NavLink
            className={({ isActive }) => (isActive ? "text-gray-800 text-[14px]" : "text-gray-600 text-[14px]") }
            to={to}
          >
            {icon} {name}
            {location.pathname === to ? (
              <motion.div
                layoutId="underline"
                className="mt-2 h-[4px] w-[65px] rounded-md bg-gray-700"
              ></motion.div>
            ) : (
              ""
            )}
          </NavLink>
  )
}
