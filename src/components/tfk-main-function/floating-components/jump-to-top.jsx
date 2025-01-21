import React from 'react'
import './jump-to-top.css'

export default class JumpToTop extends React.Component{
    render(){
        let topSetting = (780 - 920 + this.props.jumpDivSetting[1]) + "px"
        let virtualDOM = (
            <div className='stucture-div'>
                <div
                    className={this.props.articleShow?'jump-to-top-tfk':'jump-to-top-tfk hidden'}
                    onClick={this.mouseClick}
                    style={{
                        left:this.props.jumpDivSetting[0],
                        top:topSetting
                    }}
                ></div>
            </div>
        )
        return virtualDOM
    }
    mouseClick = ()=>{
        this.props.jumpToTop()
    }
}