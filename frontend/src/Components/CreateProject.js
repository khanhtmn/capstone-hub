import React, { useEffect, useState } from "react";
import './CreateProject.css'

const base64 = require('base-64');

const CreateProject = () => {
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
  const [keywords, setKeywords] = useState('')
  const [feature, setFeature] = useState('')
  const [los, setLos] = useState('')
  const [customLos, setCustomLos] = useState('')
  const [hsrReview, setHsrReview] = useState('')

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed Create New User")
    let opts = {
      'title': title,
      'abstract': abstract,
      'keywords': keywords,
      'feature': feature,
      'los': los,
      'custom_los': customLos,
      'hsr_review': hsrReview,
    }
    console.log(opts)
    fetch('/projects', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'x-access-tokens':localStorage.getItem("token")
      },
      body: JSON.stringify(opts)
    }).then(response => response.json())
      .then(data => {
        console.log("Here is the submitted data", data)
        if (data.status==201){
          console.log(title, abstract)
          window.history.pushState({}, undefined, "/")
          window.location.reload()
        }
        else {
          console.log("Error has occured")
        }
      })
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAbstractChange = (e) => {
    setAbstract(e.target.value)
  }

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value)
  }

  const handleFeatureChange = (e) => {
    setFeature(e.target.value)
  }

  const handleLosChange = (e) => {
    setLos(e.target.value)
  }

  const handleCustomLosChange = (e) => {
    setCustomLos(e.target.value)
  }

  const handleHsrReviewChange = (e) => {
    setHsrReview(e.target.value)
  }

  return (
    <div className="CreateProject">
      <div className="SmallBox">
        <p>Let's submit your project </p>
        <form action="#">

          <p>Title</p>
          <div>
            <input type="text" 
              placeholder="Title" 
              onChange={handleTitleChange}
              value={title} 
            />
          </div>

          <p>Abstract</p>
          <div>
            <input
              type="text"
              placeholder="Abstract"
              onChange={handleAbstractChange}
              value={abstract}
            />
          </div>

          <p>Keywords</p>
          <div>
            <input
              type="text"
              placeholder="Keywords"
              onChange={handleKeywordsChange}
              value={keywords}
            />
          </div>

          <p>Feature</p>
          <div>
            <input
              type="text"
              placeholder="Feature"
              onChange={handleFeatureChange}
              value={feature}
            />
          </div>

          <p>LOs</p>
          <div>
            <input
              type="text"
              placeholder="LOs"
              onChange={handleLosChange}
              value={los}
            />
          </div>

          <p>Custom LOs</p>
          <div>
            <input
              type="text"
              placeholder="Custom LOs"
              onChange={handleCustomLosChange}
              value={customLos}
            />
          </div>

          <p>HSR Review</p>
          <div>
            <input
              type="text"
              placeholder="HSR Review"
              onChange={handleHsrReviewChange}
              value={hsrReview}
            />
          </div>

          <button onClick={onSubmitClick} type="submit">
            Save my project
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject;
