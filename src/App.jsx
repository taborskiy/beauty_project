import { ProductHero } from './components/ProductHero/ProductHero'
import { SkinConcerns } from './components/SkinConcerns/SkinConcerns'

function App() {
  return (
    <div className="page-shell">
      <ProductHero />
      <SkinConcerns />
      <div className="scroll-spacer" aria-hidden="true" />
    </div>
  )
}

export default App
