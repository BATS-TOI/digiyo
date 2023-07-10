import { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Card, Container, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FixedImage from "../../components/FixedImage";
import ProfileBanner from "../../components/ProfileBanner";
import { getMints, displayGrid } from '../../utility/utils';
import CircularLoader from "../../components/CircularLoader";

const Assets: NextPage = (props: any) => {
    const authz = props.authz
    const router = useRouter()
    const theme = useTheme()
    const { slug } = router.query
    const [assets, setAssets] = useState<any[]>([])
    const [asset, setAsset] = useState<any>(null)
    
    const fun = async (single: boolean) => {
        if (single) {
            const a = await getMints({CID : { eq : slug![0] }})
            setAssets(a)
            setAsset(a[0])
        } else {
            setAssets(await getMints())
        }
        
    }

    useEffect(() => {
        if (slug) {
            if (!asset) {
                fun(true)
            }
        } else {
            if (!assets) {
                fun(false)
            }
        }
        
        return () => {
            setAsset(null)
            setAssets([])
        }
    }, []);

    return (
        <Container maxWidth={`lg`}>
            <Head><title>Assets</title></Head>
            <ProfileBanner authz={authz} mobile={props.mobile}/>
                <Stack direction={`column`}>
                    <>{
                        slug
                    ?
                        (
                            asset
                        ?
                            <Card variant={`outlined`} sx={{padding: 5, backgroundColor:theme.palette.background.paper}} onClick={() => console.log(asset)}>
                                <FixedImage modal size={`75vw`} url={asset.url} alt={asset.metadata.name} type={asset.metadata.mediaType} />
                            </Card>
                        :
                            <CircularLoader />
                        )
                    :
                        displayGrid(assets, `assets`)
                    }</>
                </Stack>
        </Container>
    )
}


export default Assets