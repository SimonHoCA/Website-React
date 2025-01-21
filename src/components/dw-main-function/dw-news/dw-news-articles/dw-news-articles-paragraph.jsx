import React from 'react'
import './dw-news-articles-paragraph.css'

export default class NewsArticlesParagraph extends React.Component{
    render(){
        let virtualDOM = (
            <div className={this.props.paragraph[0]==="<h1>"?'dw-articles-title':'dw-articles-paragraph'}>
                <span className={this.props.paragraph[0].slice(1,-1)}>
                    {this.props.paragraph[1]}
                </span>
            </div>
        )
        return virtualDOM
    }
}