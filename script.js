// Get handle on form
const multiStepForm = document.querySelector("[data-multi-step]");
// get handle on child elements of multi step form. As an arary [... ]
const formSteps =  [...multiStepForm.querySelectorAll("[data-step]")];
// Get handle on current active step. Parse int - array index value
let currentStep = formSteps.findIndex(step =>{
    return step.classList.contains("active")
})

// Failsafe, ensure there is an "active" step. Using HTML order. -1 if not found
if(currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
}

// Trasfer between steps. Using event listener
multiStepForm.addEventListener("click", e => {
    let incrementor;
    if (e.target.matches("[data-next]")) {
        incrementor = 1;
    }
    else if (e.target.matches("[data-previous]")) {
        incrementor = -1;
    }
    if(incrementor == null) return;

    // Validation
    const inputs = [...formSteps[currentStep].querySelectorAll("input")];
    // Check if inputs occured.
    const allValid = inputs.every(input => input.reportValidity())
    if(allValid) {
        currentStep += incrementor;
        showCurrentStep();
    }
})

// Animation, hide class after transition
formSteps.forEach(step => {
    step.addEventListener("animationend", () => {
        // need to remove hide for animation
        formSteps[currentStep].classList.remove("hide")
        step.classList.toggle("hide", !step.classList.contains("active"))
    })
})

// Function to apply current step.
function showCurrentStep() {
    // Loop through steps.
    formSteps.forEach((step, index) => {
        // add active class if index if equal to current, otherwise remove it.
        step.classList.toggle("active", index === currentStep);
    })
}
