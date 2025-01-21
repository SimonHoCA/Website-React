import React from 'react'
import './dw-news-headline-classify.css'

export default class NewsHeadlineClassify extends React.Component{
    render(){
        let virtualDOM = (
            <div className="dw-headline-classify">
                <span>{this.props.classify}</span>
                <hr />
            </div>
        )
        return virtualDOM
    }
}