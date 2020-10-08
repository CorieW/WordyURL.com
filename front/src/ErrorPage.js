import React from 'react'
import DocumentTitle from 'react-document-title';
import './ErrorPage.css'

export default function ErrorPage() {
    return (
        <DocumentTitle title="Error - WordyURL">
            <div className="container">
                <h1 className="page-title">It seems an error occurred somewhere</h1>
                <h2><a href="/">Return to main page</a></h2>
            </div>
        </DocumentTitle>
    )
}
