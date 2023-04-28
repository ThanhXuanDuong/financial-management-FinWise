import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Stack} from "@mui/material";
import TransactionTable from "./TransactionTable";
import Transaction from "../types/Transaction";

export default function CategoryAccordion({
    category,
    count,
    sum,
    filtered
}: {
    category: string,
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
                    <Stack sx={{width: '66%', flexShrink: 0}}>
                        <Typography variant="h6">
                            {category}
                        </Typography>

                        {count === 1
                            ? <Typography variant="body2" color="text.secondary">
                                {count}Transaction
                            </Typography>
                            : <Typography variant="body2" color="text.secondary">
                                {count}Transactions
                            </Typography>
                        }

                    </Stack>
                    <Typography variant="body1" color="text.secondary">
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