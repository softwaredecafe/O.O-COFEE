const Spotlight = () => {
  return (
    <section className="spotlight">
      <div className="container">
        <div className="spotlight-content">
          <div className="spotlight-text">
            <h2>Producer Spotlight</h2>
            <p><strong>From Farm to Cup Excellence</strong></p>
            <p>Meet our featured coffee producers who dedicate their lives to growing exceptional beans. Their passion for quality and sustainable farming practices ensures every cup delivers an extraordinary experience.</p>
            <p>Discover the stories behind our carefully selected coffee origins and the people who make it all possible.</p>
          </div>
          <div className="spotlight-image">
            <img 
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Coffee farmer" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Spotlight