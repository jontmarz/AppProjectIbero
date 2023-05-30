import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export default function CustomList(props) {
    if (props.order) {
        return(
            <List component="ul">
                {props.list.map((i, index) =>
                    <ListItem key={index}>
                        <ListItemText key={index} primary={i} />
                    </ListItem>
                )}
            </List>
        )
    } else {
        return(
            <List component="ul">
                {props.list.map((i, index) =>
                    <ListItem key={index}>
                        <ListItemIcon>
                            <CheckBoxOutlineBlankIcon />
                        </ListItemIcon>
                        <ListItemText key={index} primary={i} />
                    </ListItem>
                )}
            </List>
        )
    }
}