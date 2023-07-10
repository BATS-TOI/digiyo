import { useState, useEffect } from "react";
import styled, { keyframes } from 'styled-components';
import { flip } from 'react-animations'
import  {useMediaQuery, Paper, Avatar, Stack, Drawer, Container, Card, Box, Typography, Backdrop } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useTheme } from '@mui/material/styles';
import UniButton from './UniButton';
import { walletConnect } from '../utility/utils'
import { useRouter } from 'next/router';
import NavGrid from './NavGrid';

const flipAnimation = keyframes`${flip}`;
const FlippingDiv = styled.div`
  animation: 5s linear infinite ${flipAnimation};
`;
interface ProfileBannerProps {
    authz: any;
    mobile: boolean;
}
export default function ProfileBanner({ authz, mobile }:ProfileBannerProps) {
    const theme = useTheme()
    const router = useRouter()
    const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: dark)`);
    const variant = mobile ? `h4` : `h3`
    const { slug } = router.query
    console.log(router.asPath)
    console.log(slug)
    const [open, setOpen] = useState(router.asPath === `/` || undefined ? true : false);
    return (
        <>
            <Paper className={`banner-fade`} sx={{ minWidth: `100vw`, width:`100vw`, maxWidth:`100vw`, position: `fixed`, top: 0, left: 0, right: 0, zIndex:9999 }} elevation={0}>
                <Stack direction={`row`} justifyContent={`space-around`} >
                    <Avatar role={`button`} className={`avatar`} src={`/flowgo.svg`} onClick={() => { window.open(`https://onflow.org`, `_blank`); }}/>
                    {   authz.flowAddr
                        ?
                        <FlippingDiv>
                            <Avatar className={`avatar`} src={prefersDarkMode ? `/dark-bg-logo.svg` : `/logo.svg`} onClick={() => setOpen(!open)}/>
                        </FlippingDiv>
                        :
                        <Avatar className={`avatar`} src={prefersDarkMode ? `/dark-bg-logo.svg` : `/logo.svg`} onClick={() => setOpen(!open)}/>
                    }
                    <UniButton
                        icon
                        label={<AccountBalanceWalletIcon fontSize={`large`} />}
                        sx={{ color: authz.flowAddr ? `var(--primary)` : `gray` }}
                        onClick={async () => await walletConnect(authz.flowAddr)}
                    />
                </Stack>
            </Paper>
            <NavGrid open={open} setOpen={setOpen} mobile={mobile}/>
        </>
    )
}
