import React from 'react'
import './left-sub-item.css'

export default class LeftSubItem extends React.Component{
    render(){
        let {headlineClassifyList,tabSelected} = this.props
        let elements = this.getClassifyList(headlineClassifyList)
        let virtualDOM = (
            <div className={tabSelected?'left-sub-item-tfk':'left-sub-item-tfk hidden'}>
                {elements}
            </div>
        )
        return virtualDOM
    }
    getClassifyList = (headlineClassifyList)=>{
        let result = []
        for(let i=0;i<headlineClassifyList.length;i++){
            result.push(
                <Item
                    text={headlineClassifyList[i]}
                    key={i}
                    leftSubItemSelected={this.props.leftSubItemSelected}
                    navigatorItemClick={this.props.navigatorItemClick}
                />)
        }
        return result
    }
}

class Item extends React.Component{
    render(){
        let {text,leftSubItemSelected} = this.props
        let selected = false
        if((text.replaceAll(" ","-"))===(leftSubItemSelected.replaceAll(" ","-"))){
            selected = true
        }
        let virtualDOM = (
            <div className={selected?'itemSelected':'item'} onClick={this.mouseClick}>
                <span>{text}</span>
            </div>
        )
        return virtualDOM
    }
    mouseClick = ()=>{
        this.props.navigatorItemClick(this.props.text.replaceAll(" ","-"))
        // window.location.assign("/tfk/"+this.props.text.replaceAll(" ","-").toLowerCase())
    }
}