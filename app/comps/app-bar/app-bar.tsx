"use client";
import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../toggle-color-mode/toggle-color-mode';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import SearchInput from '@abhang/components/serach/search-input';
import ApplicationSearchModel from '@abhang/components/serach/application-search-model';
import SearchIcon from '@mui/icons-material/Search';
import ImageWithLoader from '../loading/image-loader';

interface AppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function TopAppBar({ mode, toggleColorMode }: AppBarProps) {
  const [open, setOpen] = useState(false);
  const [openSerchModel, setOpenSerchModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  }

  const onSearchQueryChange = (value: string) => {
    setSearchQuery(value);
    if (value !== "") {
      setOpenSerchModel(true);
    }

  }

  const mobileMenuItemClick=()=>{
      toggleDrawer(false);
      scrollToSection('abhang-box');
  }
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Link href='/' title='Abhang' style={{ marginTop: '10px', marginLeft: '40px' }}>
                <ImageWithLoader 
                  alt="abhangvani.com"
                  src="/assets/images/logo.svg"
                  width={140}
                  height={70}
                  style={{ color: 'transparent', width: '140px', height: 'auto' }} title={''}                  />
              </Link>
              <Box sx={{display: { sm: '', md: 'none'}}}>
              <Button
                      onClick={()=>setOpenSerchModel(true)}  
                      color="primary"
                      variant="outlined" 
                      sx={{ width: '100%',
                            border: 'none',
                            backgroundColor:'transparent',
                            borderColor:'transparent'
                       }}
                    >
                <SearchIcon />
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link href={'/sant'} style={{ textDecoration: 'none' }}>
                  <MenuItem
                    sx={{ py: '6px', px: '12px' }}
                    onClick={() => scrollToSection('abhang-box')}
                  >
                    <Typography variant="body2" color="text.primary">
                      संत
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href='/abhangs' style={{ textDecoration: 'none' }}>
                  <MenuItem
                    sx={{ py: '6px', px: '12px' }}
                    onClick={() => scrollToSection('abhang-box')}
                  >
                    <Typography variant="body2" color="text.primary">
                      अभंग
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href={'/articals/aratis'} style={{ textDecoration: 'none' }}>
                  <MenuItem
                    sx={{ py: '6px', px: '12px' }}
                    onClick={() => scrollToSection('abhang-box')}
                  >
                    <Typography variant="body2" color="text.primary">
                      आरती
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href={'/articals/grnth'} style={{ textDecoration: 'none' }}>
                  <MenuItem
                    sx={{ py: '6px', px: '12px' }}
                    onClick={() => scrollToSection('abhang-box')}
                  >
                    <Typography variant="body2" color="text.primary">
                      ग्रंथ
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href={'/articals/kadambari'} style={{ textDecoration: 'none' }}>
                  <MenuItem
                    sx={{ py: '6px', px: '12px' }}
                    onClick={() => scrollToSection('abhang-box')}
                  >
                    <Typography variant="body2" color="text.primary">
                      कादंबरी
                    </Typography>
                  </MenuItem>
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <SearchInput query={searchQuery} setQuery={onSearchQueryChange} />
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <Link href='/sant' style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={mobileMenuItemClick}>
                      संत
                    </MenuItem>
                  </Link>
                  <Link href='/abhangs' style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={mobileMenuItemClick}>
                      अभंग
                    </MenuItem>
                  </Link>
                  <Link href='/articals/aratis' style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={mobileMenuItemClick}>
                      आरती
                    </MenuItem>
                  </Link>
                  <Link href='/articals/grnth' style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={mobileMenuItemClick} >
                      ग्रंथ
                    </MenuItem>
                  </Link>
                  <Link href='/articals/kadambari' style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={mobileMenuItemClick}>
                      कादंबरी
                    </MenuItem>
                  </Link>
                  <SearchInput query={searchQuery} setQuery={onSearchQueryChange} />
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ApplicationSearchModel openSerchModel={openSerchModel} setOpenSerchModel={setOpenSerchModel} serachQuery={searchQuery} setSearchQuery={clearSearchQuery} />
    </div>
  );
}
