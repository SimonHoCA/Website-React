import React from 'react'
import './tfk-news-headline-title.css'

export default class NewsHeadlineTitle extends React.Component{
    render(){
        let virtualDOM = (
            <div className={
                    this.props.headlineStyle==="type1"?
                        this.props.clicked?
                            "tfk-headline-title1 tfk-headline-clicked float-left"
                        :
                            "tfk-headline-title1 float-left"
                    :
                        this.props.clicked?
                            "tfk-headline-title2 tfk-headline-clicked float-left"
                        :
                            "tfk-headline-title2 float-left"
                    }>
                <div className={
                        this.props.headlineStyle==="type1"?
                            "tfk-pic-div"
                        :
                            "tfk-pic-div float-left"
                        }>
                    <img src={this.props.coverPicSrc} alt={this.props.link} onClick={this.mouseClick} />
                </div>
                <div className={
                        this.props.headlineStyle==="type1"?
                            "tfk-text-div"
                        :
                            "tfk-text-div float-left"
                        }>
                    <div className='tfk-title'onClick={this.mouseClick}><span>{this.props.title}</span></div>
                    <span className='tfk-date'>{this.props.date}</span>
                    <br/>
                    <div className='tfk-description'onClick={this.mouseClick}><span>{this.props.shortDescription}</span></div>
                </div>
            </div>
        )
        return virtualDOM
    }
    mouseClick = ()=>{
        this.props.newsClicked(this.props.link)
        // window.location.assign("/tfk/article/"+this.props.link.replaceAll("/","$$&$$"))
    }
}