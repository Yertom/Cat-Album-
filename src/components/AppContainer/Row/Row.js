import React, { Component } from 'react';
import Item from "./Item/Item";
import Grid from "@material-ui/core/Grid";

class Row extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let rowScaling = this.props.screenWidth >= 1280 ? 3 : this.props.screenWidth >= 960 ? 2 : this.props.screenWidth >= 600 ? 2 : 1;
        let imgIds =  Array.from(Array(rowScaling), (x, index)=> (this.props.id * rowScaling) - index);
        let items = this.props.itemList.map((item) => {
            if(imgIds.includes(item.id)){
                return <Grid item xs={12} sm={6} md={6} lg={4}><Item isCurrent={this.props.isCurrent} id={item.id} key={item.id} name={item.name} src={item.imageUrl}/></Grid>
            }
        });
        return (
            <div onMouseDown={(e)=>this.props.handleClick(e, this.props.id, imgIds)}>
                <Grid container>{items}</Grid>
            </div>
        );
    }
}

export default Row;

