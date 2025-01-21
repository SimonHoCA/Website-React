import React from 'react'
import './root-component.css'
import {RouterProvider} from 'react-router-dom'
import router from '../router'

export default class RootComponent extends React.Component{
    render(){
        let virtualDOM = (
            <div className="page-body">
                <div className="content-area">
                    <RouterProvider router={router}/>  {/* jump to router.js to determine which page is shown */}
                </div>
            </div>
        )
        return virtualDOM
    }
}