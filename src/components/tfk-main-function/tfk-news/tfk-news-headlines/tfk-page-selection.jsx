import React from 'react'
import './tfk-page-selection.css'

export default class PageSelection extends React.Component{
    render(){
        let currentPage = parseInt(this.props.currentPage)
        let maxPage = parseInt(this.props.maxPage)

        /* arrange the pageList depend on currentPage and maxPage */
        let pageList = [currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2]
        for(let j=0;j<2;j++){  // ensure currentPage-2 > 0
            if(pageList[0]<1){
                for(let i=0;i<pageList.length;i++){
                    pageList[i] = pageList[i]+1
                }
            }
        }
        for(let j=0;j<2;j++){  // ensure currentPage+2 < maxPage
            if(pageList[4]>maxPage){
                for(let i=0;i<pageList.length;i++){
                    pageList[i] = pageList[i]-1
                }
            }
        }
        for(let j=0;j<2;j++){  // if there is still one or two item less than 0, it means the maxPage < 5
            if(pageList[0]<1){
                pageList.shift()  // so we should remove the item(<0) from the head of pageList
            }
        }

        /* generate the list of PageSelectionItme */
        let itemList = []
        if(currentPage===1){
            itemList.push(<PageSelectionItme
                key={-3}
                text="<<"
                hasLink={false}
            />)
            itemList.push(<PageSelectionItme
                key={-2}
                text="<"
                hasLink={false}
            />)
        }else{
            itemList.push(<PageSelectionItme
                key={-3}
                text="<<"
                hasLink={true}
                getHeaders={this.props.getHeaders}
                currentPage={"1"}
                leftSubItemSelected={this.props.leftSubItemSelected}
            />)
            itemList.push(<PageSelectionItme
                key={-2}
                text="<"
                hasLink={true}
                getHeaders={this.props.getHeaders}
                currentPage={String(currentPage-1)}
                leftSubItemSelected={this.props.leftSubItemSelected}
            />)
        }
        for(let i=0;i<pageList.length;i++){
            if(pageList[i]===currentPage){
                itemList.push(<PageSelectionItme
                    key={i+1}
                    text={String(pageList[i])}
                    current={true}
                    hasLink={false}
                />)
            }else{
                itemList.push(<PageSelectionItme
                    key={i+1}
                    text={String(pageList[i])}
                    current={false}
                    hasLink={true}
                    getHeaders={this.props.getHeaders}
                    currentPage={String(pageList[i])}
                    leftSubItemSelected={this.props.leftSubItemSelected}
                />)
            }
        }
        if(currentPage===maxPage){
            itemList.push(<PageSelectionItme
                key={-1}
                text=">"
                hasLink={false}
            />)
            itemList.push(<PageSelectionItme
                key={0}
                text=">>"
                hasLink={false}
            />)
        }else{
            itemList.push(<PageSelectionItme
                key={-1}
                text=">"
                hasLink={true}
                getHeaders={this.props.getHeaders}
                currentPage={String(currentPage+1)}
                leftSubItemSelected={this.props.leftSubItemSelected}
            />)
            itemList.push(<PageSelectionItme
                key={0}
                text=">>"
                hasLink={true}
                getHeaders={this.props.getHeaders}
                currentPage={String(maxPage)}
                leftSubItemSelected={this.props.leftSubItemSelected}
            />)
        }

        let sizeList = 40*itemList.length + "px"
        let virtualDOM = (
            <div className={
                this.props.headlineShow?
                    'tfk-page-selection float-clear'
                :
                    'tfk-page-selection float-clear hidden'
            }>
                <div
                    style={{width:sizeList}}
                >
                    {itemList}
                </div>
            </div>
        )
        return virtualDOM
    }
}
class PageSelectionItme extends React.Component{
    render(){
        let virtualDOM = (
            <div className={
                this.props.current?
                    this.props.hasLink?
                        'tfk-page-selection-item current float-left'
                    :
                        'tfk-page-selection-item current noLink float-left'
                :
                    this.props.hasLink?
                        'tfk-page-selection-item float-left'
                    :
                        'tfk-page-selection-item noLink float-left'
                }
                onClick={this.mouseClick}
            >
                <span>{this.props.text}</span>
            </div>
        )
        return virtualDOM
    }
    mouseClick = ()=>{
        if(this.props.hasLink){
            let subSection = this.props.leftSubItemSelected
            let linkSrc
            let currentPage = this.props.currentPage
            this.props.getHeaders(subSection,linkSrc,currentPage)
        }
    }
}