import { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Head from 'next/head'
import { useRouter } from 'next/router';
import {Typography, Container, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import UniButton from "../../components/UniButton";
import ProfileBanner from "../../components/ProfileBanner";
import { walletConnect, getCollection, displayGrid } from '../../utility/utils';

const Profile: NextPage = (props: any) => {
    const authz = props.authz
    const router = useRouter()
    const theme = useTheme()
    const { slug } = router.query
    const [collection, setCollection] = useState<any[]>([])

    const fun = async () => {
        setCollection( !slug ? await getCollection(authz.flowAddr) : await getCollection(slug[0]) )
    }
    useEffect(() => {
        fun()
        return () => {
            setCollection([])
        }
    }, []);


    return (
        <Container maxWidth={`lg`}>
            <Head><title>Profile</title></Head>
            <ProfileBanner authz={authz} mobile={props.mobile}/>
            <Box className={`page-box`}>
            <Typography variant={`h4`} color={`primary`}>
                {slug || authz.flowAddr || null}
            </Typography>
            <>{
                !slug || slug == authz.flowAddr
                ?
                    authz.flowAddr
                    ?
                    displayGrid(collection, `owner`)
                    :
                    <UniButton label={`Connect Wallet`} onClick={async () => await walletConnect(authz.flowAddr)}/>
                :
                displayGrid(collection, `profile`)
            }</>
            </Box>
        </Container>
    )
}

export default Profile