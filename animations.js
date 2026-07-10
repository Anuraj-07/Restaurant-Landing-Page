const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".gallery-item,.testimonial-card").forEach(el=>{
    observer.observe(el);
});

/* ===========================
      BACK TO TOP
=========================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* ===========================
        LOADER
=========================== */

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    setTimeout(()=>{

        loader.classList.add("loader-hidden");

    },2200);

});

/* ===========================
    SCROLL PROGRESS BAR
=========================== */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll",()=>{

    const scrollTop = window.scrollY;

    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ===========================
      ACTIVE NAVIGATION
=========================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

/* ===========================
      BUTTON RIPPLE
=========================== */

document.querySelectorAll(".btn").forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        circle.classList.add("ripple");

        const diameter=Math.max(this.clientWidth,this.clientHeight);

        circle.style.width=diameter+"px";

        circle.style.height=diameter+"px";

        const rect=this.getBoundingClientRect();

        circle.style.left=(e.clientX-rect.left-diameter/2)+"px";

        circle.style.top=(e.clientY-rect.top-diameter/2)+"px";

        this.appendChild(circle);

        setTimeout(()=>{

            circle.remove();

        },600);

    });

});

/* ===========================
      COUNTER ANIMATION
=========================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const increment = target / 100;

            const updateCounter = ()=>{

                if(count < target){

                    count += increment;

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                }

                else{

                    if(target === 500){

                        counter.innerText = "500K+";

                    }

                    else if(target === 150){

                        counter.innerText = "1.5L+";

                    }

                    else{

                        counter.innerText = target + "+";

                    }

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/* ===========================
      DARK MODE
=========================== */

const toggle = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    toggle.innerHTML='<i class="fas fa-sun"></i>';

}

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        toggle.innerHTML='<i class="fas fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        toggle.innerHTML='<i class="fas fa-moon"></i>';

    }

});