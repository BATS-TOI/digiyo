import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head'
import { Container, Typography, Box, Stack, Badge } from '@mui/material';
import { useRouter } from 'next/router';
import ProfileBanner from "../components/ProfileBanner";

const About: NextPage = (props: any) => {
  const authz = props.authz
  const router = useRouter()
  const { slug } = router.query

  return (
    <Container maxWidth={`lg`}>
      <Head><title>About</title></Head>
      <ProfileBanner authz={authz} mobile={props.mobile}/>
      <Box sx={{ marginBottom: 10, marginTop:5, display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center` }}>
        <Typography>{slug}</Typography>
        <Typography>{slug}</Typography>
      </Box>
    </Container>
  );
};

export default About;
