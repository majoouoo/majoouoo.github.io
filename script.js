const cursorEl = document.getElementById("cursor")

const handleMouseMove = (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const scrollLeft = (window.scrollX !== undefined) ? window.scrollX : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  const scrollTop = (window.scrollY !== undefined) ? window.scrollY : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  cursorEl.style.left =  x - scrollLeft - 10 + 'px';
  cursorEl.style.top = y - scrollTop - 10 + 'px';
}

document.body.addEventListener("mousemove", e => handleMouseMove(e))

const githubBtn = document.getElementById("githubBtn")
const links = document.querySelectorAll("a")

githubBtn.addEventListener("mouseover", () => {
  cursorEl.classList.add("activeCursor")
})

githubBtn.addEventListener("mouseout", () => {
  cursorEl.classList.remove("activeCursor")
})

for(const link of links) {
  link.addEventListener("mouseover", () => {
    if(link != githubBtn) {
      cursorEl.classList.add("activeCursor")
    }
  })

  link.addEventListener("mouseout", () => {
    cursorEl.classList.remove("activeCursor")
  })
}

const flashHeadings = document.querySelectorAll(".flash")

flashHeadings.forEach(heading => {
  const letters = heading.innerHTML.split("")
  let result = ""

  letters.forEach(letter => {
    result += `<span class="flashLetter">${letter}</span>`
  })

  heading.innerHTML = result
})

const createTimer = (cb, ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb()
      resolve()
    }, ms)
  })
}

const flashEffect = (heading) => {
  const letters = [...heading.children]
  letters.forEach(async letter => {
    const repeats = Math.ceil(Math.random() * 4)
    for(let i = 0; i < repeats; i++) {
      const delay = Math.random() * 300
      await createTimer(() => letter.classList.add("litLetter"), delay)
      await createTimer(() => letter.classList.remove("litLetter"), 100)
      i == repeats - 1 ? letter.classList.add("litLetter") : null
    }
  })
}

const handleScroll = (e) => {
  flashHeadings.forEach(heading => {
    const isVisible = heading.getBoundingClientRect().top - window.innerHeight < -400
    if(isVisible && heading.dataset.effectDone == "false") {
      flashEffect(heading)
      heading.dataset.effectDone = "true"
    }
  })
}

window.addEventListener("scroll", e => handleScroll(e))