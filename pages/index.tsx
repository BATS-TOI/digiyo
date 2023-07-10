import { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
//import { Tabs, TabItem } from '@aws-amplify/ui-react';
import { Typography, TextField, Autocomplete, Stack, Box, Tab, Tabs } from '@mui/material';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import PlaylistAddCircleOutlined from "@mui/icons-material/PlaylistAddCircleOutlined"
import SellIconOutlined from '@mui/icons-material/SellOutlined';
import { useTheme } from '@mui/material/styles';
import TemporaryDrawer from "../components/TemporaryDrawer";
import UniButton from "../components/UniButton";
import ProfileBanner from "../components/ProfileBanner";
import ImageGrid from "../components/ImageGrid";
import { getUsers, getMints, getListings, getRecentSales, displayGrid } from '../utility/utils.js';
import { Container } from "@mui/system";

const fadeInAnimation = keyframes`${fadeIn}`;
const FadingDiv = styled.div`animation: 2s ${fadeInAnimation};`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Home: NextPage = (props: any) => {
  const authz = props?.authz;
  const router = useRouter()
  const theme = useTheme()
  const [users, setUsers] = useState<any[]>([])
  const [dailyDrops, setDailyDrops] = useState<any[]> ([])
  const [listings, setListings] = useState<any[]>([])
  const [recentSales, setRecentSales] = useState<any[]>([])
  const [tab, setTab] = useState<number>(0)
  const [drawerState, setDrawerState] = useState<boolean>(false)
  const [observed, setObserved] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  const fun = async () => {
    if (!users.length) { setUsers(await getUsers()) }
    if (!dailyDrops.length) { setDailyDrops(await getMints()) }
    if (!listings.length) { setListings(await getListings()) }
    if (!recentSales.length) { setRecentSales(await getRecentSales()) }
  }
  console.log({users, dailyDrops, listings, recentSales})
  useEffect(() => {
    fun()
    return () => {
      setUsers([])
      setDailyDrops([])
      setListings([])
      setRecentSales([])
      setObserved(null)
      setShow(false)
    }
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <Head><title>digiYo</title></Head>
      
      <TemporaryDrawer anchor={"left"} open={drawerState} onClose={() => setDrawerState(false)} users={users} />
      
      <ProfileBanner authz={authz} mobile={props.mobile}/>
      <Box className={`page-box`}>
        <Typography variant={`h3`} gutterBottom>MARKETPLACE</Typography>
        <UniButton label={"Filters"} onClick={() => setDrawerState(true)}/>
        <Autocomplete
          disablePortal
          id={`users-autocomplete`}
          options={users.map(i => i.name)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Find Users" />}
          onChange={(e, v) => router.push(`/profile/${v}`)}
        />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label={<CalendarMonthOutlined fontSize={`large`}/>} />
            <Tab label={<PlaylistAddCircleOutlined fontSize={`large`}/>} />
            <Tab label={<SellIconOutlined fontSize={`large`} />} />
          </Tabs>
        </Box>
          <TabPanel value={tab} index={0}>
            <Stack direction={`column`}>
              <FadingDiv>
                <Typography align={`center`} color={`primary`} variant={`h4`}>Daily Drops</Typography>
              </FadingDiv>
              {displayGrid(dailyDrops, `dailyDrops`, props?.mobile)}
            </Stack>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Stack direction={`column`}>
              <FadingDiv>
                <Typography align={`center`} color={`primary`} variant={`h4`}>Active Listings</Typography>
              </FadingDiv>
              {displayGrid(listings, `listings`, props?.mobile)}
            </Stack>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Stack direction={`column`}>
              <FadingDiv>
                <Typography align={`center`} color={`primary`} variant={`h4`}>Recent Sales</Typography>
              </FadingDiv>
              {displayGrid(recentSales, `recentSales`, props?.mobile)}
            </Stack>
          </TabPanel>
      </Box>
    </Container>
  )
}


export default Home