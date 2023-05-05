import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Stack} from "@mui/material";
import TransactionTable from "./TransactionTable";
import Transaction from "../types/Transaction";
import Box from "@mui/material/Box";

export default function CategoryAccordion({
    category,
    count,
    sum,
    filtered
}: {
    category: {name:string, url: string},
    count: number,
    sum: string,
    filtered: Transaction[]
}) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel'} onChange={handleChange('panel')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelbh-content"
                    id="panelbh-header"
                >
                    <Box display="flex"
                         alignItems="center"
                         gap={2}
                         sx={{width: '80%', flexShrink: 0}}>
                        <img
                            height="50"
                            width="50"
                            src={category.url}
                            alt={category.name}
                        />
                        <Stack >
                            <Typography variant="h6">
                                {category.name}
                            </Typography>

                            {count === 1
                                ? <Typography variant="body2" color="text.secondary">
                                    {count} Transaction
                                </Typography>
                                : <Typography variant="body2" color="text.secondary">
                                    {count} Transactions
                                </Typography>
                            }

                        </Stack>
                    </Box>

                    <Typography variant="body1"
                                color="text.secondary"
                                sx={{color: parseFloat(sum) >=0
                                        ? "green":"red"}}
                    >
                        {sum}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <TransactionTable transactions={filtered}/>
                </AccordionDetails>

            </Accordion>
        </div>
    );
}