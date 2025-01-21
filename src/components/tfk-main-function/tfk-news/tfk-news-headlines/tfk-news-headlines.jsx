import React from 'react'
import './tfk-news-headlines.css'
import PageSelection from './tfk-page-selection'  /* the page seletion on the bottom of the headline page */

export default class NewsHeadlines extends React.Component{
    render(){
        let virtualDOM = (
            <div>
                <div className={this.props.headlineShow?"content-tfk-headlines float-clear":"content-tfk-headlines float-clear hidden"}>
                    {this.props.headlineData}
                </div>
                <PageSelection
                    maxPage={this.props.maxPage}
                    currentPage={this.props.currentPage}
                    leftSubItemSelected={this.props.leftSubItemSelected}
                    getHeaders={this.props.getHeaders}
                    headlineShow={this.props.headlineShow}
                />
            </div>
        )
        return virtualDOM
    }
}