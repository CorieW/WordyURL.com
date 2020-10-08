import React, { useState } from 'react'
import axios from 'axios';
import DocumentTitle from 'react-document-title';
import './Home.css'

export default function Home()
{
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    

    function handleChange(event) {
        setUrl(event.target.value)
    }

    function handleSubmit(e)
    {
        setError(null);
        setLoading(true)
        setShortUrl("")
        setUrl(url)

        // The following POST request also returns the newly generated short URL
        axios({
            method: 'POST',
            url: '/api/urls',
            params: { url: url }
        }).then(res =>
        {
            setLoading(false)
            setShortUrl(res.data)
        })
        .catch(err =>
        {
            setLoading(false)
            setError(err);
        })
    }

    return (
        <DocumentTitle title="Home - WordyURL">
            <div>
                <div className="container">
                    <div className="content">
                        <h1 className="page-title">Create a Memorable URL</h1>
                        <div className="short-url-form">
                            <span>http:// </span>
                            <input type="text" name="url" placeholder="Redirect URL" onChange={handleChange} />
                            <button type="button" onClick={handleSubmit}>Create Memorable URL</button>
                        </div>
                        <div className="info-headers">
                            <h2 className="info-header important-text"><a href={`https://WordyURL.com/${shortUrl}`}>{ shortUrl.length > 0 && "https://WordyURL.com/" }<strong>{ shortUrl }</strong></a></h2>
                            <h2 className="info-header important-text">{loading && "Generating memorable url..."}</h2>
                            <h2 className="info-header important-text">{error && "An error has occurred, please try again!"}</h2>
                        </div>
                        <div className="info">
                            <p>Shorten a hard to remember URL into something easier to remember.
                                To create a memorable URL all you need to do is enter a URL into the input and then click <strong>'Create Memorable URL'</strong>.
                                The output URL will redirect you to the original URL whenever visited.</p>
                            <img src="use-example.png" className="use-example" alt="Example use" />
                            <p>Developers can use a POST request to create memorable URLs. For example, by requesting <strong>'/api/urls?url=test.com'</strong>,
                                a new memorable URL will be generated as a result. The response provided by the POST request will be the new memorable URL.
                                For example, <strong>'new-memorable-url'</strong> will be the response.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}
