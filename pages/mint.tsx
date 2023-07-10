import { useState, useEffect, useRef, forwardRef } from "react";
import type { NextPage } from 'next';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Image } from '@aws-amplify/ui-react';
import {
  TextField,
  Stack,
  Box,
  Container,
  Snackbar,
  AlertTitle,
  FormGroup,
  FormControlLabel,
  Switch,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  LinearProgress
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';
import ProfileBanner from "../components/ProfileBanner";
import ScarcitySlider from "../components/ScarcitySlider";
import ConfettiRain from "../components/ConfettiRain";
import UniButton from "../components/UniButton";
import { mint, delay } from '../utility/utils'
import { Form } from 'react-bootstrap'
import FixedImage from "../components/FixedImage";

const Alert = forwardRef(function Alert(props:any, ref:any) {
  return <MuiAlert elevation={6} ref={ref} variant={`filled`} {...props} />;
});

const TradeInToolTip = () => {
  return (
    <Tooltip
      title={
        <Typography>
          Setting a trade-in value allows the minter to tie real-world utility to their NFT.
          <br/>
          * All representations and warranties are expressly those of the minter *
        </Typography>
      }
    >
      <IconButton>
        <Typography>Attach Perk</Typography>
        <HelpOutlineIcon color={`primary`} />
      </IconButton>
    </Tooltip>
  );
}


const Mint: NextPage = (props: any) => {
  const router = useRouter()
  const theme = useTheme()
  const [imgSrc, setImgSrc] = useState<string>(`/logo.svg`)
  const [review, setReview] = useState<boolean>(false)
  const [rain, setRain] = useState<boolean>(false)
  const [pieces, setPieces] = useState<number>(500)
  const [offset, setOffset] = useState<number>(500)
  const [snack, setSnack] = useState<boolean>(false)
  const [title, setTitle] = useState<null | string>(null);
  const [description, setDescription] = useState<null | string>(null);
  const [redemption, setRedemption] = useState<string>(``)
  const [toggleRedemption, setToggleRedemption] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(5);
  const [color1, setColor1] = useState<string>(theme.palette.primary.main)
  const [color2, setColor2] = useState<string>(`#000000`)
  const [color3, setColor3] = useState<string>(`#FFFFFF`)
  const [file, setFile] = useState<any>(null);
  const inputRef: any = useRef()

  const successSnack = () => {
    return (
      <Snackbar sx={{zIndex:99999}} anchorOrigin={{ vertical:`top`, horizontal:`center` }} open={snack} onClose={() => setSnack(false)} key={`digiYo`} >
        <Alert sx={{backgroundColor:theme.palette.background.paper}}>
          <AlertTitle>Minting in Progress</AlertTitle>
          <LinearProgress />
        </Alert>
      </Snackbar>
    )
  }

  const confettiBomb = async () => {
    setReview(false)
    setOffset(file ? document.getElementById(`mintButton`)!.offsetTop : 500)
    setPieces(500)
    setRain(rain ? false : true)
    setSnack(true)
    await delay(1000)
    setPieces(0)
    await delay(3000)
    setRain(false)
    router.push(`/profile`)
  }

  const callMint = async () => await mint(file, props.authz.flowAddr, title, description, redemption, quantity, confettiBomb)

  const reviewModal = () => {
    const fullScreen = useMediaQuery(theme.breakpoints.down(`md`));
    const mt = fullScreen ? `3rem` : 0
    return (
      <Dialog
        fullScreen={fullScreen}
        open={review}
        onClose={() => setReview(false)}
        aria-labelledby={`dialog`}
      >
        <DialogTitle sx={{justifyContent:`space-between`,backgroundColor:theme.palette.background.default, borderColor:theme.palette.primary.main, marginTop:mt}} id={`dialog-title`}>
          <Stack>
            <Typography margin={`auto`} variant={`h6`}>{title}</Typography>
          </Stack>
        </DialogTitle>
        
        <DialogContent sx={{backgroundColor:theme.palette.background.paper}}>
          {file?.type.split(`/`)[0] == `video`
          ?
          <FixedImage size={`30rem`} url={URL.createObjectURL(file)} alt={title ? title : ``} type={`video`}/>
          :
          <Image
            src={imgSrc}
            alt={title ? title : ``}
            width={`95vw`}
            height={`auto`}
            objectFit={`cover`}
            objectPosition={`50% 50%`}
          />}
          <Stack direction={`column`}>
            <Typography sx={{maxWidth:`100%`}} >Description: {description}</Typography>
            {redemption ? <Typography sx={{maxWidth:`100%`}} >Perk: {redemption}</Typography> : null}
            <Typography sx={{maxWidth:`100%`}}>Quantity: {quantity}</Typography>
            
          </Stack>
        </DialogContent>
        <DialogActions sx={{justifyContent:`space-around`, backgroundColor:theme.palette.background.paper}}>
          <Stack >
            <UniButton label={`Mint`} onClick={callMint}/>
          </Stack>
        </DialogActions>
      </Dialog>
    )
  }
  
  const uploadFileButton = (canvas=true) => {
    if (canvas) {
      return (
          <Box id={`content-upload-inner-stack-canvas-true`} sx={{ my:`50vh`, mx: `50%` }} className={`centered-box`}>
            <input
              id={`content-upload`}
              type={`file`}
              accept={`image/* video/*`}
              onChange={(e: any) => setFile(e.currentTarget.files[0])}
              ref={inputRef}
              hidden
            />
            <label htmlFor={`content-upload`}>
              <IconButton color={`primary`} component={`span`}>
                <PhotoCamera sx={{ color: theme.palette.primary.main }} fontSize={`large`} />
              </IconButton>
            </label>
          </Box>
      )
    } else {
      return (
        <Stack id={`content-upload-stack-canvas-false`}>
          <input
            id={`content-upload`}
            type={`file`}
            accept={`image/* video/*`}
            onChange={(e: any) => setFile(e.currentTarget.files[0])}
            ref={inputRef}
            hidden
          />
          <label htmlFor={`content-upload`}>
            <IconButton color={`primary`} component={`span`}>
              <PhotoCamera sx={{ color: theme.palette.primary.main }} fontSize={`large`} />
            </IconButton>
          </label>
        </Stack>
      )
    }
    
  }
  
  const imageCanvas = () => {
    return (
      file.type.split(`/`)[0] == `video`
      ?
      <video controls src={URL.createObjectURL(file)} style={{borderRadius:`5px`,width:`30rem`, maxWidth:`95vw`}}/>
      :
      <Box id={`target-canvas`} sx={{borderRadius:`5px`,width: `fit-content`, border:`3px solid ${color1}`, background:`${color2}`}}>
        <Box sx={{borderRadius:`5px`,width: `fit-content`, border:`3px solid ${color2}`}}>
          <Box sx={{borderRadius:`5px`,width: `fit-content`, border:`3px solid ${color3}`, background:`${color3}`}}>
            <img src={imgSrc} style={{borderRadius:`5px`,width:`30rem`, maxWidth:`95vw`}}/>
          </Box>
        </Box>
      </Box>
    )
  }
  const entryStack = () => {
    return (
      <Stack id={`outer-entry-stack`} direction={`column`} spacing={2}>
        <Stack id={`inner-entry-stack`} direction={`row`} justifyContent={`space-around`} spacing={5}>
            {uploadFileButton(false)}
            <Form.Control
              style={{ marginTop: `auto`, marginBottom: `auto` }}
              type={`color`}
              id={`primaryColorInput`}
              defaultValue={theme.palette.primary.main}
              onChange={e => setColor1(e.currentTarget.value)}
            />
            <Form.Control
              style={{ marginTop: `auto`, marginBottom: `auto` }}
              type={`color`}
              id={`secondaryColorInput`}
              defaultValue={`#000000`}
              onChange={e => setColor2(e.currentTarget.value)}
            />
            <Form.Control
              style={{ marginTop: `auto`, marginBottom: `auto` }}
              type={`color`}
              id={`tertiaryColorInput`}
              defaultValue={`#FFFFFF`}
              onChange={e => setColor3(e.currentTarget.value)}
            />
          </Stack>
          <TextField fullWidth color={`primary`} required label={`Title`} variant={`outlined`} inputProps={{ maxLength: 32 }}
            onChange={(e) => { setTitle(e.target.value) }}
          />
            <TextField fullWidth multiline color={`primary`} required label={`Description`} variant={`outlined`} inputProps={{ maxLength: 256 }}
              onChange={(e) => { setDescription(e.target.value) }}
            />
          <Stack direction={`column`}>
            <Stack direction={`row`}>
                <FormGroup>
                  <FormControlLabel control={<Switch onChange={(e, v) => setToggleRedemption(v)} />} label={<TradeInToolTip/>} />
                </FormGroup>
            </Stack>
            {
              toggleRedemption
              ?
              <TextField fullWidth multiline color={`primary`} required label={`Perk`} variant={`outlined`} inputProps={{ maxLength: 256 }}
                onChange={(e) => { setRedemption(e.target.value) }}
              />
              :
              null
            }
          </Stack>
          <ScarcitySlider label={`Quantity`} onChange={setQuantity} defaultValue={5} min={1} max={10} step={1} />
          <UniButton
            id={`mintButton`}
            label={`REVIEW`}
            sx={{marginBottom:`5rem`, marginLeft:`auto`, marginRight:`auto`}}
            onClick={() => setReview(true)}
          />
      </Stack>
    )
  }
  
  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e: any) { setImgSrc(e.target.result) }
      reader.readAsDataURL(file)
    }
  });
  
  return (
      <Container maxWidth={`lg`}>
        <Head><title>Mint</title></Head>
        <ProfileBanner authz={props.authz}  mobile={props.mobile}/>
        {reviewModal()}
        <ConfettiRain rain={rain} numberOfPieces={pieces} Y={offset} />
        <Box className={`page-box`}>
          <Typography variant={`h4`} sx={{textAlign:`center`, marginBottom:`2rem`}}>MINT</Typography>
          {successSnack()}
          {file ? imageCanvas() : uploadFileButton()}
          {file ? entryStack() : null}
        </Box>
      </Container>
  )
}


export default Mint

  /*
      <Stack id={`target-canvas`} sx={{borderRadius:`5px`,width: `fit-content`, border:`3px solid ${color1}`, background:`${color2}`}}>
        <Stack sx={{borderRadius:`5px`,width: `fit-content`, border:`3px solid ${color2}`}}>
          <Stack sx={{borderRadius:`5px`,width: `fit-content`, border:`3px solid ${color3}`, background:`${color3}`}}>
            <img src={imgSrc} style={{borderRadius:`5px`,width:`30rem`, maxWidth:`95vw`}}/>
          </Stack>
        </Stack>
      </Stack>
  */