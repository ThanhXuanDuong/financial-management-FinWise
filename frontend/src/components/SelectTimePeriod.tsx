import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from "@mui/material/Box";

export default function SelectTimePeriod() {
    const [period, setPeriod] = React.useState("monthly");

    const handleChange = (event: SelectChangeEvent) => {
        setPeriod(event.target.value);
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 100 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue={"monthly"}
                    value={period}
                    onChange={handleChange}
                    label="Period"
                >
                    <MenuItem value={"monthly"}>monthly</MenuItem>
                    <MenuItem value={"yearly"}>yearly</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}