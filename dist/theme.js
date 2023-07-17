//DOM ELEMENTS
const darkTheme = document.getElementById('dark-theme')
const lightTheme = document.getElementById('light-theme')
const deviceDefault = document.getElementById('device-default')
const devicePreference = window.matchMedia('(prefers-color-scheme: dark)')
const themeRadioBtns = document.querySelectorAll('.theme-radio-btn')

//CHECKS IF THERE IS A THEME SAVED TO LOCAL STORAGE OR IF THE DEVICE USED TO VIEW THE SITE PREFERS DARK MODE THEN SETS THEME ACCORDINGLY
function setThemeOnLoad() {
    const savedTheme = JSON.parse(localStorage.getItem('theme'))
    if(savedTheme) {
        if (savedTheme === 'dark') {
            darkMode()
            darkTheme.checked = true
        } else if (savedTheme === 'light') {
            lightMode()
            lightTheme.checked = true
        }
    } else {
        deviceMode() 
    }
    selectTheme()
}

// CHECKS IF THE DEVICE'S THEME WAS CHANGED
function handleDeviceThemeChange(event) {
    const savedTheme = JSON.parse(localStorage.getItem('theme'))
    if(!savedTheme) {
        if(event.matches) {
            darkMode()
        } else {
            lightMode()
        }
    }
}

//CHANGES THE BACKGROUND OF THE SELECTED THEME ICON'S LABEL
function selectTheme() {
themeRadioBtns.forEach(radionBtn=> {
    if(radionBtn.checked) {
        radionBtn.parentElement.style.background = '#1e293b'
    } else {
        radionBtn.parentElement.style.background = 'none'
    }
})
}

//CHANGES SITE THEME TO SELECTED THEME AND SAVES SELECTED THEME TO LOCAL STORAGE
//DELETES ANY SAVED THEME FROM LOCAL STORAGE IF DEVICE DEFAULT IS SELECTED
function changeTheme() {
    if(darkTheme.checked) {
        darkMode()
        localStorage.setItem('theme', JSON.stringify('dark'))
    }else if (lightTheme.checked) {
        lightMode()
        localStorage.setItem('theme', JSON.stringify('light'))
    } else {
        localStorage.removeItem('theme')
        deviceMode() 
    }
    selectTheme()
}

//REMOVES DARK CLASS FROM THE HTML(ROOT) ELEMENT
function lightMode() {
    document.documentElement.classList.remove('dark')
}

//ADDS DARK CLASS FROM THE HTML(ROOT) ELEMENT
function darkMode() {
    document.documentElement.classList.add('dark')
}

//MATCHES SITE THEME TO DEVICE THEME
function deviceMode()  {
    deviceDefault.checked = true
    window.matchMedia('(prefers-color-scheme: dark)').matches ? darkMode() : lightMode()
}

export { setThemeOnLoad, changeTheme, devicePreference, handleDeviceThemeChange, lightMode, darkMode }