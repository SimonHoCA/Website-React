import React from 'react'
import './rolling-picture-item.css'

export default class RollingPictureItem extends React.Component{
    render(){
        let virtualDOM = (
            <div className={this.props.match?"rolling-picture-selected":"rolling-picture-item"}>
                <img
                    onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
                    onClick={this.mouseClick}
                    src={this.props.picSrc} alt={this.props.link}
                />
            </div>
        )
        return virtualDOM
    }
    mouseEnter = ()=>{
        this.props.hoverPictureSelectTitle(this.props.link)
    }
    mouseLeave = ()=>{
        this.props.hoverPictureSelectTitle("")
    }
    mouseClick = ()=>{
        this.props.newsClicked(this.props.link)
    }
}