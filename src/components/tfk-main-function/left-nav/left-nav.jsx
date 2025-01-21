import React from 'react'
import './left-nav.css'

export default class LeftNavigator extends React.Component{
    render(){
        let {navName,selected} = this.props
        let virtualDOM = (
            <div onClick={this.mouseClick} className={selected?"left-nav-tfk navSelected":"left-nav-tfk"}>
                {navName}
            </div>
        )
        return virtualDOM
    }
    mouseClick = ()=>{
        this.props.leftNavigatorClick(this.props.navName)
        // window.location.assign("/tfk")
    }
}