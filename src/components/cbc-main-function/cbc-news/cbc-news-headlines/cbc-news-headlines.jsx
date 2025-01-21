import React from 'react'
import './cbc-news-headlines.css'

export default class NewsHeadlines extends React.Component{
    render(){
        let virtualDOM = (
            <div className={this.props.headlineShow?"content-cbc-headlines float-clear":"content-cbc-headlines float-clear hidden"}>
                {this.props.headlineData}
            </div>
        )
        return virtualDOM
    }
}