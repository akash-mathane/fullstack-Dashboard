import React, { useState } from "react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NotificationsIconMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const notifications = [
    {
      id: 1,
      message: "You have a new message 1",
    },
    {
      id: 2,
      message: "You have a new message 2",
    },
    {
      id: 3,
      message: "You have a new message 3",
    },
  ];

  return (
    <div>
      <NotificationsActiveIcon onClick={handleOpen} />
      <Menu
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id}>{notification.message}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NotificationsIconMenu;
