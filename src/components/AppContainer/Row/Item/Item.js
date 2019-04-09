import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import "./Item.css";


const styles = theme => ({

    Card_root: {
        width: 250,
        height: "100%",
        padding: 5,
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "100%",
            marginBottom: 10,
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%",
            height: "100%",
            marginBottom: 5,
        },
        [theme.breakpoints.up('md')]: {
            width: "100%",
            height: "100%",
            marginBottom: 5,
        },
        [theme.breakpoints.up('lg')]: {
            width: 300,
            margin: 10,
            height: "100%",
            marginBottom: 0,
        },
    },

    Img:{
        width: "100%",
        height: 270,
        background: "#282c34",
        backgroundSize: "cover, contain",
        backgroundPosition: "center",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: 470,
            background: "#282c34",
            backgroundSize: "cover, contain",
            backgroundPosition: "top",
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%",
            height: 370,
            background: "#282c34",
            backgroundSize: "cover, contain",
            backgroundPosition: "top",
        },
        [theme.breakpoints.up('md')]: {
            width: "100%",
            height: 370,
            background: "#282c34",
            backgroundSize: "cover, contain",
            backgroundPosition: "top",
        },
        [theme.breakpoints.up('lg')]: {
            width: "100%",
            height: 270,
            background: "#282c34",
            backgroundSize: "cover, contain",
            backgroundPosition: "center",
        },
    }

});

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes} = this.props;
        let divImg = {
            backgroundImage: 'url(' + this.props.src + ')',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover, contain",
            backgroundPosition: "center",
        };
        return (
            <div>
                <Card className={classes.Card_root}>
                    <div className={`${this.props.isCurrent ? "current" : null}`}>
                        <div style={divImg} className={classes.Img}></div>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.name}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Item);