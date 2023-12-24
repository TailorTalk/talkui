import { HomeRounded, SpaceDashboardRounded } from '@mui/icons-material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/logo.svg";

const navLinks = [
  {
    name: 'Home',
    route: '/assets',
    icon: <HomeRounded sx={{ fontSize: '28px' }} />
  },
  {
    name: 'Dashboard',
    // add font size
    route: 'dashboard',
    icon: <SpaceDashboardRounded sx={{ fontSize: '28px' }} />
  }
]

const SidePanel = () => {

  const [openSidePanel, setOpenSidePanel] = useState(true);
  return (
    <div
      className={`py-4 bg-gray-50 border-r-[1px] overflow-y-scroll scrollbar-hidden h-screen transition-all duration-500 ${openSidePanel ? "w-[250px] px-8 max-xl:w-[230px] max-xl:px-4" : "w-[80px] px-2 max-xl:w-[70px]"
        }`}
      onClick={(event) => {
        setOpenSidePanel((prev) => !prev);
      }}

    >
      <div
        className={`flex gap-2 items-center w-full justify-center  ${openSidePanel ? 'px-4' : 'justify-center '} `}
      >
        <img
          src={Logo}
          alt=""
          className="relative flex-shrink-0 w-[46px] max-2xl:w-[46px] max-w-none mt-1 "
          
        />

        <span className={`text-xl font-semibold text-black font-[Comfortaa] whitespace-nowrap ${openSidePanel ? 'block' : "hidden"} `}>Tailor Talk</span>

      </div>

      <ul className="flex flex-col gap-4 justify-center items-center max-sm:gap-4 py-8  ">
        {navLinks.map((navObject, index) => {
          return <li key={index} className="w-full" onClick={(e) => { e.stopPropagation() }}>
            <NavLink
              to={navObject.route}
              className={({ isActive }) => (isActive ? "active" : 'text-tailorGrey-500')}
              end
            >
              <div
                className={`py-2  ${openSidePanel ? 'px-4' : 'justify-center '} flex gap-2 items-center w-full `}
              >
                {navObject.icon}
                <span 
                // add font size
                style={{ fontSize: 18 }}
                className={`text-xl  ${openSidePanel ? 'block' : "hidden"}  `}>
                  {navObject.name}
                </span>

              </div>
            </NavLink>
          </li>
        })}

      </ul>
    </div>
  )
}

export default SidePanel