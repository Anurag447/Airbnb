
gsap.from(".navbar",  {
    y: -20, 
    duration: 2,
    stagger:1,
     ease: "power2.out"
    
    });

gsap.from(".navbar-nav a",  {
       y: -50, 
       duration: 2,
       stagger:0,
        ease: "power2.out",
        
       });
  gsap.from(".photo,.new-form",  {
        y: 100,
        opacity:0, 
        duration: 2,
        stagger:1,
         ease: "power2.out",
         
        });

document.addEventListener("mousemove",function(dets) 
{
    gsap.to('.crsr,.navbar .crsr',{
        left:dets.x,
        top:dets.y
    })
    
})

// Megnatic effect
Shery.makeMagnet(".navbar-nav a,.link" /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

  // Form validation Start 

  (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  // Form validation end















      

