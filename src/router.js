import {createBrowserRouter,Navigate} from 'react-router-dom';
import DW from './components/dw-main-function/main-function'
import CBC from './components/cbc-main-function/main-function'
import TFK from './components/tfk-main-function/main-function'

const router = createBrowserRouter([
    {
        path: '/dw',
        element: <DW/>,  // the DW Main function page
    },
    {
        path: '/cbc',
        element: <CBC/>,  // the CBC Main function page
    },
    {
        path: '/tfk',
        element: <TFK/>,  // the TIME for Kids Main function page
        children:[
            {
                path: ':subSection',
                element: <TFK/>,
            },
            {
                path: ':subSection/:page',
                element: <TFK/>,
            },
            {
                path: 'article/:articleId',
                element: <TFK/>,
            },
            {
                path: '*',
                element: <Navigate to='/tfk'/>,
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to='/tfk'/>  // redirect to tfk page
    },
    {
        path: '*',  // all the pages not found
        element: <Navigate to='/tfk'/>  // redirect to tfk page
    }
])
export default router