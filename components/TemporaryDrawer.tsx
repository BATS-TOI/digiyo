import {Typography, TextField, Autocomplete, Drawer, Divider, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

interface TemporaryDrawerProps {
    anchor: 'left' | 'right';
    open: boolean;
    onClose: any;
    users: any;
}

export default function TemporaryDrawer({ anchor, open, onClose, users }: TemporaryDrawerProps) {
    const router = useRouter();
    const theme = useTheme();
    return (
        
          <Drawer
            anchor={anchor}
            open={open}
            onClose={onClose}
            elevation={0}
          >
            <Stack direction={"column"} sx={{marginTop:`3rem`, minWidth:`50%`}} spacing={3}>
                <Divider />
                <Typography variant="h6">Filter</Typography>
                <Divider />
                <Autocomplete
                    disablePortal
                    id="filter-by-title"
                    options={users.map((i: any) => i.name)}
                    sx={{ width: 300 }}
                    renderInput={(params: any) => <TextField {...params} label="Filter by Title" />}
                    onChange={(e: any, v: any) => router.push(`/profile/${v}`)}
                />
                <Autocomplete
                    disablePortal
                    id="filter-by-description"
                    options={users.map((i: any) => i.name)}
                    sx={{ width: 300 }}
                    renderInput={(params: any) => <TextField {...params} label="Filter by Description" />}
                    onChange={(e: any, v: any) => router.push(`/profile/${v}`)}
                />
                <Autocomplete
                    disablePortal
                    id="filter-by-user"
                    options={users.map((i: any) => i.name)}
                    sx={{ width: 300 }}
                    renderInput={(params: any) => <TextField {...params} label="Filter by User" />}
                    onChange={(e: any, v: any) => router.push(`/profile/${v}`)}
                />
                <Divider />
                <Typography variant="h6">Search</Typography>
                <Divider />
                <Autocomplete
                    disablePortal
                    id="filter-by-title"
                    options={users.map((i: any) => i.name)}
                    sx={{ width: 300 }}
                    renderInput={(params: any) => <TextField {...params} label="Filter by Title" />}
                    onChange={(e: any, v: any) => router.push(`/profile/${v}`)}
                />
                <Autocomplete
                    disablePortal
                    id="filter-by-description"
                    options={users.map((i: any) => i.name)}
                    sx={{ width: 300 }}
                    renderInput={(params: any) => <TextField {...params} label="Filter by Description" />}
                    onChange={(e: any, v: any) => router.push(`/profile/${v}`)}
                />
                <Autocomplete
                    disablePortal
                    id="filter-by-user"
                    options={users.map((i: any) => i.name)}
                    sx={{ width: 300 }}
                    renderInput={(params: any) => <TextField {...params} label="Filter by User" />}
                    onChange={(e: any, v: any) => router.push(`/profile/${v}`)}
                />
            </Stack>
          </Drawer>
    )
}
  