import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import cloudflareLogo from './assets/cloudflare.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('unknown')
  const [aiMessage, setAiMessage] = useState('')
  const [aiSource, setAiSource] = useState('')
  const [loadingAi, setLoadingAi] = useState(false)

  const handleGenerateAi = async () => {
    setLoadingAi(true)
    try {
      const res = await fetch('/api/ai')
      const data = await res.json()
      setAiMessage(data.message)
      setAiSource(data.source || 'Cloudflare AI')
    } catch (err) {
      console.error(err)
      setAiMessage('Error al consultar el Worker de IA')
    } finally {
      setLoadingAi(false)
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Práctica 5: Cloudflare + IA</h1>
          <p>
            Aplicación en Cloudflare con soporte para <code>Workers AI</code>
          </p>
        </div>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
          <li>
            <button
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
          </li>
          <li>
            <button
              className="counter"
              onClick={() => {
                fetch('/api/')
                  .then((res) => res.json())
                  .then((data) => setName(data.name))
              }}
              aria-label='get name'
            >
              API Worker: {name}
            </button>
          </li>
          <li>
            <button
              className="counter ai-button"
              onClick={handleGenerateAi}
              disabled={loadingAi}
              aria-label='generar consejo con IA'
            >
              {loadingAi ? 'Generando...' : '✨ Consejo con IA'}
            </button>
          </li>
        </ul>

        {aiMessage && (
          <div className="ai-result-box">
            <div className="ai-tag">🤖 {aiSource}</div>
            <p className="ai-text">"{aiMessage}"</p>
          </div>
        )}

      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
            <li>
              <a href="https://workers.cloudflare.com/" target="_blank">
                <img className="button-icon" src={cloudflareLogo} alt="" />
                Workers Docs
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
