import { useEffect, useRef } from 'react'
import afterImage from '../../assets/after.png'
import beforeImage from '../../assets/before.png'
import concernsLeafImage from '../../assets/skin_leaf.png'
import solutionLeafImage from '../../assets/skin_leaf_bottom.png'
import { BeforeAfterSlider } from '../BeforeAfterSlider/BeforeAfterSlider'
import './SkinConcerns.scss'

export function SkinConcerns() {
  const concernsRef = useRef(null)

  useEffect(() => {
    const section = concernsRef.current

    if (!section) return undefined

    const revealElements = section.querySelectorAll('[data-reveal]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 480px)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: isMobile ? 0.01 : 0.18,
        rootMargin: isMobile ? '0px 0px -5% 200px' : '0px 0px -8% 0px',
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="skin-concerns" ref={concernsRef}>
      <div className="skin-concerns__container container">
        <img
          className="skin-concerns__decorative-leaf"
          src={concernsLeafImage}
          alt=""
          aria-hidden="true"
        />

        <h2 className="skin-concerns__title">Помічаєш перші ознаки вікових змін?</h2>

        <div className="skin-concerns__content">
          <div className="skin-concerns__info">
            <div
              className="skin-concerns__message skin-concerns__message--problem"
              data-reveal
            >
              <p className="skin-concerns__note">
                Знижена пружність, поява тонких ліній, сухість і відчуття стягнутості можуть
                робити обличчя більш втомленим і тьмяним на вигляд.
              </p>
              <span className="skin-concerns__emoji skin-concerns__emoji--problem" aria-hidden="true">😔</span>
            </div>

            <div
              className="skin-concerns__message skin-concerns__message--solution"
              data-reveal
            >
              <span className="skin-concerns__emoji skin-concerns__emoji--solution" aria-hidden="true">✨</span>
              <p className="skin-concerns__feature">
                Peptide-Tox Bor Cream допомагає підтримувати комфортний стан шкіри та дарує їй комплексний догляд. 
                Насичена формула з 5 видами пептидів і комплексом керамідів сприяє більш гладенькому й пружному вигляду, 
                підтримує оптимальний рівень зволоження та допомагає зберігати гідроліпідний баланс. Обличчя виглядає більш свіжим, відпочилим і доглянутим.
              </p>
              <img
                className="skin-concerns__solution-leaf"
                src={solutionLeafImage}
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="skin-concerns__comparison">
            <BeforeAfterSlider
              beforeSrc={beforeImage}
              afterSrc={afterImage}
              beforeAlt="Стан шкіри до використання крему"
              afterAlt="Стан шкіри після використання крему"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
