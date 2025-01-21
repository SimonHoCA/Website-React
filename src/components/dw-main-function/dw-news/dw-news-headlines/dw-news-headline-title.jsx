import React from 'react'
import './dw-news-headline-title.css'

export default class NewsHeadlineTitle extends React.Component{
    render(){
        let virtualDOM = (
            <div className={this.props.match?"dw-headline-selected":"dw-headline-title"}>
                • <span
                    onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
                    onClick={this.mouseClick} className={this.props.clicked?"headline-clicked":""}
                >{this.props.title}</span>
                <span className='date'> -- {this.props.date}</span>
                {/* <hr /> */}
            </div>
        )
        return virtualDOM
    }
    mouseEnter = ()=>{
        this.props.hoverTitleSelectPicture(this.props.link)
        // console.log("link",this.props.link)
    }
    mouseLeave = ()=>{
        this.props.hoverTitleSelectPicture("")
    }
    mouseClick = ()=>{
        this.props.newsClicked(this.props.link)
        // console.log("link",this.props.link)
    }
}