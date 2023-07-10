import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery, ImageList, ImageListItem, Typography, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import FixedImage from './FixedImage'
import GridModal from './GridModal';
import CircularLoader from './CircularLoader'
import Tilt from 'react-parallax-tilt'


interface NftGridProps {
  itemData: any;
  mobile: boolean;
  mode: string;
}


export default function NftGrid({ itemData, mobile, mode }:NftGridProps) {
  const router = useRouter()
  const theme = useTheme()
  const [showModal, setShowModal] = useState(false)
  const [phenomenon, setPhenomenon] = useState(null)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const popModal = (item: any) => {
    setShowModal(true)
    setPhenomenon(item)
  }

  if (itemData.length == 0) {
    return (
      <CircularLoader/>
    )
  } else if (showModal) {
    return (
      <GridModal open={showModal} handleClose={() => setShowModal(false)} item={phenomenon} mode={mode}/>
    )
  } else {
    if (mode == "dailyDrops") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => popModal(item)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "listings") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => popModal(item)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "recentSales") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => popModal(item)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "collectors") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => router.push(`/collectors/${item.collectionName.toLowerCase().split(' ').join('-')}`)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                  <FixedImage size={"30vw"} url={`/${item.collectionName.toLowerCase().split(' ').join('-')}/logo.svg`} alt={item.collectionName.toLowerCase().split(' ').join('-')} type={`image`}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "collectorsView") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => router.push(`/collectors/${item.collectionName.toLowerCase().split(' ').join('-')}`)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={`https://digiyo.mypinata.cloud/ipfs/QmW8dCqG2nYS2pGGumPUWjXdcJFBa7zdHFidJXivtCSYot`} alt={`nothing`} type={`video`}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "assets") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => router.push(`/assets/${item.CID}`)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "profile") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => popModal(item)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "owner") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => popModal(item)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else if (mode == "trade") {
      return (
        <Grid container columns={{xs:2, sm:3}} sx={{my:0}} minWidth={"100vw"} maxWidth={"100vw"} padding={"0 0vw 0 0vw"} >
          {itemData.map((item: any, index: number) => (
            item.url
            ?
            <Grid key={`grid_item_${index}`} sx={{mx:{xs: `2.5vw`, sm: '1.66vw'}}}>
              <Tilt key={`grid_tilt_${index}`} glareEnable={true} glareBorderRadius={`${0}`} glarePosition={'all'}>
                <Card key={`grid_card_${index}`} onClick={() => popModal(item)} sx={{my:1.25}}>
                  <FixedImage size={mobile ? `45vw`: `30vw`} url={item.url} alt={item.metadata.name} type={item.metadata.mediaType}/>
                </Card>
              </Tilt>
            </Grid>
            :
            <CircularLoader />
          ))}
        </Grid>
      )
    } else {
      return(
        <CircularLoader />
      )
    }
    
  }
}
 