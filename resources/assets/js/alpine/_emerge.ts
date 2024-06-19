import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function (Alpine) {
  Alpine.directive(
    "emerge",
    async (el, { value, expression, modifiers }, { evaluate, cleanup }) => {
      let options = evaluate(expression.length > 0 ? expression : "{}")

      setUpElementStorageMap(el, value, modifiers, options)

      await ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) {
          console.log(el)

          t.kill()
        }
      })

      if (el._x_emerge.scrub) {
        doScrubbedAnimation(el, modifiers, options)
        
        return
      }

      let trigger = el
      let delay = 0
      let count = 0

      if (value == 'parent') {
        for (const child of el.children) {
          const delay = modifierValue(
            modifiers,
            'delay',
            300
          )

          gsap.killTweensOf(child)

          doAutoAnimation(child, el, modifiers, options, delay * count)

          count++
        }

        return
      }

      if (value == 'child') {
        trigger = el.parentElement
        delay = modifierValue(
          modifiers,
          'delay',
          Array.from(el.parentNode.children).indexOf(el) * 300
        )
      }

      doAutoAnimation(el, trigger, modifiers, options, delay)
    },
  )
}

function setUpElementStorageMap(el, value, modifiers, options) {
  if (! el._x_emerge) {
    el._x_emerge = {
      from: {},
      to: {},
      start: 'top bottom',
      end: 'top center',
      scrub: false,
      debug: false
    }
  }

  if (modifiers.includes("debug")) {
    el._x_emerge.debug = true
  }
  
  if (modifiers.includes("scrub")) {
    el._x_emerge.scrub = true
  }

  if (value == 'from') {
    el._x_emerge.from = options
  }

  if (value == 'to') {
    el._x_emerge.to = options
  }

  if (modifiers.includes('start')) {
    el._x_emerge.start = `${modifierValue(modifiers, "start", "top")} ${modifierValue(modifiers, "start", "bottom", 2)}`
  }

  if (modifiers.includes('end')) {
    el._x_emerge.end = `${modifierValue(modifiers, "end", "top")} ${modifierValue(modifiers, "end", "center", 2)}`
  }
}

function doScrubbedAnimation(el, modifiers, options) {
  if (options.hasOwnProperty("z")) {
      gsap.set(el, { transformPerspective: 500 })
  }

  // const tl = gsap.timeline({
  //     scrollTrigger: {
  //         trigger: el,
  //         scrub: modifierValue(modifiers, "scrub", true),
  //         start: el._x_emerge.start,
  //         end: el._x_emerge.end,
  //     },
  // })

  gsap.fromTo(
    el, 
    el._x_emerge.from,
    {
      scrollTrigger: {
          trigger: el,
          scrub: modifierValue(modifiers, "scrub", true),
          start: el._x_emerge.start,
          end: el._x_emerge.end,
      },
      ...el._x_emerge.to 
    }
  )
}

function doAutoAnimation(el, trigger, modifiers, options, delay = 0) {
    const defaultOptions = {
      opacity: 0,
      paused: true,
      ease: 'power2.inOut',
    }

    if (Object.keys(options).length === 0) {
      defaultOptions.y = 150
    }

    defaultOptions.delay = Number(modifierValue(modifiers, 'delay', delay)) / 1000
    
    defaultOptions.duration = Number(modifierValue(modifiers, 'duration', 500)) / 1000

    const animation = gsap.from(el, {
      ...defaultOptions,
      ...options,
    })

    ScrollTrigger.create({
      trigger: trigger,
      start: `${modifierValue(modifiers, 'start', 'top')} ${modifierValue(
        modifiers,
        'start',
        '75%',
        2,
      )}`,
      once: modifiers.includes('once'),
      onEnter: () => animation.restart(true),
    })

    ScrollTrigger.create({
      trigger: trigger,
      start: `${modifierValue(modifiers, 'reverse', 'top')} ${modifierValue(
        modifiers,
        'reverse',
        'bottom',
        2,
      )}`,
      onLeaveBack: () =>
        modifiers.includes('reverse')
          ? animation.reverse()
          : (! modifiers.includes('once') && animation.pause(0)),
    })
}

function modifierValue(modifiers, key, fallback, position = 1) {
    // If the modifier isn't present, use the default.
    if (modifiers.indexOf(key) === -1) return fallback

    const rawValue = modifiers[modifiers.indexOf(key) + position]

    if (! rawValue) return fallback

    return rawValue
}
