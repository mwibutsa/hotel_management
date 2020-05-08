import React from 'react'
import classes from './PageContainer.module.css'
import Footer from '../../../components/footer/Footer'
import Navigation from '../../navigation/Navigation'

const PageContainer = props => {
    return <React.Fragment>
        <div className={classes.PageContainer}>
            <div className={classes.MainContainer}>
                <Navigation />
                {props.children}
            </div>
            <Footer />
        </div>
    </React.Fragment>
}

export default PageContainer