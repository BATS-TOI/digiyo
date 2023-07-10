import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'

interface UniButtonProps {
    id?: string;
    icon?: boolean;
    label: any;
    onClick: any;
    sx?: any;
    color?: any;
    startIcon?: any;
}

export default function UniButton({id="unibutton_default_id", icon=false, label, onClick, sx={}, color="primary", startIcon=null}:UniButtonProps) {
    return (
        icon
        ?
        <IconButton id={id} color={color} aria-label={"Icon Button"} onClick={onClick} sx={sx}>{label}</IconButton>
        :
        <Button id={id} color={color} onClick={onClick} sx={sx} variant={"outlined"} startIcon={startIcon}>{label}</Button>
    )
}