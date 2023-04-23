import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function CategoryCard({
    category,
    onCategory
}:{
    category:string,
    onCategory: (category:string) => void
}) {
    return (
        <Card sx={{ width:100, height: 100 }}>
            <CardActionArea onClick={() => onCategory(category)}>
                <CardContent>
                    <Typography gutterBottom variant="body1">
                        {category}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}