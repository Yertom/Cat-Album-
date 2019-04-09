import React, {Component, Fragment} from 'react';
import Row from "./Row/Row";
import json from "../../test";
import "./AppContainer.css"
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({

    heroContent: {
        maxWidth: 1000,
        margin: '0 auto',
    },
    button: {
        padding: 20,
        marginTop: 10,
        marginBottom: 30,
    },
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },

});

class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screenSize: {
                width: 0,
                height: 0,
            },
            numberOfRows: [],
            itemList: [],
            currentRowId: 0,
            currentRowIds: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        let itemList = JSON.stringify(json);
        itemList = JSON.parse(itemList);
        let rowScaling = this.state.screenSize.width >= 1280 ? 3 : this.state.screenSize.width >= 960 ? 2 : this.state.screenSize.width >= 600 ? 2 : 1;
        let numberOfRows = itemList.length / rowScaling;
        numberOfRows = Array.from(Array(Math.ceil(numberOfRows)), (x, index) => index + 1);
        window.addEventListener("resize", this.updateDimensions);
        this.setState({
            itemList: itemList,
            numberOfRows: numberOfRows,
            screenSize: {width: document.documentElement.clientWidth},
        })
    }

    updateDimensions() {
        let rowScaling = this.state.screenSize.width >= 1280 ? 3 : this.state.screenSize.width >= 960 ? 2 : this.state.screenSize.width >= 600 ? 2 : 1;
        let numberOfRows = this.state.itemList.length / rowScaling;
        console.log(numberOfRows);
        console.log(rowScaling);
        numberOfRows = Array.from(Array(Math.ceil(numberOfRows)), (x, index) => index + 1);
        this.setState({
            screenSize: {width: document.documentElement.clientWidth},
            numberOfRows: numberOfRows,
            currentRowIds: [],
            currentRowId: 0,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.screenSize.width !== prevState.screenSize.width) {
            this.updateDimensions();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    handleClick(event, rowId, ids) {
        this.setState({
            currentRowId: rowId,
            currentRowIds: ids,
        });
    }

    handleButtonClick() {
        if(this.state.currentRowIds.length === 0){
            alert("Choose one of the rows");
            return;
        }
        let arr = this.state.currentRowIds;
        if(arr[0]>arr[arr.length - 1]) {
            arr = arr.reverse();
        }
        arr = arr.filter((item) => {
            if (item <= this.state.itemList.length) {
                return item;
            }
        });
        alert(arr);
    }

    render() {
        let {classes} = this.props;
        let rows = this.state.numberOfRows.map((item, index) => {
            return <Grid xs={12} item><Row isCurrent={index + 1  === this.state.currentRowId} key={item} id={item}
                                           itemList={this.state.itemList} handleClick={this.handleClick}
                                           updateDimensions={this.updateDimensions}
                                           screenWidth={this.state.screenSize.width}/></Grid>
        });
        return (
            <Fragment>
                <AppBar position="static" className={classes.appBar}>
                    <ToolBar>
                        <CameraIcon className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap>
                            Cat Album
                        </Typography>
                    </ToolBar>
                </AppBar>
                <div className={classes.heroContent}>
                    <Grid container direction={"column"}>
                        {rows}
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item>
                        </Grid>
                    </Grid>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item><Button className={classes.button} variant="contained" color="primary" onClick={this.handleButtonClick}>Show selected row</Button></Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(AppContainer);