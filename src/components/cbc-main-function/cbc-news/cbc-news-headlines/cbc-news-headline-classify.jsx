import React from 'react'
import './cbc-news-headline-classify.css'

export default class NewsHeadlineClassify extends React.Component{
    render(){
        let virtualDOM = (
            <div className="cbc-headline-classify">
                <span>{this.props.classify}</span>
                {/* <hr /> */}
            </div>
        )
        return virtualDOM
    }
}