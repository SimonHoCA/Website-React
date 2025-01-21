import React from 'react'
import axios from 'axios'
import './main-function.css'
import LeftNavigator from './left-nav/left-nav'
import LeftSubItem from './left-nav/left-sub-item'
import CbcNews from './cbc-news/cbc-news'
import CbcNewsHeadlineTitle from './cbc-news/cbc-news-headlines/cbc-news-headline-title'
import CbcNewsHeadlineClassify from './cbc-news/cbc-news-headlines/cbc-news-headline-classify'
import CbcNewsArticlesPicture from './cbc-news/cbc-news-articles/cbc-news-articles-picture'
import CbcNewsArticlesParagraph from './cbc-news/cbc-news-articles/cbc-news-articles-paragraph'

export default class MainFunction extends React.Component{
    state = {
        nowTimeString:"",
        tabSelected:false,  /* indicated that this tab is selcted */
        headLineSelected:true,  /* indicated the "HEAD LINES" tab is selected */
        headlineShow:true,  /* to determine whether "NewsHeadlines" wil be shown in this component */
        articleSelected:false,  /* indicated the "ARTICLES" tab is selected */
        articleShow:false,  /* to determine whether "NewsArticles" wil be shown in this component */
        articleDisable:true,  /* to determine whether the "ARTICLES" tab is visiable */
        headlineClassifyList:[],  /* to store the headline classify, such as "North America" */
        leftSubItemSelected:"",  /* to indicated which SubItem is selected */
        rawHeadlineData:[],  /* to store the raw headline data from the backend server, it's used for refresh the page */
        headlineData:[],  /* to store the headline data as React elements */
        rawHeadlinePicSrc:[],  /* to store the raw headline picture linkSrc from the backend server, it's used for refresh the page */
        headlinePicSrc:[],  /* to store the headline picture linkSrc as React elements */
        articleData:[],  /* to store the article data as React elements */
        translationData:[],  /* to store the translation data as React elements */
        translationFrameSetting:['1650px'],  /* offsetLeft */
        jumpDivSetting:['1690px',920],  /* offsetLeft, windowHeight */
        articleSourceLink:"",  /* source link of the article */
        articleClicked:"",  /* to indicated which article has been clicked by the user */
    }
    render(){
        let virtualDOM = (
            <div className='stucture-div'>
                <div className="main-function-head">
                    {this.state.nowTimeString} {/* real time clock */}
                    <br />
                    <span className={this.state.articleShow?"":"hidden"}>
                        You can use KEYBOARD "Crtl" and MOUSE SELECT to have a word explain
                    </span>
                </div>
                <div className="left-nav-area-cbc">
                    {/* <LeftNavigator navName="About"/> */}
                    {/* navigator for the DW News page */}
                    <LeftNavigator
                        navName="DW News"
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                    {/* navigator for the CBC News page */}
                    <LeftNavigator
                        navName="CBC News"
                        selected={this.state.tabSelected}
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                    {/* sub item of the navigator" */}
                    <LeftSubItem
                        headlineClassifyList={this.state.headlineClassifyList}
                        tabSelected={this.state.tabSelected}
                        navigatorItemClick={this.navigatorItemClick}
                        leftSubItemSelected={this.state.leftSubItemSelected}
                    />
                    {/* navigator for the TIME for Kids page */}
                    <LeftNavigator
                        navName="TIME for Kids"
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                </div>
                <div className="main-function-content">
                    {/* when the left navigator selected for the CBC News tab, show this content page */}
                    <CbcNews
                        headLineSelected={this.state.headLineSelected}
                        headlineShow={this.state.headlineShow}
                        articleSelected={this.state.articleSelected}
                        articleShow={this.state.articleShow}
                        articleDisable={this.state.articleDisable}
                        headlineData={this.state.headlineData}
                        headlinePicSrc={this.state.headlinePicSrc}
                        articleData={this.state.articleData}
                        headTabClick={this.headTabClick}
                        translationData={this.state.translationData}
                        translationFrameSetting={this.state.translationFrameSetting}
                        articleSourceLink={this.state.articleSourceLink}
                        jumpToTop={this.jumpToTop}
                        jumpToBottom={this.jumpToBottom}
                        jumpDivSetting={this.state.jumpDivSetting}
                    />
                </div>
            </div>
        )
        return virtualDOM
    }
    /* 
        just execute once on start
        to init the page at startup
    */
    componentDidMount(){
        this.leftNavigatorClick("CBC News")
        this.timeUpdate()
        this.translateFunction()
    }
    /* 
        get the time now and show it on the screen
    */
    timeUpdate = ()=>{
        this.setState({
            nowTimeString:this.getTime()
        })
        setInterval(()=>{
            this.setState({
                nowTimeString:this.getTime()
            })
        }, 1000*10)
    }
    getTime = ()=>{
        let date = new Date()
        let dayName = ""
        if(date.getDay()===0){
            dayName = "Sunday"
        }
        if(date.getDay()===1){
            dayName = "Monday"
        }
        if(date.getDay()===2){
            dayName = "Tuesday"
        }
        if(date.getDay()===3){
            dayName = "Wednesday"
        }
        if(date.getDay()===4){
            dayName = "Thursday"
        }
        if(date.getDay()===5){
            dayName = "Friday"
        }
        if(date.getDay()===6){
            dayName = "Saturday"
        }
        let month = ""
        if(date.getMonth()===0){
            month = "Jan"
        }
        if(date.getMonth()===1){
            month = "Feb"
        }
        if(date.getMonth()===2){
            month = "Mar"
        }
        if(date.getMonth()===3){
            month = "Apr"
        }
        if(date.getMonth()===4){
            month = "May"
        }
        if(date.getMonth()===5){
            month = "Jun"
        }
        if(date.getMonth()===6){
            month = "Jul"
        }
        if(date.getMonth()===7){
            month = "Aug"
        }
        if(date.getMonth()===8){
            month = "Sep"
        }
        if(date.getMonth()===9){
            month = "Oct"
        }
        if(date.getMonth()===10){
            month = "Nov"
        }
        if(date.getMonth()===11){
            month = "Dec"
        }
        let currentTime = dayName + ", " + date.toLocaleTimeString().slice(0,-3) + ", " + month + " " + date.getDate() + ", " + date.getFullYear()
        return currentTime
    }
    /* 
        **************************************************
        following are the functions for News Page
        **************************************************
    */
    /* 
        when click on the specific LeftNavigator:
            1. change the LeftNavigator's background color
            2. get the subItem list from backend server
            3. send the list to subItem to show them
        This function is sent:
            MainFunction(this) => LeftSubItem(executor)
        The parameter "navName" is from the LeftSubItem
    */
    leftNavigatorClick = (navName)=>{
        if(navName==="CBC News"){  /* when the "CBC News tab is clicked" */
            this.setState({
                tabSelected:true,  /* use to change the LeftNavigator's background color */
                ariticleSourceLink:"",
                articleClicked:"",
            })
            let result = axios.get('proxy2/cbc/getSubSections')  /* get the subItem list from backend server */
            result.then(
                (response)=>{
                    this.setState({
                        headlineClassifyList:response.data  /* send the list to subItem to show them */
                    })
                    this.navigatorItemClick(response.data[0].replace(" ","-"))

                    /* show the LeftSubItem smoothly */
                    let subItemsDiv = document.querySelectorAll(".left-sub-item-cbc")[0]
                    let divHeight = 0
                    let heightStep = 40
                    let heightMax = response.data.length * 40
                    let t = setInterval(()=>{
                        divHeight = divHeight + heightStep
                        subItemsDiv.style.height = divHeight+'px'
                        if(divHeight>=heightMax){
                            clearInterval(t)
                        }
                    }, 20)
                },
                (error)=>{
                }
            )
        }
        if(navName==="DW News"){
            this.setState({
                tabSelected:false,
            })
            window.location.assign("/dw")
        }
        if(navName==="TIME for Kids"){
            this.setState({
                tabSelected:false,
            })
            window.location.assign("/tfk")
        }
    }
    /* 
        when click on the specific LeftSubItem:
            1. get the headline data from backend server
            2. convert the backend data to the headline title elements
            3. store the raw backend data
            4. update the headline title elemkents, eventually update the headline page
            5. get the headline picture linkSrc from backend server
            6. convert the backend data to the headline picture elements
            7. update the picture elemkents, eventually update the headline page
        This function is sent:
            MainFunction(this) => LeftNavigator(executor)
        The parameter "navName" is from the LeftNavigator
    */
    navigatorItemClick = (itemName)=>{
        this.setState({
            headLineSelected:true,
            headlineShow:true,
            articleSelected:false,
            articleShow:false,
            articleDisable:true,
            leftSubItemSelected:itemName,
            rawHeadlineData:[],  /* clear the previous data */
            headlineData:[],  /* clear the previous data */
            rawHeadlinePicSrc:[],  /* clear the previous data */
            headlinePicSrc:[],  /* clear the previous data */
            translationData:[],
            articleClicked:"",
        })
        let dataResult = axios.get('proxy2/cbc/getHeadLinesFromSubSection/'+itemName.replace("-"," "))  /* get the headline data from backend server */
        dataResult.then(
            (response)=>{
                let rawHeadlineData = response.data
                let result1 = []
                for(let i=0;i<rawHeadlineData.length;i++){
                    let data = rawHeadlineData[i]
                    if(data[0]==='subSection'){
                        result1.push(<CbcNewsHeadlineClassify key={i} classify={data[1]}/>)
                    }
                    if(data[0]==='headline with cover'){
                        let clicked = false
                        if(data[2]===this.state.articleClicked){
                            clicked = true
                        }
                        result1.push(  /* convert the backend data to the headline title elements */
                            <CbcNewsHeadlineTitle key={i} 
                                title={data[1]}  /* title text */
                                link={data[2]}  /* article link of this title */
                                coverPicSrc={'proxy2/cbc/getPicture/'+data[3].replaceAll("/","$$&$$")}  /* cover picture link of the article */
                                date={data[4]} /* article publish date */
                                newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                                clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                            />
                        )
                    }
                    if(data[0]==='headline without cover'){
                        let clicked = false
                        if(data[2]===this.state.articleClicked){
                            clicked = true
                        }
                        result1.push(  /* convert the backend data to the headline title elements */
                            <CbcNewsHeadlineTitle key={i} 
                                title={data[1]}  /* title text */
                                link={data[2]}  /* article link of this title */
                                date={data[3]} /* article publish date */
                                newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                                clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                            />
                        )
                    }
                }
                this.setState({
                    rawHeadlineData:response.data,  /* store the raw backend data */
                    headlineData:result1,  /* update the headline title elemkents, eventually update the headline page */
                })
            },
            (error)=>{
            }
        )
    }
    /* 
        when the "HEAD LINES" tab or the "ARTICLES" tab is clicked, execute this function
            1. change the style for the "HEAD LINES" tab and the "ARTICLES" tab
            2. show or hide the "CbcNewsHeadlines" "CbcNewsArticles" page, depends on which tab is clicked
        This function is sent:
            MainFunction(this) => CbcNews(executor)
        The parameter "event" is catch the onclick event to get the specific element
    */
    headTabClick = (event)=>{
        // console.log(event.target.innerText)
        this.jumpDivLeftSet()
        if(event.target.innerText==='HEAD LINES'){
            this.setState({
                /* change the style for the "HEAD LINES" tab and the "ARTICLES" tab */
                /* show or hide the "Headlines" "Articles" page */
                headLineSelected:true,
                headlineShow:true,
                articleSelected:false,
                articleShow:false,
                translationData:[]
            })

            // update the titles, due to show which article has been clicked at least
            let rawHeadlineData = this.state.rawHeadlineData
            let result1 = []
            for(let i=0;i<rawHeadlineData.length;i++){
                let data = rawHeadlineData[i]
                if(data[0]==='subSection'){
                    result1.push(<CbcNewsHeadlineClassify key={i} classify={data[1]}/>)
                }
                if(data[0]==='headline with cover'){
                    let clicked = false
                    if(data[2]===this.state.articleClicked){
                        clicked = true
                    }
                    result1.push(  /* convert the backend data to the headline title elements */
                        <CbcNewsHeadlineTitle key={i} 
                            title={data[1]}  /* title text */
                            link={data[2]}  /* article link of this title */
                            coverPicSrc={'proxy2/cbc/getPicture/'+data[3].replaceAll("/","$$&$$")}  /* cover picture link of the article */
                            date={data[4]} /* article publish date */
                            newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                            clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                        />
                    )
                }
                if(data[0]==='headline without cover'){
                    let clicked = false
                    if(data[2]===this.state.articleClicked){
                        clicked = true
                    }
                    result1.push(  /* convert the backend data to the headline title elements */
                        <CbcNewsHeadlineTitle key={i} 
                            title={data[1]}  /* title text */
                            link={data[2]}  /* article link of this title */
                            date={data[3]} /* article publish date */
                            newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                            clicked={clicked}
                        />
                    )
                }
            }
            this.setState({
                headlineData:result1
            })
        }
        if(event.target.innerText==='ARTICLES'){
            if(this.state.articleDisable===false){
                this.setState({
                    /* change the style for the "HEAD LINES" tab and the "ARTICLES" tab */
                    /* show or hide the "Headlines" and "Articles" page */
                    headLineSelected:false,
                    headlineShow:false,
                    articleSelected:true,
                    articleShow:true,
                    translationData:[]
                })
            }
        }
    }
    /* 
        when the "Title" or "Picture" in the "CbcNewsHeadlines" is clicked, execute this function
            1. get the news link from the "Title" or "Picture" which is clicked
            2. get the news article data from the backend server
            3. convent the backend data to the elements in CbcNewsArticles
            4. store the elements in the "articleData" attribution, eventualy change the acticle page
            5. show the "CbcNewsArticles" instead of "CbcNewsHeadlines" page, in order to show the news for user
        This function is package into the two elements: CbcNewsHeadlineTitle
        The two elements is sent:
            MainFunction(this) => CbcNews => CbcNewsHeadlines => CbcNewsHeadlineTitle
        The parameter "linkSrc" is from the CbcNewsHeadlineTitle
    */
    newsClicked = (linkSrc)=>{
        this.jumpDivLeftSet()
        this.setState({
            /* show the "CbcNewsArticles" instead of "CbcNewsHeadlines" page */
            headLineSelected:false,
            articleSelected:true,
            headlineShow:false,
            articleShow:true,
            articleDisable:false,
            articleData:[],  /* clear the previous data */
            articleSourceLink:"",
            articleClicked:linkSrc,
            translationData:[]
        })
        let result = axios.get('proxy2/cbc/getArticleData/'+linkSrc.replaceAll("/","$$&$$"))  /* get the news article data from the backend server */
        result.then(
            (response)=>{
                let articleData = response.data
                let result1 = []
                for(let i=0;i<articleData.length;i++){
                    let data = articleData[i]
                    /* convent the backend data to the elements in CbcNewsArticles */
                    if(data[0]==='<img>'){
                        result1.push(<CbcNewsArticlesPicture key={i} pictureSrc={"proxy2/cbc/getPicture/"+data[1].replaceAll("/","$$&$$")}/>)
                    }else{
                        result1.push(<CbcNewsArticlesParagraph key={i} paragraph={data}/>)
                    }
                }
                this.setState({
                    articleData:result1  /* store the elements in the "articleData" attribution */
                })
            },
            (error)=>{
            }
        )
        result = axios.get('proxy2/cbc/getArticleSourceLink/'+linkSrc.replaceAll("/","$$&$$"))  /* get the source link of the article from the backend server */
        result.then(
            (response)=>{
                let sourceLink = response.data
                this.setState({
                    articleSourceLink:sourceLink
                })
            },
            (error)=>{
            }
        )
    }
    /* 
        when click on the jump-to-top button, execute this function
            1. the article page return to top
        This function is sent:
            MainFunction(this) => CbcNews => JumpToTop(executor)
    */
    jumpToTop = ()=>{
        let arr = document.querySelectorAll('.content-dw-articles')  /* select the article component */
        if(arr.length>0){
            let articlePage = arr[0]
            articlePage.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    }
    /* 
        when click on the jump-to-bottom button, execute this function
            1. the article page jump to bottom
        This function is sent:
            MainFunction(this) => CbcNews => JumpToBottom(executor)
    */
    jumpToBottom = ()=>{
        let arr = document.querySelectorAll('.content-dw-articles')  /* select the article component */
        if(arr.length>0){
            let articlePage = arr[0]
            articlePage.scrollTo({
                top: articlePage.scrollHeight,
                behavior: "smooth",
            })
        }
    }
    /* 
        when the Ctrl key is press and release
            1. if nothing is selected, clear the translation frame
            2. if something is selected, get the translation data from backend server
            3. show the data which is back from backend server
            4. if nothing back from backend, show something explain
        The element is sent:
            MainFunction(this) => CbcNews => RightTranslate
    */
    translateFunction = ()=>{
        document.addEventListener("keyup",(event)=>{
            if(event.key==="Control"){
                let selection = window.getSelection()
                if(selection.anchorNode!==null){
                    let word = selection.toString()  /* Got the selection text */
                    word = word.trim()
                    if(word.length>0){
                        let mainArea = document.querySelectorAll(".content-area")[0]
                        let x = mainArea.offsetLeft
                        this.setState({
                            translationFrameSetting:[(1650-160+x)+'px'],
                            translationData:[]
                        })
                        // let result = axios.get('proxy1/translation/'+word)  /* get the translation data from the backend server */
                        let result = axios.get('proxy2/dictionary/'+word,{  /* get the translation data from the backend server */
                            headers: {
                                "requestTime": this.state.nowTimeString,
                                "refSubSection": this.state.leftSubItemSelected,
                                "refLink": this.state.articleClicked,
                                "refSource": this.state.articleSourceLink,
                                "code1": "3ed6af2184d60a7b32c9a8a8a77eba21",
                                "code2": "ed2a2a0133c4155c2cf7179ed8975fd1",
                                "code3": "8abb6e778b4c1e81014feae446962158",
                                "code4": "1794998782079606933600bdfa3748ae",
                                "code5": "e93e015b88ef9e0e172911e4b588d6ff",
                            }
                        })
                        result.then(
                            (response)=>{
                                let translationData = response.data
                                let result1 = []
                                if(translationData.length>0){
                                    for(let i=0;i<translationData.length;i++){
                                        let data = translationData[i]
                                        result1.push(<span key={i}>{data}</span>)
                                        result1.push(<br key={i+5}></br>)
                                        result1.push(<br key={i+10}></br>)
                                    }
                                }else{
                                    result1.push(<span key={0}>You should select ENTIRE but SINGLE word</span>)
                                    result1.push(<br key={1}></br>)
                                    result1.push(<br key={2}></br>)
                                    result1.push(<span key={3}>And your selection maybe have no meaningful translation</span>)
                                }
                                this.setState({
                                    translationData:result1  /* store the elements in the "translationData" attribution */
                                })
                            },
                            (error)=>{
                            }
                        )
                    }else{
                        this.setState({
                            translationData:[]
                        })
                    }
                }else{
                    this.setState({
                        translationData:[]
                    })
                }
            }
        });
    }
    jumpDivLeftSet = ()=>{
        let main = document.querySelectorAll(".content-area")[0]
        let x = main.offsetLeft
        let windowHeight = document.documentElement.clientHeight
        this.setState({
            jumpDivSetting:[(1690-160+x)+'px',windowHeight],
        })
    }
}