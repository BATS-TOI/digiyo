import { Slider, Typography, Stack } from '@mui/material';

interface ScarcitySliderProps {
    label: string;
    onChange: any;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
}


export default function ScarcitySlider({ label, onChange, defaultValue, min, max, step }: ScarcitySliderProps) {
    
    return (
        <Stack sx={{maxWidth:`95vw`, padding:`0 .5rem 0 .5rem`}}>
            <Typography>
                {label}
            </Typography>
            <Slider
                defaultValue={defaultValue}
                aria-label={`Default`}
                valueLabelDisplay={`auto`}
                step={step}
                min={min}
                max={max}
                color={`primary`}
                onChange={(e: any) => { onChange(e?.target?.value) }}
            />

        </Stack>
    );
}
