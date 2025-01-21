import React from 'react'
import './cbc-news-headline-title.css'

export default class NewsHeadlineTitle extends React.Component{
    render(){
        let hasPicture = true
        if(this.props.coverPicSrc===undefined){
            hasPicture = false
        }
        let virtualDOM = (
            <div className={this.props.match?"cbc-headline-selected":this.props.clicked?"cbc-headline-title headline-clicked float-left":"cbc-headline-title float-left"}>
                <div className={hasPicture?"cbc-headline-title-pic":"cbc-headline-title-pic hidden"}>
                    <img src={this.props.coverPicSrc} alt={this.props.link} onClick={this.mouseClick} />
                </div>
                <div className={hasPicture?"cbc-headline-title-text":"cbc-headline-title-text-nopic"}>
                    <span
                        onClick={this.mouseClick}
                    >{this.props.title}</span>
                    {/* <br/> */}
                    <span className='date'> -- {this.props.date}</span>
                </div>
            </div>
        )
        return virtualDOM
    }
    mouseClick = ()=>{
        this.props.newsClicked(this.props.link)
    }
}