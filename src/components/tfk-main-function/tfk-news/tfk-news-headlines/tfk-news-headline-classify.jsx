import React from 'react'
import './tfk-news-headline-classify.css'

export default class NewsHeadlineClassify extends React.Component{
    render(){
        let virtualDOM = (
            <div className="tfk-headline-classify">
                <span>{this.props.classify}</span>
                {/* <hr /> */}
            </div>
        )
        return virtualDOM
    }
}