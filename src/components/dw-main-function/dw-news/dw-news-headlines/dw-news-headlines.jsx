import React from 'react'
import './dw-news-headlines.css'

export default class NewsHeadlines extends React.Component{
    render(){
        let virtualDOM = (
            <div className={this.props.headlineShow?"content-dw-headlines float-clear":"content-dw-headlines float-clear hidden"}>
                <div className="rolling-pictures float-right">
                    {this.props.headlinePicSrc}
                </div>
                    {this.props.headlineData}
            </div>
        )
        return virtualDOM
    }
}