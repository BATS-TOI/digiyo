import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Tilt from 'react-parallax-tilt';
import { Typography, Box, Container, Card, Stack, Backdrop, Drawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';

interface NavGridProps {
  open: boolean;
  setOpen: any;
  mobile: boolean;
}

export default function NavGrid({ open, setOpen, mobile }: NavGridProps) {
  const router = useRouter()
  const theme = useTheme()
  const variant = mobile ? `h4` : `h3`
  
  return (
    <Drawer sx={{zIndex:99999}} anchor="top" open={open} onClose={() => setOpen(false)}>
      <Container maxWidth={false} disableGutters>
          <Stack direction={`column`}>
              <Stack direction={`row`}>
                  <Card className={`about-card grow`} onClick={() => {setOpen(false); return router.push(`/about`)}}>
                    <Box className={`centered-box`}>
                      <Typography className={`vertical-text`} align={`center`} color={`white`} variant={variant}><InfoOutlinedIcon sx={{color:`white`, fontSize:`3.5rem`, verticalAlign:`middle`}}/>ABOUT</Typography>
                    </Box>
                  </Card>
                  <Card className={`mint-card grow`} onClick={() => {setOpen(false); return router.push(`/mint`)}}>
                    <Typography align={`center`} color={`white`} sx={{mt:`15vh`}} variant={variant}><CloudUploadOutlinedIcon sx={{color:`white`, fontSize:`3.5rem`, ml:`1.5rem`, verticalAlign:`middle`}}/> MINT</Typography>
                  </Card>
              </Stack>
              <Stack direction={`row`}>
                  <Card className={`profile-card grow`} onClick={() => {setOpen(false); return router.push(`/profile`)}}>
                    <Typography align={`center`} color={`white`} sx={{mt:`15vh`}} variant={variant}><AccountCircleOutlinedIcon sx={{color:`white`, fontSize:`3.5rem`, ml:`1.5rem`, verticalAlign:`middle`}}/> PROFILE</Typography>
                  </Card>
                  <Card className={`collectibles-card grow`} onClick={() => {setOpen(false); return router.push(`/`)}}>
                    <Typography align={'center'} color={"black"} sx={{mt:`15vh`}} variant={variant}><StyleOutlinedIcon sx={{color:`black`, fontSize:`3.5rem`, ml:`1.5rem`, verticalAlign:`middle`}}/> COLLECTIBLES</Typography>
                  </Card>
              </Stack>
              <Stack direction={`row`}>
                  <Card className={`scramble-card grow`} onClick={() => {setOpen(false); return router.push(`/scramble`)}}>
                    <Typography align={`center`} color={`white`} sx={{mt:{xs:`12.5vh`, sm:`12.5`}}} variant={variant}><SportsEsportsOutlinedIcon sx={{color:`white`, fontSize:`3.5rem`, ml:`1.5rem`, verticalAlign:`middle`}}/> SCRAMBLE</Typography>
                  </Card>
              </Stack>
          </Stack>
        </Container>
    </Drawer>
  )
}
