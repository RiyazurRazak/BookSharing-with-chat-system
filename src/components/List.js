import React from 'react'

//ui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core'

function ListComponent(props) {
    return (
        <div>
             <List>
                <ListItem>
                    <ListItemText
                        primary={props.name}
                        secondary={`This item uploaded at ${props.date} was asked by ${props.askedby}.`}
                    />
                    <ListItemSecondaryAction>
                        <Button onClick={()=> props.accept(props.id)} className="requestitems__accept">Accept It</Button>
                        <Button onClick={()=> props.deny(props.id)} className="requestitems__deny">Deny Request</Button>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </List>
        </div>
    )
}

export default ListComponent
