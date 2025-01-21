import React from 'react'
import './left-nav.css'

export default class LeftNavigator extends React.Component{
    render(){
        let {navName,selected} = this.props
        let virtualDOM = (
            <div onClick={this.mouseClick} className={selected?"left-nav-cbc selected":"left-nav-cbc"}>
                {navName}
            </div>
        )
        return virtualDOM
    }
    mouseClick = ()=>{
        this.props.leftNavigatorClick(this.props.navName)
    }
}