import axios from "axios";
import {useRef, useState} from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function CsvUpload(){
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return(
        <form onSubmit={async (e) => {
            // FILE UPLOAD
            e.preventDefault();

            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const res = await axios.post("/api/csv", formData);

                alert(JSON.stringify(res.data, null, 2));
            }
        }}>
            <Container>
                <Box display="flex" gap="5%">
                    <Button sx={{width:"62%"}}
                            variant="outlined"
                            onClick={() => {
                                fileInputRef.current?.click();
                            }}
                    > UPLOAD CSV</Button>

                    <Button type="submit" sx={{width:"33%"}} variant="outlined">Submit</Button>
                </Box>

                <input
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    type={"file"}
                    onChange={(e) => {
                        if (!e.target.files || e.target.files.length < 1) {
                            setFile(null);
                            return;
                        }

                        setFile(e.target.files[0]);
                    }}
                    accept={"text/csv"}
                />
            </Container>

        </form>
    )
}