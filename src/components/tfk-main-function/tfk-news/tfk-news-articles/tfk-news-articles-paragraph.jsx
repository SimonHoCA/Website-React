import React from 'react'
import './tfk-news-articles-paragraph.css'

export default class NewsArticlesParagraph extends React.Component{
    render(){
        let virtualDOM = (
            <div className={
                this.props.paragraph[0]==="<h1>"?
                    'tfk-articles-title'
                :
                    this.props.paragraph[0]==="<H2>"?
                        'tfk-articles-h2'
                    :
                        'dw-articles-paragraph'
                }>
                <span className={this.props.paragraph[0].slice(1,-1)}>
                    {this.props.paragraph[1]}
                </span>
            </div>
        )
        return virtualDOM
    }
}