import React from 'react'
import DocumentTitle from 'react-document-title';
import './Notfound.css'

export default function Notfound() {
    return (
        <DocumentTitle title="Page Not Found - WordyURL">
            <div className="container">
                <h1 className="page-title">Page not found!</h1>
                <h2><a href="/">Return to main page</a></h2>
            </div>
        </DocumentTitle>
    )
}
