import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DocumentTitle from 'react-document-title';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Redirection(props)
{
    const [url, setUrl] = useState(undefined)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() =>
    {
        let shortUrl = props.location.pathname.split("/")[1]
        if (shortUrl.length > 0) {
            axios({
                method: 'GET',
                url: '/api/urls/' + shortUrl
            }).then(res =>
            {
                setUrl(res.data)
                setLoaded(true)
            }).catch(err =>
            {
                setError(err)
                setLoaded(true)
            })
        }
        else {
            setLoaded(true)
        }
    }, [props])
    

    return (
        <DocumentTitle title="Redirecting - WordyURL">
            <div className="container">
                <h1 className="page-title">Redirecting...</h1>
                <p>The page should redirect within a few seconds...</p>
                <Router>
                    <Switch>
                        <Route path="/" render={() =>
                        {
                            if (!error) {
                                if (loaded) {
                                    if (url.length > 0) {
                                        window.location = url
                                    }
                                    else {
                                        window.location = "/notfound"
                                    }
                                }
                            }
                            else {
                                window.location = "/error"
                            }
                        }} />
                    </Switch>
                </Router>
            </div>
        </DocumentTitle>
    )
}
