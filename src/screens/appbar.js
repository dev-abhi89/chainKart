import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import { StorefrontSharp } from '@mui/icons-material';
import { userContext } from '../services/AddressProvider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const CKAppbar = ({back=null,isbuyer=true}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {Address} = React.useContext(userContext);
  const pages = isbuyer && back?[{name:"Switch to seller",url:"/SellerHome"}] :isbuyer?[{name:"Switch to seller",url:"/SellerHome"},{name:"Purchase history",url:"/purchaseHistory"}]:[{name:"Switch to buyer",url:"/"} ];


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {back?<Link to={back} style={{backgroundColor:'transparent',color:"white"}}  color={'#fff'}><ArrowBackIosNewIcon /></Link>
            :<StorefrontSharp sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
            //   letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ChainKart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name}>
            <Link to={page.url}  style={{backgroundColor:'transparent',color:"black",textDecoration:'none',fontSize:14,fontWeight:'bold'}}  color={'#fff'}>{page.name}</Link></MenuItem>
              ))}
            </Menu>
          </Box>
          <StorefrontSharp sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ChainKart
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                      <Button style={{marginRight:10,marginLeft:10,justifyContent:'flex-start'}}  variant='outlined' color="inherit"><Link to={page.url}  style={{backgroundColor:'transparent',color:"white",textDecoration:'none',fontSize:14,fontWeight:'bold'}}  color={'#fff'}>{page.name}</Link></Button>

            ))}
          </Box>

          <Box   sx={{ flexGrow: 0,display: { xs: 'none', lg: 'flex',md:'none' }, }}>
            <Tooltip title="Open settings">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,justifyContent:'flex-end',textAlign:'right' }}>
            Wellcome {Address.toString()}
          </Typography>
            </Tooltip>
        
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default CKAppbar;
