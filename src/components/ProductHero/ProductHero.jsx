import { useEffect, useRef } from 'react'
import leafImage from '../../assets/leaf.png'
import './ProductHero.scss'

export function ProductHero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hero || reduceMotion) return undefined

    let frameId = 0

    const updateParallax = () => {
      const { top, height } = hero.getBoundingClientRect()
      const scrollDistance = Math.min(Math.max(-top, 0), height)

      hero.style.setProperty('--hero-parallax-offset', `${scrollDistance * -0.2}px`)
      hero.style.setProperty('--leaf-parallax-offset', `${scrollDistance * 0.2}px`)
      frameId = 0
    }

    const requestParallaxUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true })
    window.addEventListener('resize', requestParallaxUpdate)

    return () => {
      window.removeEventListener('scroll', requestParallaxUpdate)
      window.removeEventListener('resize', requestParallaxUpdate)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section className="product-hero" ref={heroRef}>
      <div className="product-hero__container container">
        <div className="product-hero__background" aria-hidden="true" />
        <img className="product-hero__leaf" src={leafImage} alt="" aria-hidden="true" />

        <div className="product-hero__text">
          <div className="product-hero__eyebrow">
            <div className="product-hero__eyebrow-dot" />
            КОРЕЙСЬКА КОСМЕТИКА | 100% ОРИГІНАЛ
          </div>

          <h1 className="product-hero__title">
            Ліфтинг-крем для обличчя Peptide Tox Bor Cream — для пружної та гладенької шкіри.
          </h1>

          <p className="product-hero__description">
            Допомагає розгладити видимість зморшок і підтримує оптимальний гідроліпідний баланс. 
            Шкіра виглядає більш гладенькою, зволоженою та доглянутою вже після перших етапів догляду.
          </p>

          <button className="product-hero__button" type="button">
            Додати до кошика
          </button>
        </div>

        <div className="product-hero__spacer" aria-hidden="true" />
      </div>
    </section>
  )
}
