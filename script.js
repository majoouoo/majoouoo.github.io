window.location.replace("https://majoouoo.github.io/geography")

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

const githubBtn = document.getElementById("github-btn")
const links = document.querySelectorAll("a")

githubBtn.addEventListener("mouseover", () => {
  cursorEl.classList.add("active-cursor")
})

githubBtn.addEventListener("mouseout", () => {
  cursorEl.classList.remove("active-cursor")
})

for(const link of links) {
  link.addEventListener("mouseover", () => {
    if(link != githubBtn) {
      cursorEl.classList.add("active-cursor")
    }
  })

  link.addEventListener("mouseout", () => {
    cursorEl.classList.remove("active-cursor")
  })
}

const flashHeadings = document.querySelectorAll(".flash")

flashHeadings.forEach(heading => {
  const letters = heading.innerHTML.split("")
  let result = ""

  letters.forEach(letter => {
    result += `<span class="flash-letter">${letter}</span>`
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

const flashEffect = async (heading) => {
  const letters = [...heading.children]
  letters.forEach(async letter => {
    const repeats = Math.ceil(Math.random() * 3)
    for(let i = 0; i < repeats; i++) {
      const delay = Math.random() * 500
      await createTimer(() => letter.classList.add("lit-letter"), delay)
      await createTimer(() => letter.classList.remove("lit-letter"), 200)
      i == repeats - 1 ? letter.classList.add("lit-letter") : null
    }
  })
}

const tiles = document.querySelectorAll(".tile")

const handleScroll = (e) => {
  flashHeadings.forEach(heading => {
    const isVisible = heading.getBoundingClientRect().top - window.innerHeight < -200
    if(isVisible && heading.dataset.effectDone == "false") {
      flashEffect(heading)
      heading.dataset.effectDone = "true"
    }
  })

  // tiles.forEach(tile => {
  //   const isVisible = tile.getBoundingClientRect().top - window.innerHeight < -100
  //   if(isVisible && tile.dataset.effectDone != "true") {
  //     tile.style.top = 0
  //     tile.style.opacity = 1
  //     tile.dataset.effectDone = "true"
  //   }
  // })
}

handleScroll()

window.addEventListener("scroll", e => handleScroll(e))

document.getElementById("email").addEventListener("click", async () => {
  await navigator.clipboard.writeText("marianbarancik1@gmail.com")
  document.getElementById("copied-msg").innerText = "COPIED"
  document.getElementById("copied-msg").style.color = "#bbff00"
})