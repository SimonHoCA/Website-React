import React from 'react'
import './jump-to-bottom.css'

export default class JumpToBottom extends React.Component{
    render(){
        let topSetting = (840 - 920 + this.props.jumpDivSetting[1]) + "px"
        let virtualDOM = (
            <div className='stucture-div'>
                <div
                    className={this.props.articleShow?'jump-to-bottom':'jump-to-bottom hidden'}
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
        this.props.jumpToBottom()
    }
}