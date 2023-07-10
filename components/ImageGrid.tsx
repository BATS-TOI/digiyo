import { useState } from 'react';
import { useRouter } from 'next/router';
import {useWindowSize} from 'react-use'
import { useMediaQuery, Card, Typography, Stack, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import GridModal from './GridModal';
import FixedImage from './FixedImage'
import CircularLoader from './CircularLoader'
import Tilt from 'react-parallax-tilt'

interface ImageGridProps {
  itemData: any;
  mobile: boolean;
  mode: string;
}

export default function ImageGrid({ itemData, mobile, mode }:ImageGridProps) {
  const router = useRouter()
  const theme = useTheme()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [phenomenon, setPhenomenon] = useState<any>(null)
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
  }
}