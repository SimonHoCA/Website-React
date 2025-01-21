import React from 'react'
import axios from 'axios'
import './main-function.css'
import LeftNavigator from './left-nav/left-nav'
import LeftSubItem from './left-nav/left-sub-item'
import DwNews from './dw-news/dw-news'
import DwNewsHeadlineTitle from './dw-news/dw-news-headlines/dw-news-headline-title'
import DwNewsHeadlineClassify from './dw-news/dw-news-headlines/dw-news-headline-classify'
import RollingPictureItem from './dw-news/dw-news-headlines/rolling-picture-item'
import DwNewsArticlesPicture from './dw-news/dw-news-articles/dw-news-articles-picture'
import DwNewsArticlesParagraph from './dw-news/dw-news-articles/dw-news-articles-paragraph'

export default class MainFunction extends React.Component{
    state = {
        nowTimeString:"",
        tabSelected:false,  /* indicated that the "DW" tab is selcted */
        headLineSelected:true,  /* indicated the "HEAD LINES" tab is selected */
        headlineShow:true,  /* to determine whether "DwNewsHeadlines" wil be shown in this component */
        articleSelected:false,  /* indicated the "ARTICLES" tab is selected */
        articleShow:false,  /* to determine whether "DwNewsArticles" wil be shown in this component */
        articleDisable:true,  /* to determine whether the "ARTICLES" tab is visiable */
        headlineClassifyList:[],  /* to store the headline classify, such as "North America" */
        leftSubItemSelected:"",  /* to indicated which SubItem is selected */
        rawHeadlineData:[],  /* to store the raw headline data from the backend server */
        headlineData:[],  /* to store the headline data as React elements */
        // rawHeadlinePicSrc:[],  /* to store the raw headline picture linkSrc from the backend server */
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
                <div className="left-nav-area">
                    {/* <LeftNavigator navName="About"/>  to be designed later */}
                    {/* navigator for the DW News page */}
                    <LeftNavigator
                        navName="DW News"
                        selected={this.state.tabSelected}
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                    {/* sub item of the navigator, such as "North America" and "Europe" */}
                    <LeftSubItem
                        headlineClassifyList={this.state.headlineClassifyList}
                        tabSelected={this.state.tabSelected}
                        navigatorItemClick={this.navigatorItemClick}
                        leftSubItemSelected={this.state.leftSubItemSelected}
                    />
                    {/* navigator for the CBC News page */}
                    <LeftNavigator
                        navName="CBC News"
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                    {/* navigator for the TIME for Kids page */}
                    <LeftNavigator
                        navName="TIME for Kids"
                        leftNavigatorClick={this.leftNavigatorClick}
                    />
                </div>
                <div className="main-function-content">
                    {/* when the left navigator selected for the News tab, show this content page */}
                    <DwNews
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
        this.leftNavigatorClick("DW News")
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
        if(navName==="DW News"){  /* when the "DW News tab is clicked" */
            this.setState({
                tabSelected:true,  /* use to change the LeftNavigator's background color */
                ariticleSourceLink:"",
                articleClicked:"",
            })
            // let result = axios.get('proxy1/dwHeadlineClassify')  /* get the subItem list from backend server */
            let result = axios.get('proxy2/dw/getSubSections')  /* get the subItem list from backend server */
            result.then(
                (response)=>{
                    // console.log(response.data)
                    this.setState({
                        headlineClassifyList:response.data  /* send the list to subItem to show them */
                    })
                    // console.log(response.data[0])
                    this.navigatorItemClick(response.data[0].replace(" ","-"))

                    /* show the LeftSubItem smoothly */
                    let subItemsDiv = document.querySelectorAll(".left-sub-item")[0]
                    let divHeight = 0
                    let heightStep = 40
                    let heightMax = response.data.length * 40
                    // subItemsDiv.style.height = divHeight+'px'
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
        if(navName==="CBC News"){
            this.setState({
                tabSelected:false,
            })
            // let subItemsDiv = document.querySelectorAll(".left-sub-item")[0]
            // subItemsDiv.style.height = 0+'px'
            window.location.assign("/cbc")
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
            // rawHeadlinePicSrc:[],  /* clear the previous data */
            headlinePicSrc:[],  /* clear the previous data */
            translationData:[],
            articleClicked:"",
        })
        // let dataResult = axios.get('proxy1/dwHeadlineDataByClassify/'+itemName)  /* get the headline data from backend server */
        // dataResult.then(
        //     (response)=>{
        //         let rawHeadlineData = response.data
        //         let result1 = []
        //         for(let i=0;i<rawHeadlineData.length;i++){
        //             let data = rawHeadlineData[i]
        //             if(data[0]==='classify'){
        //                 result1.push(<DwNewsHeadlineClassify key={i} classify={data[1]}/>)
        //             }
        //             if(data[0]==='title'){
        //                 let match = false
        //                 if(data[2]===this.state.linkOfPicture){
        //                     match = true
        //                 }
        //                 let clicked = false
        //                 if(data[2]===this.state.articleClicked){
        //                     clicked = true
        //                 }
        //                 result1.push(  /* convert the backend data to the headline title elements */
        //                     <DwNewsHeadlineTitle key={i} 
        //                         title={data[1]}  /* title text */
        //                         link={data[2]}  /* article link of this title */
        //                         date={data[3]} /* article publish date */
        //                         // linkOfPicture={this.state.linkOfPicture}
        //                         match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
        //                         hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
        //                         newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
        //                         clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
        //                     />
        //                 )
        //             }
        //         }
        //         // console.log(result1)
        //         this.setState({
        //             rawHeadlineData:response.data,  /* store the raw backend data */
        //             headlineData:result1,  /* update the headline title elemkents, eventually update the headline page */
        //         })
        //     },
        //     (error)=>{
        //     }
        // )
        // let picResult = axios.get('proxy1/dwHeadlinePicByClassify/'+itemName)    /* get the headline picture linkSrc from backend server */
        // picResult.then(
        //     (response)=>{
        //         // console.log(response.data)
        //         let headlinePic = response.data
        //         let result2 = []
        //         for(let i=0;i<headlinePic.length;i++){
        //             let data = headlinePic[i]
        //             // console.log(data[1])
        //             let match = false
        //             if(data[1]===this.state.linkOfTitle){
        //                 match = true
        //             }
        //             result2.push(  /* convert the backend data to the headline picture elements */
        //                 <RollingPictureItem key={i}
        //                     // picSrc={"http://192.168.1.22:2604/dwPicture"+data[0]}  /* img src */
        //                     picSrc={"proxy1/dwPicture"+data[0]}  /* img src */
        //                     link={data[1]}  /* article link of this picture */
        //                     match={match}  /* whether the title is hover, that title's article link is the same as the picture */
        //                     hoverPictureSelectTitle={this.hoverPictureSelectTitle}  /* the function pass to the picture component */
        //                     newsClicked={this.newsClicked}  /* the function pass to the picture component, for response to the mouse click, finally open the link on the article page */
        //                 />
        //             )
        //         }
        //         this.setState({
        //             rawHeadlinePicSrc:response.data,  /* store the raw backend data */
        //             headlinePicSrc:result2,  /* update the picture elemkents, eventually update the headline page */
        //         })
        //     },
        //     (error)=>{
        //     }
        // )
        let result = axios.get('proxy2/dw/getHeadLinesFromSubSection/'+itemName)  /* get the headline data from backend server */
        result.then(
            (response)=>{
                let headlineData = response.data
                let result1 = []
                let result2 = []
                for(let i=0;i<headlineData.length;i++){
                    let data = headlineData[i]
                    if(data[0]==='subSection'){
                        result1.push(<DwNewsHeadlineClassify key={i} classify={data[1]}/>)
                    }
                    if(data[0]==='headline without cover'){
                        let match = false
                        if(data[2]===this.state.linkOfPicture){
                            match = true
                        }
                        let clicked = false
                        if(data[2]===this.state.articleClicked){
                            clicked = true
                        }
                        result1.push(  /* convert the backend data to the headline title elements */
                            <DwNewsHeadlineTitle key={i} 
                                title={data[1]}  /* title text */
                                link={data[2]}  /* article link of this title */
                                date={data[3]} /* article publish date */
                                match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
                                hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
                                newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                                clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                            />
                        )
                    }
                    if(data[0]==='headline with cover'){
                        let match = false
                        if(data[2]===this.state.linkOfPicture){
                            match = true
                        }
                        let clicked = false
                        if(data[2]===this.state.articleClicked){
                            clicked = true
                        }
                        result1.push(  /* convert the backend data to the headline title elements */
                            <DwNewsHeadlineTitle key={i} 
                                title={data[1]}  /* title text */
                                link={data[2]}  /* article link of this title */
                                date={data[4]} /* article publish date */
                                match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
                                hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
                                newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                                clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                            />
                        )
                        let matchPic = false
                        if(data[2]===this.state.linkOfTitle){
                            matchPic = true
                        }
                        result2.push(  /* convert the backend data to the headline picture elements */
                            <RollingPictureItem key={i}
                                // picSrc={"proxy1/dwPicture"+data[3]}  /* img src */
                                picSrc={"proxy2/dw/getPicture/"+data[3].replaceAll("/","$$&$$")}  /* img src */
                                link={data[2]}  /* article link of this picture */
                                match={matchPic}  /* whether the title is hover, that title's article link is the same as the picture */
                                hoverPictureSelectTitle={this.hoverPictureSelectTitle}  /* the function pass to the picture component */
                                newsClicked={this.newsClicked}  /* the function pass to the picture component, for response to the mouse click, finally open the link on the article page */
                            />
                        )
                    }
                }
                this.setState({
                    rawHeadlineData:response.data,  /* store the raw backend data */
                    headlineData:result1,  /* update the headline title elemkents, eventually update the headline page */
                    headlinePicSrc:result2,  /* update the picture elemkents, eventually update the headline page */
                })
            },
            (error)=>{
            }
        )
    }
    /* 
        when the "HEAD LINES" tab or the "ARTICLES" tab is clicked, execute this function
            1. change the style for the "HEAD LINES" tab and the "ARTICLES" tab
            2. show or hide the "DwNewsHeadlines" "DwNewsArticles" page, depends on which tab is clicked
        This function is sent:
            MainFunction(this) => DwNews(executor)
        The parameter "event" is catch the onclick event to get the specific element
    */
    headTabClick = (event)=>{
        // console.log(event.target.innerText)
        this.jumpDivLeftSet()
        if(event.target.innerText==='HEAD LINES'){
            this.setState({
                /* change the style for the "HEAD LINES" tab and the "ARTICLES" tab */
                /* show or hide the "headlines" "articles" page */
                headLineSelected:true,
                headlineShow:true,
                articleSelected:false,
                articleShow:false,
                translationData:[]
            })

            // update the titles, due to show the articleClicked info
            let rawHeadlineData = this.state.rawHeadlineData
            let result1 = []
            for(let i=0;i<rawHeadlineData.length;i++){
                let data = rawHeadlineData[i]
                // if(data[0]==='classify'){
                //     result1.push(<DwNewsHeadlineClassify key={i} classify={data[1]}/>)
                // }
                // if(data[0]==='title'){
                //     let match = false
                //     if(data[2]===this.state.linkOfPicture){
                //         match = true
                //     }
                //     let clicked = false
                //     if(data[2]===this.state.articleClicked){
                //         clicked = true
                //     }
                //     result1.push(  /* convert the backend data to the headline title elements */
                //         <DwNewsHeadlineTitle key={i} 
                //             title={data[1]}  /* title text */
                //             link={data[2]}  /* article link of this title */
                //             date={data[3]} /* article publish date */
                //             // linkOfPicture={this.state.linkOfPicture}
                //             match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
                //             hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
                //             newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                //             clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                //         />
                //     )
                // }
                if(data[0]==='subSection'){
                    result1.push(<DwNewsHeadlineClassify key={i} classify={data[1]}/>)
                }
                if(data[0]==='headline without cover'){
                    let match = false
                    if(data[2]===this.state.linkOfPicture){
                        match = true
                    }
                    let clicked = false
                    if(data[2]===this.state.articleClicked){
                        clicked = true
                    }
                    result1.push(  /* convert the backend data to the headline title elements */
                        <DwNewsHeadlineTitle key={i} 
                            title={data[1]}  /* title text */
                            link={data[2]}  /* article link of this title */
                            date={data[3]} /* article publish date */
                            match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
                            hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
                            newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                            clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                        />
                    )
                }
                if(data[0]==='headline with cover'){
                    let match = false
                    if(data[2]===this.state.linkOfPicture){
                        match = true
                    }
                    let clicked = false
                    if(data[2]===this.state.articleClicked){
                        clicked = true
                    }
                    result1.push(  /* convert the backend data to the headline title elements */
                        <DwNewsHeadlineTitle key={i} 
                            title={data[1]}  /* title text */
                            link={data[2]}  /* article link of this title */
                            date={data[4]} /* article publish date */
                            match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
                            hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
                            newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                            clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                        />
                    )
                }
            }
            // console.log(result1)
            this.setState({
                headlineData:result1,  /* update the headline title elemkents, eventually update the headline page */
            })
        }
        if(event.target.innerText==='ARTICLES'){
            if(this.state.articleDisable===false){
                this.setState({
                    /* change the style for the "HEAD LINES" tab and the "ARTICLES" tab */
                    /* show or hide the "headlines" "articles" page */
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
        when the "Title" or "Picture" in the "DwNewsHeadlines" is clicked, execute this function
            1. get the news link from the "Title" or "Picture" which is clicked
            2. get the news article data from the backend server
            3. convent the backend data to the elements in DwNewsArticles
            4. store the elements in the "articleData" attribution, eventualy change the acticle page
            5. show the "DwNewsArticles" instead of "DwNewsHeadlines" page, in order to show the news for user
        This function is package into the two elements: DwNewsHeadlineTitle, RollingPictureItem
        The two elements is sent:
            MainFunction(this) => DwNews => DwNewsHeadlines => DwNewsHeadlineTitle/RollingPictureItem
        The parameter "linkSrc" is from the DwNewsHeadlineTitle or RollingPictureItem
    */
    newsClicked = (linkSrc)=>{
        this.jumpDivLeftSet()
        this.setState({
            /* show the "DwNewsArticles" instead of "DwNewsHeadlines" page */
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
        // let result = axios.get('proxy1/dwArticleData'+linkSrc)  /* get the news article data from the backend server */
        let result = axios.get('proxy2/dw/getArticleData/'+linkSrc.replaceAll("/","$$&$$"))  /* get the news article data from the backend server */
        result.then(
            (response)=>{
                let articleData = response.data
                    let result1 = []
                    for(let i=0;i<articleData.length;i++){
                        let data = articleData[i]
                        /* convent the backend data to the elements in DwNewsArticles */
                        if(data[0]==='<img>'){
                            // result1.push(<DwNewsArticlesPicture key={i} pictureSrc={"proxy1/dwPicture"+data[1]}/>)
                            result1.push(<DwNewsArticlesPicture key={i} pictureSrc={"proxy2/dw/getPicture/"+data[1].replaceAll("/","$$&$$")}/>)
                        }else{
                            result1.push(<DwNewsArticlesParagraph key={i} paragraph={data}/>)
                        }
                    }
                this.setState({
                    articleData:result1  /* store the elements in the "articleData" attribution */
                })
            },
            (error)=>{
            }
        )
        result = axios.get('proxy2/dw/getArticleSourceLink/'+linkSrc.replaceAll("/","$$&$$"))  /* get the source link of the article from the backend server */
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
        When the "Title" in DwNewsHeadlines is hover, execute this function
            1. highlight the picture whose article link is the same as the title which is hover
            2. roll the highlight picture to the second place, if posible
        This function is package into the element: DwNewsHeadlineTitle
        The element is sent:
            MainFunction(this) => DwNews => DwNewsHeadlines => DwNewsHeadlineTitle
        The parameter "linkOfTitle" is from the DwNewsHeadlineTitle
    */
    hoverTitleSelectPicture = (linkOfTitle)=>{
        /* roll the highlight picture to the second place, if posible */
        let arr = document.querySelectorAll('.rolling-pictures img')  /* select all the picture components */
        for(let i=0;i<arr.length;i++){
            let imgEle = arr[i]
            if(linkOfTitle===imgEle.alt){  /* it means that the picture's link of article equals the title's link of article */
                let y = imgEle.offsetTop  /* offsetTop is the distance from top of component to the top of browser window */
                if(i>=1){
                    y = arr[i-1].offsetTop  /* let the selected picture go to the second place, not the top of div */
                }
                let rollingPicturesDiv = document.getElementsByClassName("rolling-pictures")[0]
                rollingPicturesDiv.scrollTo({
                    top: y - 110,  /* 110 is the distance from the top of div to the top of browser window */
                    // left: 0,
                    behavior: "smooth",
                })
            }
        }
        // let headlinePic = this.state.rawHeadlinePicSrc
        let headlinePic = this.state.rawHeadlineData
        let result2 = []
        for(let i=0;i<headlinePic.length;i++){
            let data = headlinePic[i]
            if(data[0]==='headline with cover'){
                let match = false
                if(data[2]===linkOfTitle){
                    match = true
                }
                // let clicked = false
                // if(data[2]===this.state.articleClicked){
                //     clicked = true
                // }
                // result2.push(
                //     /* highlight the picture whose article link is the same as the title which is hover */
                //     <RollingPictureItem key={i}
                //         picSrc={"proxy1/dwPicture"+data[0]}  /* img src */
                //         link={data[1]}  /* article link of this picture */
                //         match={match}  /* whether the title is hover, that title's article link is the same as the picture */
                //         hoverPictureSelectTitle={this.hoverPictureSelectTitle}  /* the function pass to the picture component */
                //         newsClicked={this.newsClicked}  /* the function pass to the picture component, for response to the mouse click, finally open the link on the article page */
                //         // clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                //     />
                // )
                result2.push(  /* convert the backend data to the headline picture elements */
                    <RollingPictureItem key={i}
                        // picSrc={"proxy1/dwPicture"+data[3]}  /* img src */
                        picSrc={"proxy2/dw/getPicture/"+data[3].replaceAll("/","$$&$$")}  /* img src */
                        link={data[2]}  /* article link of this picture */
                        match={match}  /* whether the title is hover, that title's article link is the same as the picture */
                        hoverPictureSelectTitle={this.hoverPictureSelectTitle}  /* the function pass to the picture component */
                        newsClicked={this.newsClicked}  /* the function pass to the picture component, for response to the mouse click, finally open the link on the article page */
                    />
                )
            }
        }
        this.setState({
            headlinePicSrc:result2,
        })
    }
    /* 
        When the "Picture" in DwNewsHeadlines is hover, execute this function
            1. highlight the title whose article link is the same as the picture which is hover
        This function is package into the element: RollingPictureItem
        The element is sent:
            MainFunction(this) => DwNews => DwNewsHeadlines => RollingPictureItem
        The parameter "linkOfPicture" is from the RollingPictureItem
    */
    hoverPictureSelectTitle = (linkOfPicture)=>{
        let rawHeadlineData = this.state.rawHeadlineData
        let result1 = []
        for(let i=0;i<rawHeadlineData.length;i++){
            let data = rawHeadlineData[i]
            // if(data[0]==='classify'){
            //     result1.push(<DwNewsHeadlineClassify key={i} classify={data[1]}/>)
            // }
            // if(data[0]==='title'){
            //     let match = false
            //     if(data[2]===linkOfPicture){
            //         match = true
            //     }
            //     let clicked = false
            //     if(data[2]===this.state.articleClicked){
            //         clicked = true
            //     }
            //     result1.push(
            //         /* highlight the title whose article link is the same as the picture which is hover */
            //         <DwNewsHeadlineTitle key={i} 
            //             title={data[1]}  /* title text */
            //             link={data[2]}  /* article link of this title */
            //             date={data[3]} /* article publish date */
            //             linkOfPicture={linkOfPicture}
            //             match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
            //             hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
            //             newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
            //             clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
            //         />
            //     )
            // }
            if(data[0]==='subSection'){
                result1.push(<DwNewsHeadlineClassify key={i} classify={data[1]}/>)
            }
            if(data[0]==='headline without cover'){
                let match = false
                if(data[2]===linkOfPicture){
                    match = true
                }
                let clicked = false
                if(data[2]===this.state.articleClicked){
                    clicked = true
                }
                result1.push(  /* convert the backend data to the headline title elements */
                    <DwNewsHeadlineTitle key={i} 
                        title={data[1]}  /* title text */
                        link={data[2]}  /* article link of this title */
                        date={data[3]} /* article publish date */
                        match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
                        hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
                        newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                        clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                    />
                )
            }
            if(data[0]==='headline with cover'){
                let match = false
                if(data[2]===linkOfPicture){
                    match = true
                }
                let clicked = false
                if(data[2]===this.state.articleClicked){
                    clicked = true
                }
                result1.push(  /* convert the backend data to the headline title elements */
                    <DwNewsHeadlineTitle key={i} 
                        title={data[1]}  /* title text */
                        link={data[2]}  /* article link of this title */
                        date={data[4]} /* article publish date */
                        match={match}  /* whether the picture is hover, that picture's article link is the same as this title */
                        hoverTitleSelectPicture={this.hoverTitleSelectPicture}  /* the function pass to the title component */
                        newsClicked={this.newsClicked}  /* the function pass to the title component, for response to the mouse click, finally open the link on the article page */
                        clicked={clicked}  /* to indicate whether the link has been clicked, so it's to highline the title */
                    />
                )
            }
        }
        this.setState({
            headlineData:result1
        })
    }
    /* 
        here are some functions imitate getting data from the backend server
        they will be replaced by the formal functions when the backend is ready
    */
    getArticleDataImitate = ()=>{
        let t = `Why did Germans immigrate to Brazil 200 years ago?`
        let p1 = `Two centuries ago, there was widespread poverty in Germany. An irresistible offer by the Brazilian emperor back then attracted thousands of German emigrants.`
        let p2 = `The aftermath of the Napoleonic Wars, failed harvests and oppressive tax burdens made life difficult for people in Germany at the beginning of the 19th century.`
        let p3 = `Then came a tempting offer from the other side of the world — 77 hectares of land for every family willing to settle in Brazil. Plus livestock, seeds and agricultural equipment, as well as financial assistance for the first two years.`
        let p4 = `It's more than many German farmers, craftsmen and day laborers ever dared to hope for at home. Soon the first of them responded to the call to say goodbye to their old home.`
        let p5 = `Wanted: Workers in former Portuguese colony`
        let p6 = `In January 1824, a ship named Argus arrived at the port of Rio de Janeiro with around 280 people on board. It was the first ship carrying Germans "in the service of the Brazilian Empire." The new arrivals settled in the states of Santa Catarina and Rio Grande do Sul, and on July 25, 1824, established the city of Sao Leopoldo, named after the Brazilian Emperor's Austrian wife Leopoldine. In fact, she had campaigned for the recruitment of Germans to Brazil.`
        let p7 = `The South American country had moved on from being a Portuguese colony just two years prior, and the decision by Emperor Dom Pedro I to take in the immigrants was not just a gooill gesture. He wanted them to fight, if necessary, against Brazil's enemies, but above all he needed settlers to farm in the country's south.`
        let p8 = `"The end of slavery was in sight, and the question arose as to where to get new workers," said historian Stefan Rinke from the Institute for Latin American Studies at the Free University of Berlin. "People knew that slavery could no longer be maintained in the long term and that it was becoming increasingly difficult to obtain supplies due to the British blockade of the slave trade. And that's when they turned their attention to the German territories. They knew that there were many poor people there who were also under pressure to emigrate."`
        let p9 = `Brazil wanted to 'whiten' its population`
        let p10 = `At the time, Brazil's elite was pursuing another goal with its immigration policy: They wanted to "whiten" their country.`
        let p11 = `"Progress was equated with Europeanization, both of customs and traditions, but also specifically of the population," Rinke told. "They wanted Europeans. And not all Europeans, but above all Central Europeans, because they were considered particularly virtuous, harorking, ambitious and obedient — not unimportant if you wanted new subjects."`
        let p12 = `Over the course of the next century, around 250,000 Germans would find a new home more than 10,000 kilometers (some 6,200 miles) from their homeland.`
        let p13 = `"Here you get a piece of land the size of a county in Germany," a settler who emigrated to Brazil wrote enthusiastically to his family in 1827.`
        let p14 = `The settlers needed space — for their houses, their fields and their livestock. However, the jungle into which the new arrivals cut their paths was not uninhabited. The Indigenous people already living there defended their territory and fought bloody battles with the new German arrivals.`
        let p15 = `Soon, the government hired mercenary troops who mercilessly hunted down the Indigenous people. In the Urwaldboten, a newspaper published in the city of Blumenau, which was founded in 1850, it was stated: "The Bugre [a derogatory term for Indigenous people] are disrupting colonization and traffic between the highlands and the coast. This disturbance must be eliminated as quickly and thoroughly as possible. Sentimental considerations about the unjust practice of Bugre hunts, which contradict the principles of morality, are quite out of place here. The vagabond tribes must be dispersed by a large contingent of Bugre hunters and rangers and thus rendered harmless in one fell swoop."`
        let p16 = `Isolated in the enclave`
        let p17 = `The native population didn't stand a chance against their hunters — two-thirds of the Indigenous population were wiped out.`
        let p18 = `The German settlements, on the other hand, prospered. The immigrants upheld the customs of their old homeland and continued to speak German. Only a few spoke Portuguese and the people didn't really mix with their new neighbors. Many of the immigrants still celebrated the kaiser's birthday and donated large sums of money to the fatherland during World War I.`
        let p19 = `This isolation led to a great deal of skepticism among the Brazilian population, and warnings about the "German danger" became more and more apparent. When the National Socialists were gaining ground in Germany in the 1930s, quite a few immigrants of German descent became enthusiastic about Adolf Hitler. Indeed, Brazil had the largest Nazi party outside Germany, and children would sing Nazi anthems in schools.`
        let p20 = `German banned, German clubs and schools closed`
        let p21 = `Eventually, then-President Getulio Vargas clamped down. The Nazi Party and the German-language press were banned, German clubs and schools were closed, and the use of the German language was made a criminal offense.`
        let p22 = `"This was because Brazil had declared war on Germany in both world wars, so it was also a question of internal security," said Frederik Schulze from the Ibero-American Institute in Berlin. "When Brazilian ships were also sunk by German submarines, there were riots against German businesses run by Brazilians. In other words, the war rekindled the whole mood, so to speak."`
        let p23 = `In 1945, Nazi Germany was in ruins and German culture had fallen into disrepute. The German-Brazilians lost contact with the homeland of their ancestors. They learned Portuguese, and their children felt as if they were naturally part of Brazilian society.`
        let p24 = `Some German traditions have survived`
        let p25 = `It's rare to hear the German language spoken in an old-fashioned dialect, but the influence of the immigrants in southern Brazil is still visible today. Visitors to the region can see half-timbered houses and enjoy sauerkraut with pork knuckle or apple strudel for dessert.`
        let p26 = `The town of Blumenau, founded in 1850 in the middle of the jungle by the German pharmacist Hermann Blumenau, is famous for its Oktoberfest, one of the world's largest after Munich.`
        let p27 = `The trend has now reversed. Just as hundreds of thousands of Germans emigrated to Brazil 200 years ago, Brazilians are now moving in the opposite direction. According to the Foreign Affairs Ministry, around 160,000 Brazilians currently reside in Germany.`
        let p28 = `This article was originally written in German.`
        let ps1 = "/img/a01.jpg"
        let ps2 = "/img/a02.jpg"
        let ps3 = "/img/a03.jpg"
        let ps4 = "/img/a04.jpg"
        let ps5 = "/img/a05.jpg"
        let ps6 = "/img/a06.jpg"
        let ps7 = "/img/a07.jpg"

        let newsData = [
            ['title',t],
            ['paragraph',p1],
            ['picture',ps1],
            ['paragraph',p2],
            ['paragraph',p3],
            ['paragraph',p4],
            ['paragraph',p5],
            ['paragraph',p6],
            ['picture',ps2],
            ['paragraph',p7],
            ['paragraph',p8],
            ['picture',ps3],
            ['paragraph',p9],
            ['paragraph',p10],
            ['paragraph',p11],
            ['paragraph',p12],
            ['paragraph',p13],
            ['picture',ps4],
            ['paragraph',p14],
            ['paragraph',p15],
            ['picture',ps5],
            ['paragraph',p14],
            ['paragraph',p15],
            ['paragraph',p16],
            ['paragraph',p17],
            ['picture',ps6],
            ['paragraph',p18],
            ['paragraph',p19],
            ['paragraph',p20],
            ['paragraph',p21],
            ['paragraph',p22],
            ['paragraph',p23],
            ['paragraph',p24],
            ['paragraph',p25],
            ['paragraph',p26],
            ['picture',ps7],
            ['paragraph',p27],
            ['paragraph',p28],
        ]
        return newsData
    }
    getHeadlineDataImitate = ()=>{
        let headlineData = [
            ["classify","News"],
            ["title","Libya central bank halts operations over employee abduction","linkIndex01"],
            ["title","Convicts injured employee in Bavaria hospital escape. Convicts injured employee in Bavaria hospital escape","linkIndex02"],
            ["title","Ukraine updates: Zelenskyy seeks Kursk 'buffer zone","linkIndex03"],
            ["title","Die Linke leaders Wissler and Schirdewan to step down","linkIndex04"],
            ["title","Ferris wheel fire started by 'material' under ride — police","linkIndex05"],
            ["title","Middle East updates: Blinken in Israel for Gaza deal talks","linkIndex06"],
            ["classify","News"],
            ["title","Libya central bank halts operations over employee abduction","linkIndex07"],
            ["title","Convicts injured employee in Bavaria hospital escape. Convicts injured employee in Bavaria hospital escape","linkIndex08"],
            ["title","Ukraine updates: Zelenskyy seeks Kursk 'buffer zone","linkIndex09"],
            ["title","Die Linke leaders Wissler and Schirdewan to step down","linkIndex10"],
            ["title","Ferris wheel fire started by 'material' under ride — police","linkIndex12"],
            ["title","Middle East updates: Blinken in Israel for Gaza deal talks","linkIndex13"]
        ]
        return headlineData
    }
    getHeadlinePicImitate = ()=>{
        let headlinePic = [
            ["/img/01.jpg","linkIndex01"],
            ["/img/02.jpg","linkIndex02"],
            ["/img/03.jpg","linkIndex03"],
            ["/img/04.jpg","linkIndex04"],
            ["/img/05.jpg","linkIndex05"],
            ["/img/01.jpg","linkIndex06"],
            ["/img/02.jpg","linkIndex07"],
            ["/img/03.jpg","linkIndex08"],
            ["/img/04.jpg","linkIndex09"],
            ["/img/05.jpg","linkIndex10"],
        ]
        return headlinePic
    }
    /* 
        when the Ctrl key is press and release
            1. if nothing is selected, clear the translation frame
            2. if something is selected, get the translation data from backend server
            3. show the data which is back from backend server
            4. if nothing back from backend, show something explain
        The element is sent:
            MainFunction(this) => DwNews => RightTranslate
    */
    translateFunction = ()=>{
        document.addEventListener("keyup",(event)=>{
            if(event.key==="Control"){
                let selection = window.getSelection()
                if(selection.anchorNode!==null){
                    let word = selection.toString()  /* Got the selection text */
                    word = word.trim()
                    if(word.length>0){
                        let main = document.querySelectorAll(".content-area")[0]
                        let x = main.offsetLeft
                        // let w = main.offsetWidth
                        // console.log("x",x)
                        // console.log("w",w)
                        // let frameWidth = x
                        // if(frameWidth>300){
                        //     frameWidth = 300
                        // }
                        this.setState({
                            // translationFrameSetting:[frameWidth+'px',(x+w)+'px','100px'],
                            // translationFrameSetting:[(frameWidth-10)+'px',(x+w)+'px','100px'],
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
                                // console.log(translationData)
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
                                // console.log(error)
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