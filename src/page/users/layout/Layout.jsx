
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { destroyToken } from "../../../utils/axiosRequest";
import {
  Avatar,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Box } from "@mui/system";

const settings = ["Profile", "Log out"];
const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <div className="navbar pt-[15px]">
        <Container maxWidth="xlg">
          <div className="flex justify-around w-[90%] m-auto  ">
            <div className="pt-[4px]">
              <Link to={"/dashboard"}>
              <img src={logo} alt="" />
              </Link>
            </div>
            <div className="flex gap-[30px] pt-[10px]">
              <div>
                <Link to={"/dashboard/users"}>
                  <h1 className="text-[18px] text-[black] hover:text-[#FEB302] font-[600] pt-[6px]">
                    <GroupIcon />
                    &nbsp;Users
                  </h1>
                </Link>
              </div>
              <div>
                <Link to={"/dashboard/category"}>
                  <h1 className="text-[18px] text-[black] hover:text-[#FEB302] font-[600] pt-[6px]">
                    <CategoryIcon />
                    &nbsp;Category
                  </h1>
                </Link>
              </div>
              <div>
                <Link to={"/dashboard/product"}>
                  <h1 className="text-[18px] text-[black] hover:text-[#FEB302] font-[600] pt-[6px]">
                    <ProductionQuantityLimitsIcon />
                    &nbsp;Product
                  </h1>
                </Link>
              </div>
              <div>
                <Link to={"/dashboard/order"}>
                  <h1 className="text-[18px] text-[black] hover:text-[#FEB302] font-[600] pt-[6px]">
                    <BookmarkBorderIcon />
                    Order
                  </h1>
                </Link>
              </div>
            </div>
            <div className="flex gap-[20px] pt-[10px]">
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://avatars.githubusercontent.com/u/24698301?v=4"
                      
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    if (setting === "Log out") {
                      return (
                        <MenuItem key={setting} onClick={()=>{
                          setLogoutModal(true)
                          handleCloseUserMenu()
                        }}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    }
                    return (
                      <MenuItem key={setting} onClick={()=>{
                        handleCloseUserMenu()
                        navigate("/profile")
                      }}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
            </Box>
            </div>
          </div>
        </Container>
        {
          logoutModal && 
          <Dialog  open = {()=>setLogoutModal(true)} onClose = {()=>setLogoutModal(false)}>
            <DialogTitle variant="primary">Exit</DialogTitle>
            <DialogContent>Are you sure you want to exit from account?</DialogContent>
            <DialogActions>
                <Button sx={{fontWeight:600}} color="error" onClick={()=>setLogoutModal(false)}>NO</Button>
                <Button sx={{fontWeight:600}} color={"success"} onClick={()=>{
                  destroyToken()
                  navigate("/")
                }}>YES</Button>
            </DialogActions>
        </Dialog>
        }
      </div>
      <Outlet/>
    </div>
  );
};
export default Layout;
