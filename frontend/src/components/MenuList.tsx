import {IconButton, Menu} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import LogoutButton from "./LogoutButton";
import SavingsGoalFormDialog from "./SavingsGoalFormDialog";

export default function MenuList({
    setSavingsGoal
}:{
    setSavingsGoal: (goal: number) => void
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="button"
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu"
                aria-labelledby="button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem>
                    <SavingsGoalFormDialog setSavingsGoal={setSavingsGoal} setAnchorEl={setAnchorEl}/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <LogoutButton/>
                </MenuItem>
            </Menu>
        </div>
    );
}