import React from 'react'
import './dw-news.css'
import DwNewsHeadlines from './dw-news-headlines/dw-news-headlines'  /* the headline page of the DW News function */
import DwNewsArticles from './dw-news-articles/dw-news-articles'  /* the article page of the DW News function */
import RightTranslate from '../floating-components/right-translate'  /* translation floating frame on the right side */
import JumpToTop from '../floating-components/jump-to-top'  /* a jump-to-top button on the right side */
import JumpToBottom from '../floating-components/jump-to-bottom'  /* a jump-to-bottom button on the right side */

export default class Content extends React.Component{
    render(){
        let virtualDOM = (
            <div className='stucture-div'>
                <div className="head-dw">
                    <ul className='float-clear'>
                        <li className='float-left' onClick={this.props.headTabClick}>
                            <span className={this.props.headLineSelected?"selected enable":"enable"}>
                                HEAD LINES
                            </span>
                        </li>
                        <li className='float-left' onClick={this.props.headTabClick}>
                            <span className={this.props.articleSelected?"selected enable":this.props.articleDisable?"":"enable"}>
                                ARTICLES
                            </span>
                        </li>
                    </ul>
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
                <hr />
                <DwNewsHeadlines
                    headlineShow={this.props.headlineShow}
                    headlineData={this.props.headlineData}
                    headlinePicSrc={this.props.headlinePicSrc}
                />
                <DwNewsArticles
                    articleShow={this.props.articleShow}
                    articleData={this.props.articleData}
                    articleSourceLink={this.props.articleSourceLink}
                />
            </div>
        )
        return virtualDOM
    }
}