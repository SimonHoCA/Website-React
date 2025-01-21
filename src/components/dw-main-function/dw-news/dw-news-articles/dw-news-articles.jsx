import React from 'react'
import './dw-news-articles.css'

export default class NewsArticles extends React.Component{
    render(){
        let virtualDOM = (
            <div className={this.props.articleShow?"content-dw-articles":"content-dw-articles hidden"}>
                {this.props.articleData}
                <div className='org-link-of-article'>
                    <hr />
                    <span>This website is just for coding and fun. No any commercial intention</span>
                    <br />
                    <span>You can find the original article from the button below</span>
                    <br />
                    <button onClick={this.openPage}>ORIGINAL</button>
                </div>
            </div>
        )
        return virtualDOM
    }
    openPage = ()=>{
        window.open(this.props.articleSourceLink)
    }
}