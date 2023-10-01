import React, { useState } from 'react';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EventIcon from '@mui/icons-material/Event';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import { NavLink } from 'react-router-dom';

  


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<HomeIcon />
        },
        {
          path:"/ManageTeam",
          name:"Manage Team",
          icon:<GroupsIcon />
      },
        {
            path:"/ContactInformation",
            name:"Contact Information",
            icon:<ContactPageIcon />
        },
        {
            path:"/Analysis",
            name:"Analysis",
            icon:<AutoGraphIcon />
        },
        {
            path:"/Events",
            name:"Events",
            icon:<EventIcon />
        },
        {
            path:"/WeatherInfo",
            name:"WeatherInfo",
            icon:<WbSunnyIcon />
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Admin</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                   <HorizontalSplitIcon onClick={toggle}/>  
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;