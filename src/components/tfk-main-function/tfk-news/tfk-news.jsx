import React from 'react'
import './tfk-news.css'
import TfkNewsHeadlines from './tfk-news-headlines/tfk-news-headlines'  /* the headline page of the TIME for Kids News function */
import TfkNewsArticles from './tfk-news-articles/tfk-news-articles'  /* the article page of the TIME for Kids News function */
import RightTranslate from '../floating-components/right-translate'  /* translation floating frame on the right side */
import JumpToTop from '../floating-components/jump-to-top'  /* a jump-to-top button on the right side */
import JumpToBottom from '../floating-components/jump-to-bottom'  /* a jump-to-bottom button on the right side */

export default class Content extends React.Component{
    render(){
        let virtualDOM = (
            <div className='stucture-div'>
                <div className={this.props.headlineShow?"head-tfk":"head-tfk scrolling-bar-impact1"}>
                    <div className="head-tfk-for-floating">
                        <div className='addHeight'></div>  {/* for tuning the floating div size */}
                        <div className="main-function-head-tfk">
                            {this.props.nowTimeString} {/* real time clock */}
                            <br />
                            <span className={this.props.articleShow?"words-gray":"words-white"}>
                                You can use KEYBOARD "Crtl" and MOUSE SELECT to have a word explain
                            </span>
                        </div>
                        <ul className='float-clear'>
                            <li className='float-left' onClick={this.props.headTabClick}>
                                <span className={this.props.headLineSelected?"span1 selected enable":"span1 enable"}>
                                    HEAD LINES
                                </span>
                            </li>
                            <li className='float-left' onClick={this.props.headTabClick}>
                                <span className={this.props.articleSelected?"span1 selected enable":this.props.articleDisable?"span1":"span1 enable"}>
                                    ARTICLES
                                </span>
                            </li>
                        </ul>
                        <hr />
                    </div>
                    <RightTranslate
                        translationData={this.props.translationData}
                        translationFrameSetting={this.props.translationFrameSetting}
                        articleShow={this.props.articleShow}
                    />
                    <JumpToTop
                        jumpToTop={this.props.jumpToTop}
                        jumpDivSetting={this.props.jumpDivSetting}
                        articleShow={this.props.articleShow}
                    />
                    <JumpToBottom
                        jumpToBottom={this.props.jumpToBottom}
                        jumpDivSetting={this.props.jumpDivSetting}
                        articleShow={this.props.articleShow}
                    />
                </div>
                {/* <hr /> */}
                <br />
                <TfkNewsHeadlines
                    headlineShow={this.props.headlineShow}
                    headlineData={this.props.headlineData}
                    maxPage={this.props.maxPage}
                    currentPage={this.props.currentPage}
                    leftSubItemSelected={this.props.leftSubItemSelected}
                    getHeaders={this.props.getHeaders}
                />
                <TfkNewsArticles
                    articleShow={this.props.articleShow}
                    articleData={this.props.articleData}
                    articleSourceLink={this.props.articleSourceLink}
                />
            </div>
        )
        return virtualDOM
    }
}