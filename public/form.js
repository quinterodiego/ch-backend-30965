const userForm = document.getElementById('userForm')

userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('name')
    const lastName = document.getElementById('lastName')
    const age = document.getElementById('age')

    const user = {
        name: name.value,
        lastName: lastName.value,
        age: age.value
    }

    fetch('http://localhost:8080/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log('Error: ', e))
})