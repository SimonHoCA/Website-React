import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import './main-function.css'
import LeftNavigator from './left-nav/left-nav'
import LeftSubItem from './left-nav/left-sub-item'
import TfkNews from './tfk-news/tfk-news'
import TfkNewsHeadlineTitle from './tfk-news/tfk-news-headlines/tfk-news-headline-title'
// import TfkNewsHeadlineClassify from './tfk-news/tfk-news-headlines/tfk-news-headline-classify'
import TfkNewsArticlesPicture from './tfk-news/tfk-news-articles/tfk-news-articles-picture'
import TfkNewsArticlesParagraph from './tfk-news/tfk-news-articles/tfk-news-articles-paragraph'

class MainFunction extends React.Component{
// export default class MainFunction extends React.Component{
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
        articleClicked:"",  /* to indicate which article has been clicked by the user */
        maxPage:"1",  /* to indicate the max page number of the subSection */
        currentPage:"1",  /* to indicate the current page number of the subSection */
    }
    render(){
        let virtualDOM = (
            <div className='stucture-div'>
                {/* <div className="main-function-head-tfk">
                    {this.state.nowTimeString}
                    <br />
                    <span className={this.state.articleShow?"words-gray":"words-white"}>
                        You can use KEYBOARD "Crtl" and MOUSE SELECT to have a word explain
                    </span>
                </div> */}
                <div className={this.state.headlineShow?"left-nav-area-tfk":"left-nav-area-tfk scrolling-bar-impact2"}>
                    {/* <LeftNavigator navName="About"/> */}
                    {/* navigator for the DW News page */}
                    <LeftNavigator
                        navName="DW News"
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                    {/* navigator for the CBC News page */}
                    <LeftNavigator
                        navName="CBC News"
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                    {/* navigator for the TIME for Kids page */}
                    <LeftNavigator
                        navName="TIME for Kids"
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
                </div>
                <div className="main-function-content-tfk">
                    {/* when the left navigator selected for the TIME for Kids News tab, show this content page */}
                    <TfkNews
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
                        nowTimeString={this.state.nowTimeString}
                        maxPage={this.state.maxPage}
                        currentPage={this.state.currentPage}
                        leftSubItemSelected={this.state.leftSubItemSelected}
                        getHeaders={this.getHeaders}
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
        let subSection = this.props.params.subSection
        let linkSrc
        if(subSection!==undefined){
            let currentPage = this.props.params.page
            this.leftNavigatorClick("TIME for Kids",subSection,linkSrc,currentPage)
        }else{
            linkSrc = this.props.params.articleId
            if(linkSrc!==undefined){
                let subSection = linkSrc.split("$&$")[2]
                this.leftNavigatorClick("TIME for Kids",subSection,linkSrc)
            }else{
                this.leftNavigatorClick("TIME for Kids")
            }
        }
        this.timeUpdate()
        this.translateFunction()
        this.renewFloatingItems()
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
    leftNavigatorClick = (navName,subSection,linkSrc,currentPage)=>{
        if(navName==="TIME for Kids"){  /* when the "TIME for Kids News tab is clicked" */
            this.setState({
                tabSelected:true,  /* use to change the LeftNavigator's background color */
                ariticleSourceLink:"",
                articleClicked:"",
            })
            let result = axios.get('/proxy2/tfk/getSubSections')  /* get the subItem list from backend server */
            result.then(
                (response)=>{
                    this.setState({
                        headlineClassifyList:response.data  /* send the list to subItem to show them */
                    })
                    if(subSection===undefined){
                        // window.history.pushState(null,"","/tfk")
                        this.navigatorItemClick(response.data[0].replaceAll(" ","-"),linkSrc,currentPage)
                    }else{
                        // window.history.pushState(null,"","/tfk/"+subSection.replaceAll(" ","-").replaceAll("k","K").replaceAll("g","G").toLowerCase())
                        this.navigatorItemClick(subSection.replaceAll(" ","-").replaceAll("k","K").replaceAll("g","G"),linkSrc,currentPage)
                    }

                    /* show the LeftSubItem smoothly */
                    let subItemsDiv = document.querySelectorAll(".left-sub-item-tfk")[0]
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
            this.resetFloatingItems()
            this.setState({
                tabSelected:false,
            })
            window.location.assign("/dw")
        }
        if(navName==="CBC News"){
            this.resetFloatingItems()
            this.setState({
                tabSelected:false,
            })
            window.location.assign("/cbc")
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
    navigatorItemClick = (itemName,linkSrc,currentPage)=>{
        this.setState({
            maxPage:"1",
        })
        let result = axios.get('/proxy2/tfk/getMaxPageFromSubSection/'+itemName.replaceAll("-"," "))  /* get the max page number from backend server */
        result.then(
            (response)=>{
                let numberData = response.data
                if(numberData.length>0){
                    this.setState({
                        maxPage:numberData[0],
                    })
                    this.getHeaders(itemName,linkSrc,currentPage)
                }
            },
            (error)=>{
            }
        )
    }
    getHeaders = (itemName,linkSrc,currentPage)=>{
        // if((typeof currentPage)!==String){
        if(currentPage===undefined){
            currentPage = "1"
            window.history.pushState(null,"","/tfk/"+itemName.replaceAll(" ","-").toLowerCase())
        }else{
            window.history.pushState(null,"","/tfk/"+itemName.replaceAll(" ","-").toLowerCase()+"/"+currentPage)  // show the subSection link on the browser address bar, without any page re-load or redirect
        }
        this.resetFloatingItems()
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
            currentPage:currentPage,
        })
        let dataResult = axios.get('/proxy2/tfk/getHeadLinesFromSubSection/'+itemName.replaceAll("-"," ")+'/'+currentPage)  /* get the headline data from backend server */
        dataResult.then(
            (response)=>{
                let rawHeadlineData = response.data
                if(rawHeadlineData.length>1){
                    let result1 = []
                    for(let i=0;i<rawHeadlineData.length;i++){
                        let data = rawHeadlineData[i]
                        if(data[0]==='subSection'){
                            // result1.push(<TfkNewsHeadlineClassify key={i} classify={data[1]}/>)
                        }
                        if(data[0]==='headline with cover'){
                            let clicked = false
                            if(data[2]===this.state.articleClicked){
                                clicked = true
                            }
                            let headlineStyle = "type1"
                            if(i>3){
                                headlineStyle = "type2"
                            }
                            if(i>6){
                                headlineStyle = "type1"
                            }
                            if(i>9){
                                headlineStyle = "type2"
                            }
                            if(i>12){
                                headlineStyle = "type1"
                            }
                            if(i>15){
                                headlineStyle = "type2"
                            }
                            result1.push(  /* convert the backend data to the headline title elements */
                                <TfkNewsHeadlineTitle key={i} 
                                    title={data[1]}  /* title text */
                                    link={data[2]}  /* article link of this title */
                                    coverPicSrc={'/proxy2/tfk/getPicture/'+data[3].replaceAll("/","$$&$$")}  /* cover picture link of the article */
                                    date={data[4]} /* article publish date */
                                    newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                                    clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                                    shortDescription={data[5]}  /* short description of the article */
                                    headlineStyle={headlineStyle}  /* to determine the style of the headline title */
                                />
                            )
                        }
                        if(data[0]==='headline without cover'){
                            let clicked = false
                            if(data[2]===this.state.articleClicked){
                                clicked = true
                            }
                            let headlineStyle = "type1"
                            if(i>3){
                                headlineStyle = "type2"
                            }
                            if(i>6){
                                headlineStyle = "type1"
                            }
                            if(i>9){
                                headlineStyle = "type2"
                            }
                            if(i>12){
                                headlineStyle = "type1"
                            }
                            if(i>15){
                                headlineStyle = "type2"
                            }
                            result1.push(  /* convert the backend data to the headline title elements */
                                <TfkNewsHeadlineTitle key={i} 
                                    title={data[1]}  /* title text */
                                    link={data[2]}  /* article link of this title */
                                    date={data[3]} /* article publish date */
                                    newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                                    clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                                    shortDescription={data[5]}  /* short description of the article */
                                    headlineStyle={headlineStyle}  /* to determine the style of the headline title */
                                />
                            )
                        }
                    }
                    this.setState({
                        rawHeadlineData:response.data,  /* store the raw backend data */
                        headlineData:result1,  /* update the headline title elemkents, eventually update the headline page */
                    })
                    if(linkSrc!==undefined){
                        this.newsClicked(linkSrc)
                    }
                }else{
                    window.location.assign("/tfk")
                }
            },
            (error)=>{
            }
        )
    }
    /* 
        when the "HEAD LINES" tab or the "ARTICLES" tab is clicked, execute this function
            1. change the style for the "HEAD LINES" tab and the "ARTICLES" tab
            2. show or hide the "TfkNewsHeadlines" "TfkNewsArticles" page, depends on which tab is clicked
        This function is sent:
            MainFunction(this) => TfkNews(executor)
        The parameter "event" is catch the onclick event to get the specific element
    */
    headTabClick = (event)=>{
        // console.log(event.target.innerText)
        this.jumpDivLeftSet()
        if(event.target.innerText==='HEAD LINES'){
            window.history.pushState(null,"","/tfk/"+this.state.leftSubItemSelected.replaceAll(" ","-").toLowerCase()+"/"+this.state.currentPage)
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
                    // result1.push(<TfkNewsHeadlineClassify key={i} classify={data[1]}/>)
                }
                if(data[0]==='headline with cover'){
                    let clicked = false
                    if(data[2]===this.state.articleClicked){
                        clicked = true
                    }
                    let headlineStyle = "type1"
                    if(i>3){
                        headlineStyle = "type2"
                    }
                    if(i>6){
                        headlineStyle = "type1"
                    }
                    if(i>9){
                        headlineStyle = "type2"
                    }
                    if(i>12){
                        headlineStyle = "type1"
                    }
                    if(i>15){
                        headlineStyle = "type2"
                    }
                    result1.push(  /* convert the backend data to the headline title elements */
                        <TfkNewsHeadlineTitle key={i} 
                            title={data[1]}  /* title text */
                            link={data[2]}  /* article link of this title */
                            coverPicSrc={'/proxy2/tfk/getPicture/'+data[3].replaceAll("/","$$&$$")}  /* cover picture link of the article */
                            date={data[4]} /* article publish date */
                            newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                            clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                            shortDescription={data[5]}  /* short description of the article */
                            headlineStyle={headlineStyle}  /* to determine the style of the headline title */
                        />
                    )
                }
                if(data[0]==='headline without cover'){
                    let clicked = false
                    if(data[2]===this.state.articleClicked){
                        clicked = true
                    }
                    let headlineStyle = "type1"
                    if(i>3){
                        headlineStyle = "type2"
                    }
                    if(i>6){
                        headlineStyle = "type1"
                    }
                    if(i>9){
                        headlineStyle = "type2"
                    }
                    if(i>12){
                        headlineStyle = "type1"
                    }
                    if(i>15){
                        headlineStyle = "type2"
                    }
                    result1.push(  /* convert the backend data to the headline title elements */
                        <TfkNewsHeadlineTitle key={i} 
                            title={data[1]}  /* title text */
                            link={data[2]}  /* article link of this title */
                            date={data[3]} /* article publish date */
                            newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                            clicked={clicked}
                            shortDescription={data[5]}  /* short description of the article */
                            headlineStyle={headlineStyle}  /* to determine the style of the headline title */
                        />
                    )
                }
            }
            this.setState({
                headlineData:result1
            })
            this.restoreFloatingItems()
        }
        if(event.target.innerText==='ARTICLES'){
            window.history.pushState(null,"","/tfk/article/"+this.state.articleClicked.replaceAll("/","$$&$$"))
            this.resetFloatingItems()
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
        when the "Title" or "Picture" in the "TfkNewsHeadlines" is clicked, execute this function
            1. get the news link from the "Title" or "Picture" which is clicked
            2. get the news article data from the backend server
            3. convent the backend data to the elements in TfkNewsArticles
            4. store the elements in the "articleData" attribution, eventualy change the acticle page
            5. show the "TfkNewsArticles" instead of "TfkNewsHeadlines" page, in order to show the news for user
        This function is package into the two elements: TfkNewsHeadlineTitle
        The two elements is sent:
            MainFunction(this) => TfkNews => TfkNewsHeadlines => TfkNewsHeadlineTitle
        The parameter "linkSrc" is from the TfkNewsHeadlineTitle
    */
    newsClicked = (linkSrc)=>{
        window.history.pushState(null,"","/tfk/article/"+linkSrc.replaceAll("/","$$&$$"))  // show the article link on the browser address bar, without any page re-load or redirect
        this.resetFloatingItems()
        this.jumpDivLeftSet()
        this.setState({
            /* show the "TfkNewsArticles" instead of "TfkNewsHeadlines" page */
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
        let result = axios.get('/proxy2/tfk/getArticleData/'+linkSrc.replaceAll("/","$$&$$"))  /* get the news article data from the backend server */
        result.then(
            (response)=>{
                let articleData = response.data
                if(articleData!=="articleLink error"){
                    let result1 = []
                    for(let i=0;i<articleData.length;i++){
                        let data = articleData[i]
                        /* convent the backend data to the elements in TfkNewsArticles */
                        if(data[0]==='<img>'){
                            result1.push(<TfkNewsArticlesPicture key={i} pictureSrc={"/proxy2/tfk/getPicture/"+data[1].replaceAll("/","$$&$$")}/>)
                        }else{
                            result1.push(<TfkNewsArticlesParagraph key={i} paragraph={data}/>)
                        }
                    }
                    this.setState({
                        articleData:result1  /* store the elements in the "articleData" attribution */
                    })
                }else{
                    window.location.assign("/tfk")
                }
            },
            (error)=>{
            }
        )
        result = axios.get('/proxy2/tfk/getArticleSourceLink/'+linkSrc.replaceAll("/","$$&$$"))  /* get the source link of the article from the backend server */
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
            MainFunction(this) => TfkNews => JumpToTop(executor)
    */
    jumpToTop = ()=>{
        let arr = document.querySelectorAll('.content-tfk-articles')  /* select the article component */
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
            MainFunction(this) => TfkNews => JumpToBottom(executor)
    */
    jumpToBottom = ()=>{
        let arr = document.querySelectorAll('.content-tfk-articles')  /* select the article component */
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
            MainFunction(this) => TfkNews => RightTranslate
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
                        let refLink = this.state.articleClicked
                        let refSource = this.state.articleSourceLink
                        // let result = axios.get('proxy1/translation/'+word)  /* get the translation data from the backend server */
                        let result = axios.get('/proxy2/dictionary/'+word,{  /* get the translation data from the backend server */
                            headers: {
                                "requestTime": this.state.nowTimeString,
                                "refSubSection": this.state.leftSubItemSelected,
                                // "refLink": this.state.articleClicked,
                                "refLink": refLink,
                                // "refSource": this.state.articleSourceLink,
                                "refSource": refSource,
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
    /* 
        when the 'HEAD LINES' or some new is clicked    
            Set the "jump to top" or "jump to bottom" button's position
        because these two button is floating on the page
        their position is relate to the windows' size, we need to update the position before showing them
    */
    jumpDivLeftSet = ()=>{
        let main = document.querySelectorAll(".content-area")[0]
        let x = main.offsetLeft
        let windowHeight = document.documentElement.clientHeight
        this.setState({
            jumpDivSetting:[(1690-160+x)+'px',windowHeight],
        })
    }
    /* 
        the variable documentScrollHeight
        is used for keeping the last post of the documentElement.scrollTop
        when we turn back from the article, it will jump to the last view of the headline page
    */
    documentScrollHeight = 0
    /* 
        set a timer to update the LeftNavigator and header button's position
        it will auto update these itmes every 0.1s
    */
    renewFloatingItems = ()=>{
        let leftFloat = document.querySelectorAll(".left-nav-area-tfk")[0]
        leftFloat.style.top = "36px"
        let headTfk = document.querySelectorAll(".head-tfk-for-floating")[0]
        let headTfkAdd = document.querySelectorAll(".head-tfk-for-floating .addHeight")[0]
        headTfk.style.height = "100px"
        headTfkAdd.style.height = "0px"
        setInterval(()=>{
            let y = document.documentElement.scrollTop
            leftFloat.style.top = (y+36)+'px'
            headTfk.style.height = (y+100)+"px"
            headTfkAdd.style.height = (y+0)+"px"
        }, 100)
    }
    /* 
        when leave the headline page
        we will reset the LeftNavigator and header button's position
        and scroll the window to top
    */
    resetFloatingItems = ()=>{
        this.documentScrollHeight = document.documentElement.scrollTop
        document.documentElement.scrollTop = 0
        let leftFloat = document.querySelectorAll(".left-nav-area-tfk")[0]
        leftFloat.style.top = "36px"
        let headTfk = document.querySelectorAll(".head-tfk-for-floating")[0]
        let headTfkAdd = document.querySelectorAll(".head-tfk-for-floating .addHeight")[0]
        headTfk.style.height = "100px"
        headTfkAdd.style.height = "0px"
    }
    /* 
        when we turn back from the article
        it will jump to the last view of the headline page
    */
    restoreFloatingItems = ()=>{
        setTimeout(()=>{
            let leftFloat = document.querySelectorAll(".left-nav-area-tfk")[0]
            let headTfk = document.querySelectorAll(".head-tfk-for-floating")[0]
            let headTfkAdd = document.querySelectorAll(".head-tfk-for-floating .addHeight")[0]
            let y = this.documentScrollHeight
            window.scrollTo({
                top:y,
                behavior: "smooth",
            })
            leftFloat.style.top = (y+36)+'px'
            headTfk.style.height = (y+100)+"px"
            headTfkAdd.style.height = (y+0)+"px"
        }, 50)
    }
}
/* 
    As useParams() can't be used in a class-base component
    we should wrap the component in a function to pass the properties
*/
export default (props) => {
    return <MainFunction
        {...props}
        params={useParams()}
    />
}