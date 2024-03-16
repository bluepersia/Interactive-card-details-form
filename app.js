const inputs = document.querySelectorAll ('.input');
 document.querySelector ('.form').addEventListener ('submit', handleFormSubmit);


 function handleFormSubmit (e)
 {
    e.preventDefault ();
    
    let hasError = false;
    inputs.forEach (el => {

        el.classList.remove ('invalid');

        const err = checkInput (el.querySelector ('.input_input'));

        if (err)
        {
            el.classList.add ('invalid');
            el.querySelector ('.input_error').textContent = err;
            hasError = true;
        }
    });

    if (hasError)
        return;

    const main = document.querySelector ('.main');

    main.classList.add ('completed');
    main.innerHTML = `
    <img src="./images/icon-complete.svg" class="completed_icon" />
    <h2 class="completed_title">THANK YOU!</h2>
    <p class="completed_body">We've added your card details</p>
    <button class="btn completed_btn">Continue</button>
    `
 }



function checkInput (target)
{
    let check;

    check = checkRequired (target);

    if (check)
        return check;

    check = checkMinlength (target);

    if (check)
        return check;

    check = checkMin (target);

    if (check)
        return check;

    check = checkMax (target);

    if (check)  
        return check;

    check = checkCard (target);

    if (check)
        return check;

    return '';
}

function checkRequired (target)
{
    if (target.dataset.required)
    return !target.value ? "Can't be blank" : '';

    return '';
}

function checkMinlength (target)
{
    if (target.dataset.minlength)
        return target.value.length < target.dataset.minlength ? `Must be at least ${target.dataset.minlength} characters` : '';

    return '';
}

function checkMin (target)
{
    if (target.dataset.min)
        return Number (target.value) < Number(target.dataset.min) ? `Must be at least ${target.dataset.min}` : '';

        return '';
}

function checkMax (target)
{
    if (target.dataset.max)
        return Number (target.value ) > Number (target.dataset.max) ? `Must not exceed ${target.dataset.max}` : '';

    return '';
}

function checkCard (target)
{
    if (target.dataset.card)
        return target.value.match (/(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)/) ? '' : 'Must be a valid card number';

    return '';
 }

