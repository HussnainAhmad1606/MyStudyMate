import React from 'react'

function HeroSection() {
  return (
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Master Your Studies</h1>
        <p className="mb-5">
        Your Personalized Study Companion for Success
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  )
}

export default HeroSection