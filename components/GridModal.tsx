import { useState } from 'react';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close'
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import { TextField, Typography, Chip, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import ScarcitySlider from "./ScarcitySlider";
import FixedImage from './FixedImage'
import UniButton from './UniButton'
import { postForSale, removeStorefrontListings, buyItem, transferNFTs } from '../utility/utils'


const parseObj = (item: any, mode: string) => {
    if (mode == "dailyDrops") {
        return item
    } else if (mode == "listings") {
        return item
    } else if (mode == "recentSales") {
        return item
    } else if (mode == "collectors") {
        return item
    } else if (mode == "assets") {
        return item
    } else if (mode == "profile") {
        return item
    } else if (mode == "owner") {
        return item
    } else {
        return null
    }
}

const closeModal = (setSaleMode: any, setQuantity: any, setChosenItem: any, setPrice: any, handleClose: any) => {
    setSaleMode(false)
    setQuantity(1)
    setChosenItem(null)
    setPrice(0.0)
    handleClose()
}

interface GridModalProps {
    open: boolean;
    handleClose: any;
    item: any;
    mode: string;
}

export default function GridModal({ open, handleClose, item, mode }:GridModalProps) {
    const [saleMode, setSaleMode] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const [chosenItem, setChosenItem] = useState<any>(null)
    const [price, setPrice] = useState<number>(0.0)
    const obj = parseObj(item, mode)
    const router = useRouter()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const topMargin = fullScreen ? '3rem' : 0

    const titleStyle = {
        backgroundColor: theme.palette.background.default,
        borderColor: theme.palette.primary.main,
        marginTop: fullScreen ? '3rem' : 0
    }

    const contentStyle = {
        backgroundColor:theme.palette.background.paper
    }

    const actionStyle = {
        backgroundColor:theme.palette.background.paper
    }

    const chipStyle = {
        border:`1px solid ${theme.palette.primary.main}`
    }

    if (!obj) {
        return null
    } else if (mode == "dailyDrops") {
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={() => {setSaleMode(false); setChosenItem(null); handleClose();}}>
                <DialogTitle sx={titleStyle} id="responsive-dialog-title">{`${obj.metadata.name} by ${obj.metadata.minter}`}</DialogTitle>
                <DialogContent sx={contentStyle}>
                    <FixedImage size={`95%`} url={obj.url} alt={obj.metadata.name} type={obj.metadata.mediaType} modal/>
                    <Stack direction={"column"}>
                        <Typography>Description: {obj.metadata ? obj.metadata.description : null}</Typography>
                        <Typography>Quantity Minted: {obj.instances.length}</Typography>
                        <Typography>Redemption: {obj.metadata.redemption}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={actionStyle}>
                    <Stack direction={`row`} spacing={2}>
                        <UniButton label={`View Asset`} onClick={() => router.push(`/assets/${obj.metadata.CID}`)}/>
                        <UniButton label={`Visit Minter Profile`} onClick={() => router.push(`/profile/${obj.metadata.minter}`)} />
                        <UniButton icon={true} label={<CloseIcon />} onClick={() => {setSaleMode(false); setChosenItem(null); handleClose();}} />
                    </Stack>
                </DialogActions>
            </Dialog>
        );
    } else if (mode == "listings") {
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={() => {setSaleMode(false); setChosenItem(null); handleClose();}}>
                <DialogTitle sx={titleStyle} id="responsive-dialog-title">{`${obj.metadata.name} by ${obj.metadata.minter}`}</DialogTitle>
                <DialogContent sx={contentStyle}>
                    <FixedImage size={`95%`} url={obj.url} alt={obj.metadata.name} type={obj.metadata.mediaType} modal/>
                    <Stack direction={"column"}>
                        <Typography>Description: {obj.metadata ? obj.metadata.description : null}</Typography>
                        <Typography>ID: {obj.metadata.id}</Typography>
                        <Typography>Seller: {obj.listingInfo.seller}</Typography>
                        <Typography>Price: {obj.listingInfo.price}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={actionStyle}>
                    <Stack direction={`row`} spacing={2}>
                        <UniButton label={`View Asset`} onClick={() => router.push(`/assets/${obj.metadata.CID}`)} />
                        <UniButton label={`Visit Minter Profile`} onClick={() => router.push(`/profile/${obj.metadata.minter}`)} />
                        <UniButton label={`Buy`} onClick={() => buyItem(obj.listingInfo.storefrontID, obj.listingInfo.seller, obj.listingInfo.price, obj.metadata, 'fusd')} />
                        <UniButton icon label={<CloseIcon />} onClick={() => {setSaleMode(false); setChosenItem(null); handleClose();}} />
                    </Stack>
                </DialogActions>
            </Dialog>
        );
    } else if (mode == "recentSales") {
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={() => {setSaleMode(false); setChosenItem(null); handleClose();}}>
                <DialogTitle sx={titleStyle} id="responsive-dialog-title">{`${obj.metadata.name} by ${obj.metadata.minter}`}</DialogTitle>
                <DialogContent sx={contentStyle}>
                    <FixedImage size={`95%`} url={obj.url} alt={obj.metadata.name} type={obj.metadata.mediaType} modal/>
                    <Stack direction={"column"}>
                        <Typography>Description: {obj.metadata ? obj.metadata.description : null}</Typography>
                        <Typography>Quantity Minted: {obj.instances.length}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={actionStyle}>
                    <Stack direction={`row`} spacing={2}>
                        <UniButton label={`View Asset`} onClick={() => router.push(`/assets/${obj.metadata.CID}`)}/>
                        <UniButton label={`Visit Minter Profile`} onClick={() => router.push(`/profile/${obj.metadata.minter}`)}/>
                        <UniButton icon label={<CloseIcon />} onClick={() => {setSaleMode(false); setChosenItem(null); handleClose();}}/>
                    </Stack>
                </DialogActions>
            </Dialog>
        );
    } else if (mode == "collectors") {
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={() => closeModal(setSaleMode, setQuantity, setChosenItem, setPrice, handleClose)}>
                <DialogTitle sx={titleStyle} id="responsive-dialog-title">{`${obj.collectionName} by ${obj.minter}`}</DialogTitle>
                <DialogContent sx={contentStyle}>
                    <FixedImage size={`95%`} url={obj.url} alt={obj.metadata.name} type={obj.metadata.mediaType} modal/>
                </DialogContent>
                <DialogActions sx={actionStyle}>
                    <Stack direction={`row`} spacing={2}>
                        <UniButton label={`View Collection`} onClick={() => router.push(`/collectors/${obj.collectionName.toLowerCase().split(' ').join('-')}`)}/>
                        <UniButton label={`Visit Minter Profile`} onClick={() => router.push(`/profile/${obj.minter}`)}/>
                        <UniButton icon label={<CloseIcon />} onClick={() => {setSaleMode(false); setChosenItem(null); handleClose();}}/>
                    </Stack>
                </DialogActions>
            </Dialog>
        );
    } else if (mode == "assets") {
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={() => {setSaleMode(false); setChosenItem(null); handleClose();}}>
                <DialogTitle sx={titleStyle} id="responsive-dialog-title">{`${obj.metadata.name} by ${obj.metadata.minter}`}</DialogTitle>
                <DialogContent sx={contentStyle}>
                    <FixedImage size={`95%`} url={obj.url} alt={obj.metadata.name} type={obj.metadata.mediaType} modal/>
                    <Stack direction={"column"}>
                        <Typography>Description: {obj.metadata ? obj.metadata.description : null}</Typography>
                        <Typography>Quantity Minted: {obj.instances.length}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={actionStyle}>
                    <Stack direction={`row`} spacing={2}>
                        <UniButton label={`View Asset`} onClick={() => router.push(`/assets/${obj.metadata.CID}`)}/>
                        <UniButton label={`Visit Minter Profile`} onClick={() => router.push(`/profile/${obj.metadata.minter}`)}/>
                        <UniButton icon label={<CloseIcon />} onClick={() => {setSaleMode(false); setChosenItem(null); handleClose();}}/>
                    </Stack>
                </DialogActions>
            </Dialog>
        );
    } else if (mode == "profile") {
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={() => {setSaleMode(false); setChosenItem(null); handleClose();}}>
                <DialogTitle sx={titleStyle} id="responsive-dialog-title">{`${obj.metadata.name} by ${obj.metadata.minter}`}</DialogTitle>
                <DialogContent sx={contentStyle}>
                    <FixedImage size={`95%`} url={obj.url} alt={obj.metadata.name} type={obj.metadata.mediaType} modal/>
                    <Stack direction={"column"}>
                        <Typography>Description: {obj.metadata ? obj.metadata.description : null}</Typography>
                        <Typography>Quantity Minted: {obj.instances.length}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={actionStyle}>
                    <Stack direction={`row`} spacing={2}>
                        <UniButton label={`View Asset`} onClick={() => router.push(`/assets/${obj.metadata.CID}`)}/>
                        <UniButton icon label={<CloseIcon />} onClick={() => {setSaleMode(false); setChosenItem(null); handleClose();}} />
                    </Stack>
                </DialogActions>
            </Dialog>
        );
    } else if (mode == "owner") {
        return (
            <Dialog fullScreen={fullScreen} open={open} onClose={() => {setSaleMode(false); setChosenItem(null); handleClose();}}>
                <DialogTitle sx={titleStyle} id="responsive-dialog-title">{`${obj.metadata.name} by ${obj.metadata.minter}`}</DialogTitle>
                <DialogContent sx={contentStyle}>
                    <FixedImage size={`95%`} url={obj.url} alt={obj.metadata.name} type={obj.metadata.mediaType} modal/>
                    {
                        saleMode
                        ?
                        <Stack direction={"column"}>
                            <ScarcitySlider label={"Quantity"} onChange={setQuantity} defaultValue={1} min={1} max={obj.instances.length} step={1}/>
                            <Stack direction={`row`}>
                            {obj.instances.slice(0,quantity).map((item: string, index: number) => (<Chip sx={chipStyle} key={index} label={<Typography>#{item}</Typography>} />))}
                            </Stack>
                            {/*<Collection type="list" items={obj.instances.slice(0,quantity)} gap="1.5rem" direction={"row"} overflow={"scroll"}>
                                {(item: string, index: number) => (<Chip sx={chipStyle} key={index} label={<Typography>#{item}</Typography>} />)}
                            </Collection>*/}
                            <TextField fullWidth color="primary" required label="Price" variant="standard" onChange={(e) => setPrice(Number(e.target.value))}/>
                        </Stack>
                        :
                        <Stack direction={"column"}>
                            <Typography>Description: {obj.metadata ? obj.metadata.description : null}</Typography>
                            <Typography>Quantity Remaining: {obj.instances.length}</Typography>
                        </Stack>
                        
                    }
                </DialogContent>
                <DialogActions sx={{backgroundColor:theme.palette.background.paper}}>
                    {
                        saleMode
                        ?
                        <Stack direction={`row`} spacing={2}>
                            <UniButton label={`Transfer all`} onClick={async () => await transferNFTs("0xae3baa0d314e546b")}/>
                            <UniButton label={`Remove listings`} onClick={async () => await removeStorefrontListings(chosenItem.metadata.minter)}/>
                            <UniButton label={`Post for Sale`} onClick={async () => await postForSale(chosenItem, quantity, price, 'default')}/>
                            <UniButton icon label={<RedoOutlinedIcon />} onClick={() => {setSaleMode(false); setChosenItem(null);}}/>
                        </Stack>
                        :
                        <Stack direction={`row`} spacing={2}>
                            <UniButton label={`View Asset`} onClick={() => router.push(`/assets/${obj.metadata.CID}`)}/>
                            <UniButton label={`Visit Minter Profile`} onClick={() => router.push(`/profile/${obj.metadata.minter}`)}/>
                            <UniButton label={`Sell/Transfer`} onClick={() => { setSaleMode(true); setChosenItem(obj); }}/>
                            <UniButton icon label={<CloseIcon />} onClick={() => {setSaleMode(false); setChosenItem(null); handleClose();}}/>
                        </Stack>
                        
                    }
                </DialogActions>
            </Dialog>
        );
    } else {
        return (
            null
        )
    }
}
