import React from 'react'
import './cbc-news-articles-picture.css'

export default class NewsArticlesPicture extends React.Component{
    render(){
        let virtualDOM = (
            <div className='dw-articles-picture'>
                <img src={this.props.pictureSrc} alt=''/>
            </div>
        )
        return virtualDOM
    }
}