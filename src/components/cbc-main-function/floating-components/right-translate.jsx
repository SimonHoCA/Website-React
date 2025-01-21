import React from 'react'
import './right-translate.css'

export default class RightTranslate extends React.Component{
    render(){
        let virtualDOM = (
            <div className='stucture-div'>
                <div
                    className={this.props.articleShow?'right-translate-cbc':'right-translate-cbc hidden'}
                    style={{
                        left:this.props.translationFrameSetting[0],
                    }}
                >
                    {this.props.translationData}
                </div>
            </div>
        )
        return virtualDOM
    }
}