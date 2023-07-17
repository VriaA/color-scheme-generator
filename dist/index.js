
/*========== SITE THEME SETTING ==========*/
import { setThemeOnLoad, changeTheme, devicePreference, handleDeviceThemeChange} from './theme.js'

//CHECKS IF THERE IS A SAVED THEM SELECTION AND SETS SITE THEME TO DEVICE DEFAULT IF THERE IS NO SAVED SELECTION
setThemeOnLoad()

const settingsIcon = document.getElementById('settings-icon')
const themes = document.getElementById('themes')

settingsIcon.addEventListener('click', _=> {
    themes.classList.toggle('invisible')
})

devicePreference.addEventListener('change', handleDeviceThemeChange) 

themes.addEventListener('change', changeTheme)

/*========== COLOR SCHEME GENERATOR ==========*/

//DOM ELEMENTS
const form = document.getElementById('form')
const colorPicker = document.getElementById('color-picker')
const selectModeEl = document.getElementById('select-mode-el')
const selectCountEl = document.getElementById('select-count-el')
const schemeCntr = document.getElementById('scheme-cntr')

//DEFAULT VALUES FOR COLOR API QUERIES
let seedColor = 'a5b4fc'
let mode = 'analogic' 
let count = 6

//ARRAY THAT WILL HOLD COLORS FETCHED WITH THE COLOR API
let colorArr = []

//GENERATES PLACEHOLDER COLORS ON PAGE LOAD USING DEFAULT VALUES
getColors()

//GENERATES SCHEME BASED ON PICKED COLOR WHEN GET COLOR SCHEME BUTTON IS CLICKED (TRIGGERS A SUBMIT EVENT)
//THE .SLICE METHOD IS USED TO REMOVE THE # SYMBOL FROM THE SEED COLOR HEX CODE
form.addEventListener('submit', e=> {
    e.preventDefault() 
    seedColor = colorPicker.value.slice(1)
    count = selectCountEl.value
    mode = selectModeEl.value 
        getColors()
})

//FETCHES DATA USING THE COLOR API AND RETURNED COLORS ARE SAVED TO colorArr
/*THE NUMBER OF COLORS IS REDUCED TO 3 USING THE SLICE METHOD WHEN THE COUNT 
SELECTED IS 3 BECAUSE QUAD MODE RETURNS MORE THAN 3 COLORS EVEN WHEN THE COUNT IS 3*/
function getColors() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=${count}`)
    .then(res=> res.json())
    .then(data=> {
        colorArr = data.colors
        
        if (count == 3) {
            colorArr = colorArr.slice(0, 3)
        }
        getSchemeHtml(colorArr)
    })
}

//RENDERS THE COLOR SCHEME USING THE HEX CODE VALUES OF THE COLORS IN colorArr 
function getSchemeHtml(colors) {
    const schemeHtml = colors.map(color=> {
        return `<div class="relative color mb-1">
                    <div id="copied-${color.hex.value}" class="invisible absolute w-full bottom-0 h-fit flex
                                                             flex-col justify-center items-center md:pt-2 text-sm
                                                           text-white font-medium bg-slate-950 tracking-wide">
                        <span class="drop-shadow-done material-symbols-outlined">
                            done
                        </span> 
                        Copied
                    </div>
                    <div class="h-52 md:h-96" style="background: ${color.hex.value};"></div>
                    <p class="p-3 text-center bg-slate-200/50 dark:bg-slate-700/20 border-r cursor-text
                     border-slate-300 last-of-type:border-none dark:border-slate-900" data-color=${color.hex.value}
                       title="Copy">${color.hex.value}</p>
                </div>`
    }).join('')
    schemeCntr.innerHTML = schemeHtml
}

//COPIES THE HEX CODE OF A COLOR WHEN IT IS CLICKED ON
schemeCntr.addEventListener('click', e=> {
    colorArr.forEach(color=> {
        if(e.target.dataset.color === color.hex.value) {
            const colorToCopy = color.hex.value
            renderCopiedToolTip(colorToCopy)
            navigator.clipboard.writeText(colorToCopy)
        }
    })
})

//RENDERS COPIED TOOL TIP
function renderCopiedToolTip(hex) {
    const copiedToolTip = document.getElementById(`copied-${hex}`)
    copiedToolTip.style.visibility = 'visible'
    setTimeout(_=> { copiedToolTip.style.visibility = 'hidden'}, 1500)
}